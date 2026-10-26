/* ════════════════════════════════════════════════════════════
   VIDA · motor
   grafo de escenas · estadísticas · banderas · guardado
   ════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  const VIDA = (window.VIDA = window.VIDA || {});

  /* ── constantes ─────────────────────────────────────────── */

  const CLAVE_GUARDADO = "vida-partida-v1";
  const VERSION = 1;

  const STATS_BASE = { salud: 62, vinculo: 48, desarrollo: 40, conciencia: 4 };

  // claves legibles para la tarjeta de consecuencia
  const NOMBRES_STAT = {
    salud: "salud",
    vinculo: "vínculo",
    desarrollo: "desarrollo",
    conciencia: "conciencia"
  };

  /* ── estado ─────────────────────────────────────────────── */

  let estado = null;
  let nodos = {};          // id → nodo
  let capitulosOrden = []; // lista plana ordenada de capítulos

  /* ── registro de contenido ──────────────────────────────── */

  function registrar(capitulos) {
    capitulos.forEach((cap) => {
      if (!cap.id) throw new Error("capítulo sin id: " + JSON.stringify(cap).slice(0, 80));
      if (nodos[cap.id]) throw new Error("id duplicado: " + cap.id);
      nodos[cap.id] = cap;
      capitulosOrden.push(cap);
    });
  }

  /* ── nueva partida / guardado ───────────────────────────── */

  function nuevoEstado(nombres) {
    return {
      version: VERSION,
      nodo: "p01",
      stats: Object.assign({}, STATS_BASE),
      flags: {},
      nombres: {
        mama: nombres.mama || "Camila",
        papa: nombres.papa || "Marcos",
        jugador: nombres.jugador || "",
        bebe: "" // apodo, se elige en la semana 12
      },
      visitados: {},
      historial: [],       // { nodo, opcion, semana }
      recuerdos: [],       // textos cortos para la columna derecha
      meta: {},            // memoria interna de LA VOZ
      checkpoint: null,    // instantánea del último control
      rastro: [],          // instantáneas escena a escena (para retroceder)
      rehacer: [],         // escenas deshechas (para avanzar solo lo vivido)
      finalAlcanzado: null,
      ajustes: { velocidad: 2, audio: true }
    };
  }

  function guardar() {
    try {
      localStorage.setItem(CLAVE_GUARDADO, JSON.stringify(estado));
    } catch (e) { /* modo privado */ }
  }

  function cargar() {
    try {
      const bruto = localStorage.getItem(CLAVE_GUARDADO);
      if (!bruto) return null;
      const datos = JSON.parse(bruto);
      if (!datos || datos.version !== VERSION) return null;
      return datos;
    } catch (e) {
      return null;
    }
  }

  function hayPartida() { return !!cargar(); }

  function borrarPartida() {
    try { localStorage.removeItem(CLAVE_GUARDADO); } catch (e) {}
  }

  function exportar() {
    return btoa(unescape(encodeURIComponent(JSON.stringify(estado))));
  }

  function importar(codigo) {
    try {
      const datos = JSON.parse(decodeURIComponent(escape(atob(codigo.trim()))));
      if (!datos || datos.version !== VERSION || !datos.nodo) return false;
      estado = datos;
      guardar();
      return true;
    } catch (e) {
      return false;
    }
  }

  /* ── consultas ──────────────────────────────────────────── */

  function nodoActual() { return nodos[estado.nodo]; }

  function tieneFlag(f) { return !!estado.flags[f]; }

  function semana() { return nodoActual().sem || 0; }

  /* ¿la opción está disponible? */
  function disponible(opcion) {
    const req = opcion.req || {};
    // sinFl puede venir dentro de req o suelto en la opción
    const prohibidas = req.sinFl || opcion.sinFl;
    if (prohibidas && prohibidas.some((f) => tieneFlag(f))) return false;
    if (req.fl && req.fl.some((f) => !tieneFlag(f))) return false;
    if (req.st) {
      for (const clave in req.st) {
        const minimo = req.st[clave];
        if ((estado.stats[clave] || 0) < minimo) return false;
      }
    }
    return true;
  }

  function pistaBloqueo(opcion) {
    return opcion.pista || "";
  }

  /* ── mutaciones ─────────────────────────────────────────── */

  function aplicarEfectos(ef) {
    const cambios = [];
    if (!ef) return cambios;
    for (const clave in ef) {
      const delta = ef[clave];
      const antes = estado.stats[clave];
      if (typeof antes !== "number") continue;
      estado.stats[clave] = Math.max(0, Math.min(100, antes + delta));
      cambios.push({ stat: clave, delta });
    }
    return cambios;
  }

  function ponerFlags(fl) {
    (fl || []).forEach((f) => { estado.flags[f] = true; });
  }

  function agregarRecuerdo(texto) {
    if (texto && !estado.recuerdos.includes(texto)) estado.recuerdos.push(texto);
  }

  function marcarVisitado(id) {
    estado.visitados[id] = true;
  }

  function fueVisitado(id) { return !!estado.visitados[id]; }

  /* instantánea para retroceder tras una pérdida */
  function tomarCheckpoint(etiqueta) {
    estado.checkpoint = {
      etiqueta,
      nodo: estado.nodo,
      stats: Object.assign({}, estado.stats),
      flags: Object.assign({}, estado.flags),
      visitados: Object.assign({}, estado.visitados),
      historial: estado.historial.slice(),
      recuerdos: estado.recuerdos.slice()
    };
  }

  function volverACheckpoint() {
    if (!estado.checkpoint) {
      // sin checkpoint aún: rebobina al arranque del embarazo
      estado.stats = Object.assign({}, STATS_BASE);
      estado.flags = { cicatriz: true };
      estado.nodo = "s01";
      guardar();
      return true;
    }
    const cp = estado.checkpoint;
    estado.nodo = cp.nodo;
    estado.stats = Object.assign({}, cp.stats);
    // las pérdidas duelen: pequeño peaje al volver
    estado.stats.vinculo = Math.max(0, estado.stats.vinculo - 4);
    estado.flags = Object.assign({}, cp.flags);
    estado.flags["cicatriz"] = true;
    estado.visitados = Object.assign({}, cp.visitados);
    estado.historial = cp.historial.slice();
    estado.recuerdos = cp.recuerdos.slice();
    guardar();
    return true;
  }

  /* checkpoint automático al llegar a nodos seguros (control o cp) */
  function quizasCheckpoint(idNodo) {
    const n = nodos[idNodo];
    if (n && (n.tipo === "control" || n.cp)) {
      tomarCheckpoint(n.titulo || idNodo);
    }
  }

  /* ── rastro: ir y venir entre escenas ────────────────────── */

  /* instantánea del estado al llegar a cada escena; la llama la UI
     en cuanto renderiza un nodo. Si el tope ya es esta escena, no
     duplica (vuelve a renderizar la misma). */
  function tomarRastro() {
    if (!estado) return;
    if (!Array.isArray(estado.rastro)) estado.rastro = [];
    if (!Array.isArray(estado.rehacer)) estado.rehacer = [];
    const tope = estado.rastro[estado.rastro.length - 1];
    if (tope && tope.nodo === estado.nodo) return;
    estado.rastro.push({
      nodo: estado.nodo,
      stats: Object.assign({}, estado.stats),
      flags: Object.assign({}, estado.flags),
      nombres: Object.assign({}, estado.nombres),
      visitados: Object.assign({}, estado.visitados),
      recuerdos: estado.recuerdos.slice(),
      meta: JSON.parse(JSON.stringify(estado.meta || {})),
      checkpoint: estado.checkpoint ? JSON.parse(JSON.stringify(estado.checkpoint)) : null,
      historial: estado.historial.length
    });
    if (estado.rastro.length > 150) estado.rastro.shift();
  }

  function restaurarInstantanea(ins) {
    estado.nodo = ins.nodo;
    estado.stats = Object.assign({}, ins.stats);
    estado.flags = Object.assign({}, ins.flags);
    estado.nombres = Object.assign({}, ins.nombres);
    estado.visitados = Object.assign({}, ins.visitados);
    estado.recuerdos = ins.recuerdos.slice();
    estado.historial = estado.historial.slice(0, ins.historial);
    estado.meta = JSON.parse(JSON.stringify(ins.meta || {}));
    estado.checkpoint = ins.checkpoint ? JSON.parse(JSON.stringify(ins.checkpoint)) : null;
    delete estado.finalAlcanzado;
  }

  function puedeRetroceder() {
    return !!estado && Array.isArray(estado.rastro) && estado.rastro.length > 1;
  }

  function puedeAvanzar() {
    return !!estado && Array.isArray(estado.rehacer) && estado.rehacer.length > 0;
  }

  /* retroceder una escena: deshace la última decisión y guarda el
     futuro en rehacer para poder volver adelante */
  function retrocederEscena() {
    if (!puedeRetroceder()) return false;
    const actual = estado.rastro.pop();
    estado.rehacer.push(actual);
    restaurarInstantanea(estado.rastro[estado.rastro.length - 1]);
    guardar();
    return true;
  }

  /* avanzar solo hacia escenas que ya ocurrieron (el futuro deshecho) */
  function avanzarEscena() {
    if (!puedeAvanzar()) return false;
    const proxima = estado.rehacer.pop();
    estado.rastro.push(proxima);
    restaurarInstantanea(proxima);
    guardar();
    return true;
  }

  /* una decisión nueva borra el futuro alternativo */
  function reiniciarRehacer() {
    if (estado && Array.isArray(estado.rehacer) && estado.rehacer.length) {
      estado.rehacer = [];
    }
  }

  /* ── navegación ─────────────────────────────────────────── */

  function elegirOpcion(indice) {
    const nodo = nodoActual();
    const visibles = opcionesVisibles(nodo);
    const opcion = visibles[indice];
    if (!opcion || !disponible(opcion)) return null;
    reiniciarRehacer(); // una decisión nueva borra el futuro deshecho

    // acción especial: volver al último control tras una pérdida
    if (opcion.accion === "retroceder") {
      volverACheckpoint();
      delete estado.flags["en-perdida"];
      guardar();
      return { nota: opcion.nota || "", efectos: [] };
    }

    // acción especial: cerrar esta versión con un final concreto
    if (opcion.final) {
      estado.historial.push({ nodo: nodo.id, opcion: opcion.t, semana: 0 });
      estado.finalAlcanzado = { id: opcion.final };
      guardar();
      return { nota: "", efectos: [], irFinal: true };
    }

    estado.historial.push({
      nodo: nodo.id,
      opcion: opcion.t,
      semana: nodo.sem || 0
    });

    const efectos = aplicarEfectos(opcion.ef);
    ponerFlags(opcion.fl);

    // algunas decisiones bautizan (p. ej. el apodo de la semana 12)
    if (opcion.nombres) Object.assign(estado.nombres, opcion.nombres);

    if (opcion.recuerdo) agregarRecuerdo(opcion.recuerdo);

    if (opcion.sig) estado.nodo = opcion.sig;
    else if (nodo.sig) estado.nodo = nodo.sig;
    quizasCheckpoint(estado.nodo);

    guardar();
    return { nota: opcion.nota || "", efectos };
  }

  function avanzar(destino) {
    const nodo = nodoActual();
    reiniciarRehacer();
    estado.nodo = destino || nodo.sig || siguienteNodoLineal();
    quizasCheckpoint(estado.nodo);
    guardar();
  }

  /* si un capítulo no define sig, sigue el orden del registro */
  function siguienteNodoLineal() {
    const idx = capitulosOrden.findIndex((c) => c.id === estado.nodo);
    const prox = capitulosOrden[idx + 1];
    return prox ? prox.id : estado.nodo;
  }

  function opcionesVisibles(nodo) {
    return (nodo.opciones || []).slice();
  }

  /* ── finales ────────────────────────────────────────────── */

  function puntajeFinal() {
    const s = estado.stats;
    let p = s.salud * 0.4 + s.desarrollo * 0.35 + s.vinculo * 0.25;
    if (estado.flags["tabaco-pasivo"]) p -= 5;
    if (estado.flags["anemia"]) p -= 4;
    if (estado.flags["prematuro"]) p -= 6;
    if (estado.flags["plan-de-parto"]) p += 4;
    if (estado.flags["lata"]) p += 2;
    if (estado.flags["comadres"]) p += 3;
    return Math.max(0, Math.min(100, p));
  }

  function calcularFinal() {
    const s = estado.stats;
    const p = puntajeFinal();

    if (estado.finalAlcanzado) return estado.finalAlcanzado;

    let id;
    if (p >= 78) id = "F1";
    else if (p >= 64) id = "F2";
    else if (p >= 50) id = "F3";
    else id = "F4";

    if (estado.flags["cesarea-emergencia"]) id = "F5";
    if (estado.flags["parto-en-camino"]) id = "F6";

    const peso = Math.round(2400 + (s.salud * 0.9) + (s.desarrollo * 0.55));
    const talla = Math.round(44 + s.desarrollo * 0.065);

    return {
      id,
      peso: peso,
      talla: talla,
      apgar: s.salud >= 75 ? "9–10" : s.salud >= 55 ? "8–9" : "6–7",
      puntaje: Math.round(p)
    };
  }

  /* ── tokens de texto ────────────────────────────────────── */

  function reemplazarTokens(texto) {
    if (typeof texto !== "string") return texto;
    const n = estado ? estado.nombres : { mama: "Camila", papa: "Marcos", bebe: "", jugador: "" };
    return texto
      .replace(/\{mama\}/g, n.mama)
      .replace(/\{papa\}/g, n.papa)
      .replace(/\{bebe\}/g, n.bebe || "Semillita")
      .replace(/\{jugador\}/g, n.jugador || "");
  }

  /* ── utilidades expuestas a los datos ───────────────────── */

  VIDA.util = {
    azar: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),
    elegir: (lista) => lista[Math.floor(Math.random() * lista.length)]
  };

  /* ── API pública ────────────────────────────────────────── */

  VIDA.motor = {
    registrar,
    nuevoEstado,
    guardar,
    cargar,
    hayPartida,
    borrarPartida,
    exportar,
    importar,
    get estado() { return estado; },
    set estado(v) { estado = v; },
    nodoActual,
    tieneFlag,
    semana,
    disponible,
    pistaBloqueo,
    elegirOpcion,
    avanzar,
    opcionesVisibles,
    tomarCheckpoint,
    volverACheckpoint,
    tomarRastro,
    retrocederEscena,
    avanzarEscena,
    puedeRetroceder,
    puedeAvanzar,
    reiniciarRehacer,
    marcarVisitado,
    fueVisitado,
    agregarRecuerdo,
    calcularFinal,
    reemplazarTokens,
    get nodos() { return nodos; },
    get capitulosOrden() { return capitulosOrden; },
    NOMBRES_STAT
  };
})();
