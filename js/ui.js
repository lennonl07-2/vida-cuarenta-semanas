/* ════════════════════════════════════════════════════════════
   VIDA · interfaz
   pantallas, máquina de escribir, decisiones A/B/C/D,
   minijuegos y presentación del final.
   ════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  const VIDA = window.VIDA;
  const $ = (sel) => document.querySelector(sel);

  const M = () => VIDA.motor;
  const N = () => VIDA.narrador;

  /* estado interno de la interfaz */
  const uiState = {
    trasEmpezar: false, // ¿la pantalla de narrador precede a la primera escena?
    sonoroActivo: false
  };

  /* etiquetas y colores de los personajes que hablan */
  const ETIQUETAS_HABLANTE = {
    mama: "{mama}", papa: "{papa}",
    doctora: "doctora", doctor: "doctor", enfermera: "enfermera",
    comadre: "doña carmen", voz: "· la voz ·",
    vecina: "la vecina", chofer: "el chofer", narrador: "narrador"
  };

  const FRASE_PRUEBA = "Hay una historia que empieza antes del primer latido. Ven, te la cuento despacio.";

  /* nodos de colapso por trimestre si la salud llega a cero */
  const RUTAS_PERDIDA = { t1: "perdida-t1", t2: "perdida-t2", t3: "perdida-t3" };

  /* ── utilidades ─────────────────────────────────────────── */

  function txt(s) { return M().reemplazarTokens(s || ""); }

  function pantalla(id) {
    document.querySelectorAll(".pantalla").forEach((p) => { p.hidden = p.id !== id; });
    $("#cortina-menu").hidden = true;
    $("#tarjeta-consecuencia").hidden = true;
    $("#subtitulos").hidden = true;
    N().detener();
    VIDA.audio.pararAmbiente();
    window.scrollTo(0, 0);
  }

  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("visible");
    clearTimeout(toast._tm);
    toast._tm = setTimeout(() => t.classList.remove("visible"), 2600);
  }

  function trimestreDe(sem) {
    if (sem <= 0) return "antes";
    if (sem <= 12) return "I trim.";
    if (sem <= 27) return "II trim.";
    return "III trim.";
  }

  function reducirMovimiento() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  /* ── máquina de escribir ────────────────────────────────── */

  const tipo = {
    cola: [],
    activo: false,
    cont: null,
    termino: null,
    vel: 16 // ms por carácter
  };

  function velocidadMs() {
    const v = M().estado ? M().estado.ajustes.velocidad : 2;
    return v === 0 ? 0 : v === 1 ? 30 : v === 2 ? 14 : 4;
  }

  function escribirParrafos(contenedor, parrafos, alTerminar) {
    tipo.cont = contenedor;
    tipo.cola = parrafos.slice();
    tipo.termino = alTerminar;
    contenedor.innerHTML = "";
    siguienteParrafo();
  }

  function siguienteParrafo() {
    if (!tipo.cola.length) {
      tipo.activo = false;
      if (tipo.termino) tipo.termino();
      return;
    }
    tipo.activo = true;
    const bruto = txt(tipo.cola.shift());
    const p = document.createElement("p");
    p.classList.add("escribiendo");
    tipo.cont.appendChild(p);

    if (reducirMovimiento() || velocidadMs() === 0) {
      p.textContent = bruto;
      p.classList.remove("escribiendo");
      siguienteParrafo();
      return;
    }

    let i = 0;
    const paso = () => {
      if (!tipo.activo || p.parentNode !== tipo.cont) return;
      if (tipo.saltar) {
        p.textContent = bruto;
        p.classList.remove("escribiendo");
        tipo.saltar = false;
        siguienteParrafo();
        return;
      }
      i += 1;
      p.textContent = bruto.slice(0, i);
      if (i < bruto.length) {
        setTimeout(paso, velocidadMs());
      } else {
        p.classList.remove("escribiendo");
        siguienteParrafo();
      }
    };
    paso();
  }

  function completarEscritura() {
    if (tipo.activo) tipo.saltar = true;
  }

  /* ── HUD ────────────────────────────────────────────────── */

  function actualizarHUD() {
    const e = M().estado;
    const sem = M().semana();
    $("#hud-num").textContent = sem <= 0 ? "·" : sem;
    $("#hud-trimestre").textContent = sem <= 0 ? "prólogo" : trimestreDe(sem);

    ["salud", "vinculo", "desarrollo", "conciencia"].forEach((clave) => {
      const barra = document.querySelector(`.medidor[data-stat="${clave}"] .medidor-barra`);
      if (barra) barra.style.width = (e.stats[clave] || 0) + "%";
    });

    const medConciencia = document.querySelector('.medidor[data-stat="conciencia"]');
    if (medConciencia) medConciencia.hidden = (e.stats.conciencia || 0) < 12;

    // ventana interior
    VIDA.feto.render(sem, $("#ventana-lienzo"), null, null);
    const info = VIDA.feto.TAMANOS[Math.max(0, Math.min(40, sem))] || VIDA.feto.TAMANOS[0];
    $("#feto-tamano").textContent = info[0];
    $("#feto-bpm").textContent = info[1];

    // anillo de latido
    const ventana = $("#ventana-feto");
    let anillo = ventana.querySelector(".latido-anillo");
    if (!anillo) {
      anillo = document.createElement("div");
      anillo.className = "latido-anillo pulso";
      ventana.appendChild(anillo);
    }
    const bpmMatch = String(info[1]).match(/(\d+)/);
    const bpm = bpmMatch ? parseInt(bpmMatch[1], 10) : 140;
    anillo.style.setProperty("--dur-pulso", Math.max(0.42, 60 / bpm).toFixed(2) + "s");
    if (VIDA.audio.activo) VIDA.audio.cambiarBpm(bpm);

    // recuerdos
    const ul = $("#recuerdos-lista");
    ul.innerHTML = "";
    e.recuerdos.slice(-7).forEach((r) => {
      const li = document.createElement("li");
      li.textContent = r;
      ul.appendChild(li);
    });
  }

  /* ── LA VOZ ─────────────────────────────────────────────── */

  function mostrarVoz(lineas) {
    const panel = $("#voz-panel");
    if (!lineas || !lineas.length) { panel.hidden = true; return; }
    panel.hidden = false;
    panel.innerHTML = `<span class="voz-autor">· la voz ·</span>` +
      lineas.map((l) => `<div class="voz-linea">${txt(l)}</div>`).join("");
  }

  /* ── render de nodos ────────────────────────────────────── */

  let renderGen = 0; // invalida redes de seguridad de renders anteriores

  function renderNodo() {
    const nodo = M().nodoActual();
    if (!nodo) {
      toast("Capítulo no encontrado: " + M().estado.nodo);
      return;
    }
    M().marcarVisitado(nodo.id);
    M().tomarRastro();
    M().guardar();

    const gen = ++renderGen;
    actualizarHUD();
    actualizarNavEscenas();

    // el cuadrito del escenario
    if (VIDA.escenas) VIDA.escenas.pintar($("#escenario"), nodo, M().estado);

    $("#minijuego").hidden = true;
    $("#opciones").innerHTML = "";
    $("#avanzar").hidden = true;
    $("#voz-panel").hidden = true;
    $("#escena-lugar").textContent = txt(nodo.lugar || "");
    $("#escena-titulo").textContent = txt(nodo.titulo || "");
    $("#escena-lugar").hidden = !nodo.lugar;
    $("#escena-titulo").hidden = !nodo.titulo;

    // párrafos estáticos + dinámicos
    let parrafos = (nodo.eco || []).slice();
    if (typeof nodo.alEntrar === "function") {
      const extra = nodo.alEntrar(M().estado) || [];
      parrafos = extra.concat(parrafos);
    }

    // el narrador cuenta la escena en cuanto aparece
    narrarEscena(nodo, parrafos);

    escribirParrafos($("#escena-texto"), parrafos, () => montarContenido(gen, nodo));

    // red de seguridad: si la máquina de escribir murió sin soltar
    // opciones ni minijuego, monta el contenido igual. Los minijuegos
    // no pueden desaparecer — es vida o muerte.
    const vigilar = () => {
      if (gen !== renderGen) return;
      if (tipo.activo) { setTimeout(vigilar, 2500); return; }
      const vacio = !$("#opciones").children.length &&
        $("#minijuego").hidden && $("#avanzar").hidden &&
        $("#tarjeta-consecuencia").hidden && !$("#pantalla-juego").hidden;
      if (vacio && nodo.tipo !== "final") montarContenido(gen, nodo);
    };
    setTimeout(vigilar, 6000);
  }

  /* opciones, minijuego o botón de continuar según el tipo de nodo */
  function montarContenido(gen, nodo) {
    if (gen !== renderGen) return;

    // líneas de la voz: umbral cruzado ahora o escritas en el nodo
    const lineasVoz = VIDA.voz.procesar(M().estado);
    const propias = (nodo.voz || []).filter(() =>
      (M().estado.stats.conciencia || 0) >= (nodo.vozDesde || 0));
    mostrarVoz(lineasVoz.concat(propias.map(txt)));
    actualizarHUD(); // por si subió conciencia

    switch (nodo.tipo) {
      case "final":
        renderFinal();
        break;
      case "control":
        M().tomarCheckpoint(nodo.titulo || "control");
        renderOpciones(nodo);
        break;
      case "carrera":      juegoCarrera(nodo); break;
      case "latido":       juegoLatido(nodo); break;
      case "patadas":      juegoPatadas(nodo); break;
      case "eco":          juegoEco(nodo); break;
      case "voz":          juegoVoces(nodo); break;
      case "maleta":       juegoMaleta(nodo); break;
      case "sonoro":       juegoSonoro(nodo); break;
      case "respiracion":  juegoRespiracion(nodo); break;
      case "cancion":      juegoCancion(nodo); break;
      case "quiz":         juegoQuiz(nodo); break;
      default:             renderOpciones(nodo);
    }
  }

  function renderOpciones(nodo) {
    const cont = $("#opciones");
    cont.innerHTML = "";
    const letras = ["A", "B", "C", "D", "E"];
    const visibles = M().opcionesVisibles(nodo);

    if (!visibles.length) {
      $("#avanzar").hidden = false;
      return;
    }

    visibles.forEach((op, idx) => {
      const disponible = M().disponible(op);
      const btn = document.createElement("button");
      btn.className = "opcion" + (disponible ? "" : " opcion-bloqueada");

      const pistaInterna = !disponible && M().pistaBloqueo(op)
        ? `<span class="opcion-pista-interna">${M().pistaBloqueo(op)}</span>` : "";

      btn.innerHTML = `
        <span class="opcion-letra">${letras[idx]}</span>
        <span class="opcion-texto">
          ${disponible ? "" : CANDADO_SVG}
          ${txt(op.t)}${pistaInterna}
        </span>`;

      btn.addEventListener("click", () => {
        if (!disponible) {
          toast(M().pistaBloqueo(op) || "Todavía no. Algunas puertas se abren más adelante.");
          return;
        }
        elegir(idx);
      });
      btn.dataset.indice = idx;
      cont.appendChild(btn);
    });
  }

  const CANDADO_SVG = `<span class="opcion-candado"><svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg></span>`;

  function elegir(indice) {
    const resultado = M().elegirOpcion(indice);
    if (!resultado) return;

    // cierre voluntario de una versión (pérdida aceptada)
    if (resultado.irFinal) {
      if (resultado.nota) toast(txt(resultado.nota));
      renderFinal();
      return;
    }

    // ¿colapso de salud? deriva a pérdida del trimestre
    if ((M().estado.stats.salud || 0) <= 0 && !M().estado.flags["en-perdida"]) {
      const sem = M().semana();
      const ruta = sem <= 12 ? RUTAS_PERDIDA.t1 : sem <= 27 ? RUTAS_PERDIDA.t2 : RUTAS_PERDIDA.t3;
      if (M().nodos[ruta]) {
        M().estado.flags["en-perdida"] = true;
        M().estado.nodo = ruta;
        M().guardar();
      }
    }

    if (resultado.nota || resultado.efectos.length) {
      mostrarConsecuencia(resultado, () => renderNodo());
    } else {
      renderNodo();
    }
  }

  function mostrarConsecuencia(resultado, cerrar) {
    $("#consecuencia-nota").textContent = txt(resultado.nota);
    const ul = $("#consecuencia-efectos");
    ul.innerHTML = "";
    resultado.efectos.forEach((ef) => {
      const li = document.createElement("li");
      li.className = ef.delta >= 0 ? "efecto-subida" : "efecto-bajada";
      const nombre = M().NOMBRES_STAT[ef.stat] || ef.stat;
      li.textContent = `${ef.delta >= 0 ? "+" : ""}${ef.delta} ${nombre}`;
      ul.appendChild(li);
    });
    const tarjeta = $("#tarjeta-consecuencia");
    tarjeta.hidden = false;
    tarjeta.dataset.pendiente = "1";
    tarjeta._cerrar = () => {
      tarjeta.hidden = true;
      delete tarjeta.dataset.pendiente;
      N().detener();
      cerrar();
    };
    // la consecuencia también se oye
    if (resultado.nota && N().activo && N().disponible()) {
      N().hablar(txt(resultado.nota));
    }
  }

  /* ── narración de escenas ───────────────────────────────── */

  /* el narrador lee título y párrafos; sin subtítulos (ya están en pantalla) */
  function narrarEscena(nodo, parrafos) {
    if (!N().activo || !N().disponible()) return;
    if (nodo.tipo === "sonoro") return; // las escenas sonoras llevan su propio reparto
    const items = [];
    if (nodo.titulo) items.push({ quien: "narrador", texto: txt(nodo.titulo) + "." });
    parrafos.forEach((p) => items.push({ quien: "narrador", texto: p }));
    if (!items.length) return;
    N().hablarCola(items);
  }

  /* subtítulo inferior sincronizado con la voz */
  function mostrarSubtitulo(linea) {
    const cont = $("#subtitulos");
    if (!linea || !linea.texto) { cont.hidden = true; cont.innerHTML = ""; return; }
    cont.hidden = false;
    const quien = linea.quien || "narrador";
    const etiquetaBruta = ETIQUETAS_HABLANTE[quien];
    const etiqueta = etiquetaBruta !== undefined ? txt(etiquetaBruta) : quien;
    const acotacion = (String(linea.texto).match(/\(([^)]*)\)\s*$/) || [])[1];
    cont.innerHTML = `
      <div class="subtitulo-linea st-${quien}">
        <span class="subtitulo-quien">${etiqueta}<span class="sonoro-ondas"><i></i><i></i><i></i></span></span>
        <span class="subtitulo-texto">${txt(String(linea.texto).replace(/\s*\([^)]*\)\s*$/, ""))}${
          acotacion ? ` <em class="subtitulo-acotacion">(${acotacion})</em>` : ""
        }</span>
      </div>`;
  }

  /* efectos puntuales dentro de una escena sonora */
  function dispararSfx(nombre) {
    switch (nombre) {
      case "puerta":   VIDA.audio.puerta(); break;
      case "llanto":   VIDA.audio.bebeLlora(); break;
      case "guitarra": VIDA.audio.guitarra(); break;
      default:
        if (nombre) VIDA.audio.tono(330, 0.2, "triangle", 0.12);
    }
  }

  /* ── escena sonora: diálogos que se escuchan ────────────── */

  function juegoSonoro(nodo) {
    uiState.sonoroActivo = true;
    const ambienteLista = typeof nodo.ambiente === "function"
      ? (nodo.ambiente(M().estado) || [])
      : (nodo.ambiente || []);
    VIDA.audio.ambiente(ambienteLista);

    const z = zonaMinijuego(nodo);
    z.zona.innerHTML = `
      <div class="sonoro-estado">
        <span class="sonoro-ondas" style="color:var(--tinta-clara)"><i></i><i></i><i></i></span>
        <em>escuchando…</em>
        <button class="boton boton-vacio sonoro-saltar" type="button">leer en silencio ⏭</button>
      </div>
      <div class="sonoro-repetir" hidden>
        <button class="boton boton-vacio" data-repetir>🔊 volver a escuchar</button>
      </div>`;
    const estadoEl = z.zona.querySelector(".sonoro-estado");
    const repetirEl = z.zona.querySelector(".sonoro-repetir");

    const dialogosBrutos = typeof nodo.dialogos === "function"
      ? (nodo.dialogos(M().estado) || [])
      : (nodo.dialogos || []);
    const dialogos = dialogosBrutos.map((d) => ({
      quien: d.quien,
      texto: txt(d.texto)
    }));
    const golpes = (typeof nodo.golpes === "function"
      ? nodo.golpes(M().estado)
      : nodo.golpes) || [];
    let terminado = false;

    const finalizar = () => {
      if (terminado) return;
      terminado = true;
      uiState.sonoroActivo = false;
      estadoEl.hidden = true;
      repetirEl.hidden = false;
      $("#subtitulos").hidden = true;
      // revelar la salida de la escena
      if ((nodo.opciones || []).length) renderOpciones(nodo);
      else $("#avanzar").hidden = false;
    };

    const reproducir = () => {
      terminado = false;
      VIDA.audio.despertar(); // el ambiente suena desde el primer gesto
      estadoEl.hidden = false;
      repetirEl.hidden = true;
      N().hablarCola(
        dialogos,
        (i, linea) => {
          mostrarSubtitulo(linea);
          golpes.filter((g) => g.en === i).forEach((g) => dispararSfx(g.sfx));
          if (golpes.some((g) => g.en === i)) mostrarSubtitulo(linea); // el golpe manda
        },
        () => {
          setTimeout(finalizar, 700);
        }
      );
    };

    estadoEl.querySelector(".sonoro-saltar").addEventListener("click", () => {
      N().detener();
      finalizar();
    });
    repetirEl.querySelector("[data-repetir]").addEventListener("click", reproducir);

    reproducir();
  }

  /* ── minijuegos ─────────────────────────────────────────── */

  function zonaMinijuego(nodo) {
    const zona = $("#minijuego");
    zona.hidden = false;
    zona.innerHTML = `
      ${nodo.consigna ? `<p class="mj-consigna">${txt(nodo.consigna)}</p>` : ""}
      <div class="mj-zona"></div>
      <div class="mj-marcador"></div>`;
    return {
      raiz: zona,
      zona: zona.querySelector(".mj-zona"),
      marcador: zona.querySelector(".mj-marcador")
    };
  }

  function terminarJuego(nodo, resumen) {
    // guardia anti-zombis: si el usuario retrocedió y este minijuego
    // quedó en el pasado, sus temporizadores ya no mueven la partida
    if (!M().estado || M().estado.nodo !== nodo.id) return;
    M().reiniciarRehacer();
    M().elegirOpcionEspecial = null;
    const efectosAplicados = [];
    if (resumen.ef) {
      Object.entries(resumen.ef).forEach(([stat, delta]) => {
        M().estado.stats[stat] = Math.max(0, Math.min(100, (M().estado.stats[stat] || 0) + delta));
        efectosAplicados.push({ stat, delta });
      });
    }
    (resumen.fl || []).forEach((f) => { M().estado.flags[f] = true; });
    if (resumen.recuerdo) M().agregarRecuerdo(resumen.recuerdo);
    if (resumen.nota) M().estado.historial.push({
      nodo: nodo.id, opcion: resumen.nota, semana: nodo.sem || 0
    });

    if (resumen.sig) M().estado.nodo = resumen.sig;
    else if (nodo.sig) M().estado.nodo = nodo.sig;
    M().guardar();

    if (resumen.nota || efectosAplicados.length) {
      mostrarConsecuencia({ nota: resumen.nota || "", efectos: efectosAplicados }, () => renderNodo());
    } else {
      renderNodo();
    }
  }

  /* CARRERA — eres uno entre millones */
  function juegoCarrera(nodo) {
    const z = zonaMinijuego(nodo);
    const lienzo = document.createElement("canvas");
    lienzo.className = "mj-carrera";
    z.zona.appendChild(lienzo);
    lienzo.width = 460; lienzo.height = 190;
    const cx = lienzo.getContext("2d");

    let presionando = false;
    let progreso = 0;
    const rivales = [0.02, 0.05, 0.01].map((v, i) => ({ p: 0, v, fase: i * 2 }));
    let t0 = performance.now();
    let corriendo = true;

    const mover = (on) => {
      presionando = on;
      if (on && corriendo) VIDA.audio.tono(320 + Math.random() * 80, 0.08, "sine");
    };
    lienzo.addEventListener("pointerdown", (ev) => { ev.preventDefault(); mover(true); });
    window.addEventListener("pointerup", up);
    window.addEventListener("keydown", tecla);
    function up() { mover(false); }
    function tecla(ev) { if (ev.code === "Space") { ev.preventDefault(); mover(!presionando); } }

    function frame(ahora) {
      if (!corriendo) return;
      if (!lienzo.isConnected) { corriendo = false; return; } // escena abandonada
      const dt = (ahora - t0) / 1000;
      t0 = ahora;
      if (presionando) progreso += 0.115 * dt * 60 * (1 / 60);
      rivales.forEach((r) => {
        r.p += (r.v + Math.sin(ahora / 300 + r.fase) * 0.004) * dt;
      });

      cx.clearRect(0, 0, 460, 190);
      // meta: óvulo a la derecha
      cx.beginPath();
      cx.arc(430, 95, 26, 0, Math.PI * 2);
      cx.fillStyle = "rgba(233,200,180,.25)";
      cx.fill();
      cx.beginPath();
      cx.arc(430, 95, 17, 0, Math.PI * 2);
      cx.fillStyle = "#e9c8b4";
      cx.fill();

      // carriles
      const filas = [50, 80, 110, 140];
      filas.forEach((y) => {
        cx.strokeStyle = "rgba(56,41,47,.12)";
        cx.setLineDash([3, 8]);
        cx.beginPath(); cx.moveTo(10, y); cx.lineTo(395, y); cx.stroke();
        cx.setLineDash([]);
      });

      const dibujarChispa = (x, y, color, r) => {
        cx.beginPath();
        cx.arc(x, y, r, 0, Math.PI * 2);
        cx.fillStyle = color;
        cx.fill();
        cx.beginPath();
        cx.moveTo(x - r, y);
        cx.quadraticCurveTo(x - 22, y - 4, x - 30, y + 6);
        cx.strokeStyle = color;
        cx.lineWidth = 2;
        cx.stroke();
      };

      dibujarChispa(20 + progreso * 380, 80, "#b95c3d", 9); // tú
      rivales.forEach((r, i) => dibujarChispa(20 + Math.min(r.p, 1) * 380, filas[i === 0 ? 0 : i + 1], "rgba(151,160,168,.75)", 7));

      z.marcador.textContent = `empuje: mantén presionado · ${(Math.min(progreso, 1) * 100 | 0)}%`;

      const ganaste = progreso >= 1;
      const perdio = rivales.some((r) => r.p >= 1);
      if (ganaste || perdio) {
        corriendo = false;
        window.removeEventListener("pointerup", up);
        window.removeEventListener("keydown", tecla);
        const puesto = ganaste ? 1 : 2 + rivales.filter((r) => r.p >= 1).length;
        setTimeout(() => {
          terminarJuego(nodo, {
            nota: ganaste
              ? "Llegaste primero. De entre millones, fuiste vos."
              : `Llegaste de ${puesto}º. Llegaste: eso es lo único que importa.`,
            ef: ganaste ? { desarrollo: 6, conciencia: 3 } : { desarrollo: 3 },
            fl: ganaste ? ["primero"] : [],
            recuerdo: ganaste ? "Fuiste el primero. Nadie lo sabe, salvo vos." : ""
          });
        }, 900);
      } else {
        requestAnimationFrame(frame);
      }
    }
    requestAnimationFrame(frame);
  }

  /* LATIDO — acompasa tu corazón al suyo */
  function juegoLatido(nodo) {
    const z = zonaMinijuego(nodo);
    z.zona.innerHTML = `
      <div class="mj-anillo-meta"><span style="font-family:'Fraunces',serif;font-size:34px;color:#b95c3d">♥</span></div>
      <div class="mj-lanzar"><button class="boton boton-principal" type="button">▶ dar play al corazón</button></div>`;
    const anillo = z.zona.querySelector(".mj-anillo-meta");
    const lanzarEl = z.zona.querySelector(".mj-lanzar");
    const bpm = nodo.bpm || 130;
    const periodo = 60000 / bpm;
    let pulsos = 0, aciertos = 0, ultimaPulsacion = 0, rondas = nodo.rondas || 6;
    let intervalo = null; // null = todavía no diste play

    const latir = () => {
      if (!anillo.isConnected || intervalo === null) { if (intervalo !== null) clearInterval(intervalo); return; }
      anillo.classList.add("latir");
      ultimaPulsacion = performance.now();
      VIDA.audio.tono(70, 0.12, "sine");
      setTimeout(() => anillo.classList.remove("latir"), Math.min(260, periodo * 0.35));
      pulsos++;
      if (pulsos >= rondas + 2) terminar();
    };

    function intento() {
      if (intervalo === null) return; // aún no empezó: nada que acompañar
      const delta = Math.abs(performance.now() - ultimaPulsacion);
      if (delta < 280 && pulsos >= 1) {
        aciertos++;
        VIDA.audio.acierto(true);
        anillo.style.borderColor = "#7d9371";
      } else {
        VIDA.audio.acierto(false);
        anillo.style.borderColor = "#d29890";
      }
      z.marcador.textContent = `acompañando: ${aciertos}/${Math.max(pulsos - 1, 0)}`;
      setTimeout(() => { anillo.style.borderColor = ""; }, 200);
    }
    anillo.addEventListener("pointerdown", intento);
    const tecla = (ev) => { if (ev.code === "Space") { ev.preventDefault(); intento(); } };
    window.addEventListener("keydown", tecla);

    lanzarEl.querySelector(".boton").addEventListener("click", () => {
      VIDA.audio.despertar();
      lanzarEl.hidden = true;
      intervalo = setInterval(latir, periodo);
    });

    function terminar() {
      if (intervalo !== null) clearInterval(intervalo);
      intervalo = null;
      window.removeEventListener("keydown", tecla);
      const proporcion = aciertos / rondas;
      setTimeout(() => {
        terminarJuego(nodo, {
          nota: proporcion > 0.6
            ? "Tus manos aprendieron el ritmo antes que tus oídos."
            : "El ritmo no salió perfecto, pero el intento también cuenta.",
          ef: { vinculo: proporcion > 0.6 ? 5 : 2, salud: 1 },
          recuerdo: "Aprendí tu ritmo antes de verte las manos."
        });
      }, 500);
    }
  }

  /* PATADAS — cuenta las patadas */
  function juegoPatadas(nodo) {
    const z = zonaMinijuego(nodo);
    z.zona.innerHTML = `<div class="mj-burbujas"></div>`;
    const burbujas = z.zona.querySelector(".mj-burbujas");
    let tocadas = 0, total = 0, segundos = nodo.duracion || 14;

    const aparecer = () => {
      if (!burbujas.isConnected) { clearInterval(lluvia); clearInterval(reloj); return; }
      if (total >= nodo.patadas || segundos <= 0) return;
      total++;
      const b = document.createElement("button");
      b.className = "patada-burbuja";
      b.textContent = "✦";
      b.style.left = VIDA.util.azar(5, 78) + "%";
      b.style.top = VIDA.util.azar(8, 68) + "%";
      b.addEventListener("pointerdown", () => {
        if (b.classList.contains("tocada")) return;
        b.classList.add("tocada");
        tocadas++;
        VIDA.audio.acierto(true);
        z.marcador.textContent = `patadas sentidas: ${tocadas}`;
        setTimeout(() => b.remove(), 240);
      });
      burbujas.appendChild(b);
    };

    const lluvia = setInterval(aparecer, 1100);
    const reloj = setInterval(() => {
      if (!burbujas.isConnected) { clearInterval(lluvia); clearInterval(reloj); return; }
      segundos--;
      if (segundos <= 0) {
        clearInterval(lluvia); clearInterval(reloj);
        burbujas.querySelectorAll(".patada-burbuja").forEach((b) => b.remove());
        const buena = tocadas >= Math.floor(total * 0.6);
        setTimeout(() => {
          terminarJuego(nodo, {
            nota: buena
              ? `${tocadas} de ${total}: {mama} sonríe. El juego favorito de los dos.`
              : `${tocadas} de ${total}. Algunas patadas se pierden, como peces en agua lechosa.`,
            ef: buena ? { vinculo: 5, desarrollo: 2 } : { vinculo: 2 },
            recuerdo: "El juego de las patadas: yo escondía, ella buscaba."
          });
        }, 600);
      } else {
        z.marcador.textContent = `${segundos}s · patadas sentidas: ${tocadas}`;
      }
    }, 1000);
  }

  /* ECO — rasca la gelida pantalla para revelar */
  function juegoEco(nodo) {
    const z = zonaMinijuego(nodo);
    z.zona.innerHTML = `
      <div class="mj-eco">
        <canvas class="eco-base" width="380" height="285"></canvas>
        <canvas class="eco-tapa" width="380" height="285"></canvas>
      </div>`;
    const base = z.zona.querySelector(".eco-base").getContext("2d");
    const tapaCv = z.zona.querySelector(".eco-tapa");
    const tapa = tapaCv.getContext("2d");

    // fondo de ecografía
    base.fillStyle = "#0b0d10";
    base.fillRect(0, 0, 380, 285);
    for (let i = 0; i < 900; i++) {
      base.fillStyle = `rgba(120,150,170,${Math.random() * 0.06})`;
      base.fillRect(Math.random() * 380, Math.random() * 285, 2, 2);
    }
    // silueta genérica brillante
    base.strokeStyle = "rgba(220,235,245,.85)";
    base.lineWidth = 3;
    base.lineCap = "round";
    base.beginPath();
    base.arc(195, 105, 52, 0, Math.PI * 2);
    base.stroke();
    base.beginPath();
    base.moveTo(185, 155);
    base.quadraticCurveTo(165, 205, 205, 232);
    base.quadraticCurveTo(255, 218, 238, 168);
    base.lineWidth = 26;
    base.stroke();
    base.beginPath();
    base.arc(215, 90, 5, 0, Math.PI * 2);
    base.fillStyle = "rgba(220,235,245,.9)";
    base.fill();

    // etiqueta técnica
    base.font = "11px monospace";
    base.fillStyle = "rgba(220,235,245,.65)";
    base.fillText("OBSTETRIC IA · " + (nodo.sem || 8) + " SEM", 12, 270);

    // tapa opaca que se rasca
    tapa.fillStyle = "#20242a";
    tapa.fillRect(0, 0, 380, 285);
    tapa.font = "13px monospace";
    tapa.fillStyle = "rgba(220,235,245,.5)";
    tapa.fillText("desliza para revelar", 118, 148);

    let rascado = false;
    const rascar = (ev) => {
      const rect = tapaCv.getBoundingClientRect();
      const x = (ev.clientX - rect.left) * (380 / rect.width);
      const y = (ev.clientY - rect.top) * (285 / rect.height);
      tapa.globalCompositeOperation = "destination-out";
      tapa.beginPath();
      tapa.arc(x, y, 30, 0, Math.PI * 2);
      tapa.fill();
      if (!rascado) { rascado = true; VIDA.audio.tono(440, 0.06, "sine"); }
      // mide cuánto queda
      const datos = tapa.getImageData(0, 0, 380, 285).data;
      let vacios = 0;
      for (let i = 3; i < datos.length; i += 400) { if (datos[i] === 0) vacios++; }
      if (vacios > 210) {
        tapaCv.style.pointerEvents = "none";
        setTimeout(() => {
          terminarJuego(nodo, {
            nota: nodo.notaExito || "Ahí estás. Pequeño, gris, innegable.",
            ef: nodo.efExito || { vinculo: 6 },
            recuerdo: nodo.recuerdo || "La primera vez que te vieron sin verme."
          });
        }, 700);
      }
    };
    tapaCv.addEventListener("pointermove", (ev) => { if (ev.buttons) rascar(ev); });
    tapaCv.addEventListener("pointerdown", rascar);
  }

  /* VOCES — ¿quién canta? */
  function juegoVoces(nodo) {
    const z = zonaMinijuego(nodo);
    const voces = nodo.voces || [
      { nombre: "voz grave", notas: [196, 164, 147], correcta: false },
      { nombre: "voz aguda", notas: [330, 294, 262], correcta: true }
    ];
    const ordenado = voces.map((v, i) => ({ ...v, i })).sort(() => Math.random() - 0.5);

    z.zona.innerHTML = `<div class="mj-voces"></div>`;
    const fila = z.zona.querySelector(".mj-voces");

    ordenado.forEach((v) => {
      const btn = document.createElement("button");
      btn.className = "voz-boton";
      btn.innerHTML = `
        <span class="voz-boton-probar" title="escuchar esta voz">▶</span>
        <svg viewBox="0 0 90 34">${
          v.notas.map((n, j) => `<circle cx="${14 + j * 30}" cy="${17 - (j % 2) * 8}" r="4" fill="#b95c3d"/>`).join("")
        }</svg>
        <span>${txt(v.nombre)}</span>`;
      // ▶ escuchar sin elegir: la voz se oye tantas veces como quieras
      const sonar = () => {
        VIDA.audio.despertar();
        v.notas.forEach((n, j) => setTimeout(() => VIDA.audio.tono(n, 0.3, "triangle"), j * 340));
      };
      btn.querySelector(".voz-boton-probar").addEventListener("pointerdown", (e) => {
        e.stopPropagation();
        sonar();
      });
      btn.addEventListener("click", () => {
        sonar();
        const bien = !!v.correcta;
        btn.style.borderColor = bien ? "#7d9371" : "#b95c3d";
        setTimeout(() => {
          terminarJuego(nodo, {
            nota: bien
              ? (nodo.notaAcierto || "La reconociste antes de pensar. Esa voz ya era casa.")
              : (nodo.notaError || "Te equivocaste de voz. No pasa nada: hay tiempo para memorizarlas todas."),
            ef: bien ? { vinculo: 6, conciencia: 2 } : { vinculo: 1 },
            recuerdo: bien ? "Supe su voz antes que su cara." : ""
          });
        }, 1100);
      });
      fila.appendChild(btn);
    });
  }

  /* MALETA — prepara la bolsa del parto */
  function juegoMaleta(nodo) {
    const z = zonaMinijuego(nodo);
    const objetos = nodo.objetos || [
      { t: "Documentos y carné", ok: true },
      { t: "Camisones abiertos", ok: true },
      { t: "Pañales de recién nacido", ok: true },
      { t: "Manta para el bebé", ok: true },
      { t: "Cargador de celular", ok: true },
      { t: "Botellas de agua", ok: true },
      { t: "Televisor pequeño", ok: false },
      { t: "Colección completa de vinyls", ok: false },
      { t: "Bicicleta", ok: false }
    ];
    const elegidos = new Set();

    z.zona.innerHTML = `<div class="maleta-rejilla"></div>
      <button class="boton boton-principal">Cerrar la maleta</button>`;
    const rejilla = z.zona.querySelector(".maleta-rejilla");

    objetos.forEach((obj, idx) => {
      const b = document.createElement("button");
      b.className = "maleta-item";
      b.textContent = obj.t;
      b.addEventListener("click", () => {
        if (elegidos.has(idx)) { elegidos.delete(idx); b.className = "maleta-item"; }
        else if (elegidos.size < 6) { elegidos.add(idx); b.className = "maleta-item elegido"; }
        else toast("La maleta no da para más: máximo seis cosas.");
      });
      rejilla.appendChild(b);
    });

    z.zona.querySelector(".boton").addEventListener("click", () => {
      const buenos = [...elegidos].filter((i) => objetos[i].ok).length;
      const malos = [...elegidos].filter((i) => !objetos[i.ok] && !objetos[i].ok).length;
      rejilla.querySelectorAll(".maleta-item").forEach((el, idx) => {
        if (elegidos.has(idx) && !objetos[idx].ok) el.className = "maleta-item elegido-equivocado";
      });
      setTimeout(() => {
        const excelente = buenos >= 5;
        terminarJuego(nodo, {
          nota: excelente
            ? "Maleta lista. Hasta el papel donde escribieron el plan cabe justo."
            : `Metieron ${buenos} cosas útiles de 6. Alguna falta, pero el camino se hace igual.`,
          ef: excelente ? { vinculo: 3, salud: 2 } : {},
          fl: excelente ? ["plan-de-parto"] : [],
          recuerdo: excelente ? "La maleta esperaba junto a la puerta, paciente como nosotros." : ""
        });
      }, 800);
    });
  }

  /* RESPIRACIÓN — acompasar el aliento con las contracciones */
  function juegoRespiracion(nodo) {
    const z = zonaMinijuego(nodo);
    const rondasTotales = nodo.rondas || 3;
    z.zona.innerHTML = `
      <div class="mj-respira-marco">
        <button class="mj-respira-circulo" type="button" aria-label="Acompañar">
          <span class="respira-palabra">inspira…</span>
        </button>
        <div class="mj-respira-fases">contracción 1 de ${rondasTotales} — toca mientras el círculo crece</div>
      </div>`;
    const circulo = z.zona.querySelector(".mj-respira-circulo");
    const palabra = z.zona.querySelector(".respira-palabra");
    const fases = z.zona.querySelector(".mj-respira-fases");

    let fase = "inspira";
    let ronda = 1;
    let aciertos = 0;
    let puedeTocar = true;
    let terminado = false;

    const cambiarFase = () => {
      if (!circulo.isConnected) { clearInterval(intervalo); return; }
      puedeTocar = true;
      if (fase === "inspira") {
        fase = "espira";
        circulo.classList.remove("inspira");
        palabra.textContent = "espira…";
        VIDA.audio.tono(220, 0.6, "sine", 0.08);
      } else {
        ronda++;
        if (ronda > rondasTotales) return terminar();
        fase = "inspira";
        circulo.classList.add("inspira");
        palabra.textContent = "inspira…";
        VIDA.audio.tono(330, 0.6, "sine", 0.08);
        if (ronda <= rondasTotales) {
          fases.textContent = `contracción ${ronda} de ${rondasTotales} — toca mientras crece`;
        }
      }
    };

    const intervalo = setInterval(cambiarFase, 4000);
    circulo.classList.add("inspira");

    circulo.addEventListener("pointerdown", () => {
      if (terminado) return;
      if (fase === "inspira" && puedeTocar) {
        aciertos++;
        puedeTocar = false;
        VIDA.audio.acierto(true);
      } else {
        VIDA.audio.acierto(false);
      }
      z.marcador.textContent = `acompañadas: ${aciertos}`;
    });

    function terminar() {
      if (terminado) return;
      terminado = true;
      clearInterval(intervalo);
      const buena = aciertos >= Math.ceil(rondasTotales * 0.6);
      setTimeout(() => {
        terminarJuego(nodo, {
          nota: buena
            ? "El aire entró y salió con las contracciones. El cuerpo recordó lo que aprendió en el curso."
            : "El ritmo se desarmó un poco entre el dolor. Sigue: falta poco.",
          ef: buena ? { salud: 4, vinculo: 2 } : { salud: 1 },
          fl: buena && nodo.flExito ? [nodo.flExito] : [],
          recuerdo: buena ? (nodo.recuerdoExito || "Respiramos juntas, la contracción y yo.") : ""
        });
      }, 600);
    }
  }

  /* CANCIÓN — repetir la melodía que le tarareabas */
  function juegoCancion(nodo) {
    const z = zonaMinijuego(nodo);
    const NOTAS = [261.63, 293.66, 329.63, 392.0, 440.0]; // do re mi sol la
    const NOMBRES_PADS = ["do", "re", "mi", "sol", "la"];
    const RONDAS = nodo.rondas || [2, 3, 4];

    z.zona.innerHTML = `
      <p class="quiz-progreso" data-progreso></p>
      <div class="cancion-pads"></div>
      <div class="cancion-controles">
        <button class="boton boton-principal" type="button" data-reproducir>▶ dar play a la melodía</button>
      </div>
      <p class="mj-respira-fases">escucha la melodía y repítela en el mismo orden</p>`;
    const contPads = z.zona.querySelector(".cancion-pads");
    const progreso = z.zona.querySelector("[data-progreso]");
    const reproducirBtn = z.zona.querySelector("[data-reproducir]");
    const pads = [];

    for (let i = 0; i < 5; i++) {
      const pad = document.createElement("button");
      pad.className = "cancion-pad";
      pad.type = "button";
      pad.textContent = NOMBRES_PADS[i];
      contPads.appendChild(pad);
      pads.push(pad);
    }

    let secuencia = [];
    let entrada = 0;
    let rondaIdx = 0;
    let escuchando = false;
    let terminado = false;

    const iluminar = (idx, ms) => {
      pads[idx].classList.add("iluminada");
      VIDA.audio.tono(NOTAS[idx], (ms || 420) / 1000 * 1.1, "triangle", 0.16);
      setTimeout(() => pads[idx].classList.remove("iluminada"), ms || 420);
    };

    const reproducirSecuencia = () => {
      escuchando = false;
      reproducirBtn.disabled = true;
      reproducirBtn.textContent = "· sonando…";
      pads.forEach((p) => p.classList.add("apagada"));
      secuencia.forEach((nota, i) => {
        setTimeout(() => iluminar(nota), 650 + i * 620);
      });
      setTimeout(() => {
        if (terminado) return;
        pads.forEach((p) => p.classList.remove("apagada"));
        escuchando = true;
        entrada = 0;
        reproducirBtn.disabled = false;
        reproducirBtn.textContent = "🔁 volver a escuchar";
      }, 650 + secuencia.length * 620 + 250);
    };

    // el play es tuyo: cada melodía suena cuando la pides
    reproducirBtn.addEventListener("click", () => {
      if (terminado) return;
      VIDA.audio.despertar();
      reproducirSecuencia();
    });

    const siguienteRonda = () => {
      if (rondaIdx >= RONDAS.length) return terminar(true);
      const largo = RONDAS[rondaIdx];
      secuencia = Array.from({ length: largo }, () => VIDA.util.azar(0, 4));
      progreso.textContent = `melodía ${rondaIdx + 1} de ${RONDAS.length} · ${largo} notas`;
      escuchando = false;
      pads.forEach((p) => p.classList.add("apagada"));
      reproducirBtn.disabled = false;
      reproducirBtn.textContent = rondaIdx === 0
        ? "▶ dar play a la melodía"
        : "▶ siguiente melodía";
    };

    pads.forEach((pad, idx) => {
      pad.addEventListener("click", () => {
        if (!escuchando || terminado) return;
        iluminar(idx, 300);
        if (secuencia[entrada] === idx) {
          entrada++;
          if (entrada >= secuencia.length) {
            escuchando = false;
            rondaIdx++;
            VIDA.audio.acierto(true);
            setTimeout(siguienteRonda, 900);
          }
        } else {
          escuchando = false;
          VIDA.audio.acierto(false);
          terminar(false);
        }
      });
    });

    function terminar(completa) {
      if (terminado) return;
      terminado = true;
      const parcial = rondaIdx > 0;
      setTimeout(() => {
        terminarJuego(nodo, {
          nota: completa
            ? (nodo.notaExito || "La canción completa, nota por nota. {mama} se rió: «ya sabes cuál es tu favorita».")
            : parcial
              ? `Llegaste a la melodía ${rondaIdx + 1}. A medias está bien: las canciones se aprenden noche tras noche.`
              : "La primera melodía se enredó. No importa: la tarareaste igual.",
          ef: completa ? { vinculo: 5, desarrollo: 2 } : parcial ? { vinculo: 2 } : {},
          fl: completa && nodo.flExito ? [nodo.flExito] : [],
          recuerdo: completa ? (nodo.recuerdoExito || "Nuestra canción: cinco notas y nadie más la conoce.") : ""
        });
      }, 700);
    }

    siguienteRonda();
  }

  /* QUIZ — reconocer las señales de alarma */
  function juegoQuiz(nodo) {
    const z = zonaMinijuego(nodo);
    const preguntas = nodo.preguntas || [];
    let indice = 0;
    let aciertos = 0;
    let terminado = false;

    z.zona.innerHTML = `<p class="quiz-progreso" data-progreso></p><div class="quiz-lista"></div>`;
    const progreso = z.zona.querySelector("[data-progreso]");
    const lista = z.zona.querySelector(".quiz-lista");

    function pintar() {
      if (indice >= preguntas.length) return terminar();
      const q = preguntas[indice];
      progreso.textContent = nodo.tituloQuiz || "curso de señales de alarma";
      lista.innerHTML = `<p class="quiz-pregunta">${txt(q.p)}</p>` +
        q.opciones.map((op, i) =>
          `<button class="quiz-boton" type="button" data-i="${i}">${txt(op)}</button>`).join("");
      lista.querySelectorAll(".quiz-boton").forEach((btn) => {
        btn.addEventListener("click", () => {
          if (terminado) return;
          const i = parseInt(btn.dataset.i, 10);
          const bien = i === q.correcta;
          lista.querySelectorAll(".quiz-boton").forEach((b) => { b.disabled = true; });
          btn.classList.add(bien ? "acierto" : "fallo");
          if (!bien) {
            lista.querySelector(`[data-i="${q.correcta}"]`).classList.add("acierto");
          } else {
            aciertos++;
            VIDA.audio.acierto(true);
          }
          const pie = document.createElement("p");
          pie.className = "mj-respira-fases";
          pie.textContent = q.porQue || "";
          lista.appendChild(pie);
          setTimeout(() => { indice++; pintar(); }, bien ? 1600 : 2600);
        });
      });
    }

    function terminar() {
      if (terminado) return;
      terminado = true;
      const sobresaliente = aciertos === preguntas.length;
      const decente = aciertos >= Math.ceil(preguntas.length * 0.6);
      setTimeout(() => {
        terminarJuego(nodo, {
          nota: sobresaliente
            ? (nodo.notaExito || "Todas correctas. Si algo raro pasa de madrugada, ya sabrán exactamente cuándo llamar.")
            : decente
              ? `${aciertos} de ${preguntas.length}. Lo importante quedó claro: ante lo raro, consultar sin miedo.`
              : "Se mezclaron algunas ideas. Menos mal que la posta atiende las 24 horas, por si acaso.",
          ef: sobresaliente ? { salud: 3, vinculo: 1 } : decente ? { salud: 1 } : {},
          fl: decente && nodo.flExito ? [nodo.flExito] : [],
          recuerdo: sobresaliente ? (nodo.recuerdoExito || "Las tres señales de alarma, aprendidas de memoria.") : ""
        });
      }, 500);
    }

    pintar();
  }

  /* ── índice ─────────────────────────────────────────────── */

  function renderIndice(volverA) {
    const cont = $("#indice-contenido");
    cont.innerHTML = "";
    const grupos = {};
    M().capitulosOrden.forEach((cap) => {
      const t = cap.temp || "Historia";
      (grupos[t] = grupos[t] || []).push(cap);
    });

    Object.keys(grupos).forEach((nombreTemp) => {
      const div = document.createElement("div");
      div.className = "indice-temporada";
      div.innerHTML = `<h3 class="indice-titulo-temporada">${nombreTemp}</h3><div class="indice-rejilla"></div>`;
      const rejilla = div.querySelector(".indice-rejilla");

      grupos[nombreTemp].forEach((cap) => {
        const visto = M().fueVisitado(cap.id);
        const actual = M().estado.nodo === cap.id;
        const item = document.createElement("button");
        item.className = "indice-item" + (visto ? " visto" : "") + (actual ? " actual" : "");
        item.innerHTML = `<span class="ii-sem">${cap.sem <= 0 ? "·" : cap.sem}</span><span class="ii-titulo">${visto || actual ? txt(cap.titulo || "") : "por vivir"}</span>`;
        item.title = visto ? txt(cap.titulo || "") : "Aún no llega esta semana";
        item.addEventListener("click", () => {
          if (!visto && !actual) { toast("Esa semana todavía no ha ocurrido."); return; }
          M().reiniciarRehacer();
          M().estado.nodo = cap.id;
          M().guardar();
          pantalla("pantalla-juego");
          renderNodo();
        });
        rejilla.appendChild(item);
      });
      cont.appendChild(div);
    });

    pantalla("pantalla-indice");
    pantalla._volverA = volverA || "pantalla-juego";
  }

  /* ── diario ─────────────────────────────────────────────── */

  function renderDiario(volverA) {
    const cont = $("#diario-coleccion");
    cont.innerHTML = "";
    let encontrados = 0;
    M().capitulosOrden.forEach((cap) => {
      if (!cap.diario || !M().fueVisitado(cap.id)) return;
      encontrados++;
      const pag = document.createElement("article");
      pag.className = "diario-pagina";
      pag.innerHTML = `
        <div class="diario-fecha">${cap.diario.fecha || ("semana " + (cap.sem || 0))}</div>
        <div class="diario-texto">“${txt(cap.diario.texto)}”</div>
        <div class="diario-firma">— ${txt(cap.diario.autor || "{mama}")}</div>`;
      cont.appendChild(pag);
    });
    if (!encontrados) {
      cont.innerHTML = `<p style="color:var(--tinta-clara)">Todavía no hay páginas. Las palabras llegan cuando llegan.</p>`;
    }
    pantalla("pantalla-diario");
    pantalla._volverA = volverA || "pantalla-juego";
  }

  /* ── final ──────────────────────────────────────────────── */

  function renderFinal() {
    const e = M().estado;
    const fin = M().calcularFinal();
    const definicion = (VIDA.finales && VIDA.finales[fin.id]) || { titulo: "Fin", texto: [] };

    $("#final-sello").textContent = e.flags["en-perdida"] ? "cartilla interrumpida" : "fin de la cartilla";
    $("#final-titulo").textContent = txt(definicion.titulo);
    $("#final-cuerpo").innerHTML = definicion.texto.map((t) => `<p>${txt(t)}</p>`).join("");

    const datos = $("#final-datos");
    datos.innerHTML = "";
    const chips = [];
    if (fin.peso) chips.push(`peso al nacer ≈ ${fin.peso} g`);
    if (fin.talla) chips.push(`talla ≈ ${fin.talla} cm`);
    if (fin.apgar) chips.push(`apgar ${fin.apgar}`);
    if (!e.flags["en-perdida"] && !e.finalAlcanzado) {
      chips.push(`vínculo ${e.stats.vinculo}%`);
    }
    chips.push(`conciencia alcanzada: ${VIDA.voz.nivelCarta(e.stats.conciencia || 0)}`);
    if (e.nombres.bebe) chips.unshift(`“${e.nombres.bebe}”`);
    chips.forEach((c) => {
      const s = document.createElement("span");
      s.textContent = c;
      datos.appendChild(s);
    });

    // carta de la voz + recuerdo citable
    const carta = $("#final-carta");
    const lineas = [`<span class="voz-autor">· la voz, antes de irse ·</span>`];
    const recuerdo = VIDA.voz.recuerdoCitable(e);
    if (recuerdo) lineas.push(`<p>${txt(recuerdo)}</p>`);
    lineas.push(`<p>${txt(VIDA.voz.cartaFinal(e))}</p>`);
    carta.innerHTML = lineas.join("");

    // el primer llanto cierra la historia (si hubo nacimiento)
    if (!e.flags["en-perdida"]) VIDA.audio.bebeLlora();

    // y el narrador lee el cierre
    if (N().activo && N().disponible()) {
      setTimeout(() => {
        const items = [{ quien: "narrador", texto: txt(definicion.titulo) }];
        definicion.texto.forEach((t) => items.push({ quien: "narrador", texto: t }));
        N().hablarCola(items);
      }, e.flags["en-perdida"] ? 400 : 2200); // deja sonar el llanto primero
    }

    pantalla("pantalla-final");
    M().guardar();
  }

  /* ── arranque de partida ────────────────────────────────── */

  function empezarPartida(continuar) {
    if (!continuar) {
      M().estado = M().nuevoEstado({
        mama: $("#nombre-mama").value.trim(),
        papa: $("#nombre-papa").value.trim(),
        jugador: $("#nombre-jugador").value.trim()
      });
    } else {
      M().estado = M().cargar();
      if (!M().estado) { toast("No había partida guardada."); return; }
    }
    M().guardar();
    pantalla("pantalla-juego");
    renderNodo();
  }

  /* ── acciones globales ──────────────────────────────────── */

  function accion(nombre, el) {
    const e = M().estado;
    switch (nombre) {
      case "nueva":
        pantalla("pantalla-nombres");
        break;
      case "empezar": {
        M().borrarPartida();
        M().estado = M().nuevoEstado({
          mama: $("#nombre-mama").value.trim(),
          papa: $("#nombre-papa").value.trim(),
          jugador: $("#nombre-jugador").value.trim()
        });
        M().guardar();
        uiState.trasEmpezar = true;
        pantalla("pantalla-narrador");
        renderNarrador();
        break;
      }
      case "continuar":
        empezarPartida(true);
        break;
      case "volver-titulo":
        pantalla("pantalla-titulo");
        break;
      case "menu":
        $("#cortina-menu").hidden = false;
        break;
      case "cerrar-menu":
        $("#cortina-menu").hidden = true;
        break;
      case "indice":
        renderIndice(e ? "pantalla-juego" : "pantalla-titulo");
        break;
      case "diario":
        renderDiario("pantalla-juego");
        break;
      case "acerca":
        pantalla._volverA = e ? "pantalla-juego" : "pantalla-titulo";
        pantalla("pantalla-acerca");
        break;
      case "volver-atras":
        pantalla(pantalla._volverA || "pantalla-titulo");
        break;
      case "volver-al-juego":
        pantalla(pantalla._volverA || "pantalla-juego");
        break;
      case "continuar-escena":
        M().avanzar();
        renderNodo();
        break;
      case "retro-escena":
        navegarEscena(true);
        break;
      case "avanzar-escena":
        navegarEscena(false);
        break;
      case "pausa-narracion": {
        if (N().pausado) {
          N().reanudar();
          if (el) el.setAttribute("aria-pressed", "false");
          toast("Narración continúa.");
        } else if (N().pausar()) {
          if (el) el.setAttribute("aria-pressed", "true");
          toast("Narración en pausa. Pulsa otra vez para seguir.");
        } else {
          toast("Ahora mismo no hay ninguna voz sonando.");
        }
        break;
      }
      case "cerrar-consecuencia": {
        const tarjeta = $("#tarjeta-consecuencia");
        if (tarjeta._cerrar) tarjeta._cerrar();
        break;
      }
      case "audio": {
        const btn = document.querySelector('[data-accion="audio"]');
        if (VIDA.audio.activo) {
          VIDA.audio.apagar();
          btn.setAttribute("aria-pressed", "false");
        } else {
          const bpmMatch = String($("#feto-bpm").textContent).match(/(\d+)/);
          VIDA.audio.encender(bpmMatch ? parseInt(bpmMatch[1], 10) : 140);
          btn.setAttribute("aria-pressed", "true");
        }
        break;
      }
      case "narracion": {
        const btn = document.querySelector('[data-accion="narracion"]');
        const on = N().alternar();
        if (btn) btn.setAttribute("aria-pressed", String(on));
        actualizarControlesVoz();
        toast(on ? "Narración activada." : "Narración silenciada. La historia sigue en silencio.");
        break;
      }
      case "abrir-narrador":
        uiState.trasEmpezar = false;
        pantalla._volverA = e ? "pantalla-juego" : "pantalla-titulo";
        pantalla("pantalla-narrador");
        renderNarrador();
        break;
      case "narrador-listo":
        if (uiState.trasEmpezar) {
          uiState.trasEmpezar = false;
          pantalla("pantalla-juego");
          renderNodo();
        } else {
          pantalla(pantalla._volverA || "pantalla-juego");
        }
        break;
      case "narrador-volver":
        if (uiState.trasEmpezar) {
          uiState.trasEmpezar = false;
          M().guardar();
          pantalla("pantalla-titulo");
          refrescarTitulo();
        } else {
          pantalla(pantalla._volverA || "pantalla-titulo");
        }
        break;
      case "vel-mas":
        N().cambiarVelocidad(+0.1);
        actualizarControlesVoz();
        toast(`Ritmo de lectura ×${String(N().velocidad.toFixed(1)).replace(".", ",")}`);
        break;
      case "vel-menos":
        N().cambiarVelocidad(-0.1);
        actualizarControlesVoz();
        toast(`Ritmo de lectura ×${String(N().velocidad.toFixed(1)).replace(".", ",")}`);
        break;
      case "elegir-voz":
        if (el && el.dataset.voz) {
          N().fijar(el.dataset.voz);
          renderNarrador();
          toast("Voz elegida.");
        }
        break;
      case "probar-voz":
        if (el && el.dataset.voz) {
          if (!N().activo) {
            toast("El narrador está silenciado: actívalo con el botón 🔊.");
            break;
          }
          N().reactivar(); // si la voz estaba en suspenso, esto la despierta
          const v = N().catalogo().todas.find((x) => x.voiceURI === el.dataset.voz);
          document.querySelectorAll(".voz-card-probar")
            .forEach((s) => { s.textContent = "▶ probar"; });
          el.textContent = "· sonando…";
          const restaurar = () => {
            el.textContent = "▶ probar";
            // diagnóstico honesto: si ni siquiera el plan B desnudo sonó,
            // el motor de voz del navegador está muerto en esta sesión
            if (!N().suenaAlgo()) {
              const p = N().problema;
              if (p === "sin-voces") {
                toast("El navegador no entregó voces usables. Cierra y reabre el navegador.");
              } else if (p === "en-suspenso") {
                toast("La voz está atascada ahora mismo; espera unos segundos y vuelve a probar.");
              } else {
                toast("Esta voz no arrancó. Cierra por COMPLETO el navegador y vuelvelo a abrir (eso reinicia el motor de voz), revisa el volumen del sistema y prueba otra voz.");
              }
            }
          };
          N().detener();
          N().hablar(FRASE_PRUEBA, { voz: v || null }, restaurar);
        }
        break;
      case "exportar":
        navigator.clipboard && navigator.clipboard.writeText(M().exportar())
          .then(() => toast("Código de partida copiado al portapapeles."))
          .catch(() => prompt("Copia este código:", M().exportar()));
        break;
      case "importar": {
        const codigo = prompt("Pega el código de partida:");
        if (codigo && M().importar(codigo)) {
          toast("Partida restaurada.");
          $("#cortina-menu").hidden = true;
          renderNodo();
        } else toast("Ese código no se entiende.");
        break;
      }
      case "salir-titulo":
        M().guardar();
        pantalla("pantalla-titulo");
        refrescarTitulo();
        break;
      case "ver-indice-final":
        renderIndice("pantalla-final");
        break;
      case "otra-vida":
        M().borrarPartida();
        location.reload();
        break;
    }
  }

  /* ── título ─────────────────────────────────────────────── */

  function refrescarTitulo() {
    document.querySelector('[data-accion="continuar"]').hidden = !M().hayPartida();
    // pequeña silueta animada en la portada
    VIDA.feto.render(9, $("#titulo-feto"), null, null);
  }

  /* ── pantalla del narrador ──────────────────────────────── */

  function renderNarrador() {
    $("#narrador-sin-soporte").hidden = N().disponible();
    actualizarControlesVoz();

    const pintar = () => {
      const cat = N().catalogo();
      pintarGrupoVoces($("#narrador-femeninas"), cat.femeninas);
      pintarGrupoVoces($("#narrador-masculinas"), cat.masculinas);
      actualizarControlesVoz();
    };

    if (N().disponible()) N().listo(pintar);
    else {
      $("#narrador-femeninas").innerHTML = "";
      $("#narrador-masculinas").innerHTML = "";
    }
  }

  function pintarGrupoVoces(cont, voces) {
    cont.innerHTML = "";
    if (!voces.length) {
      cont.innerHTML = `<p class="narrador-vacio">tu sistema no ofrece voces de este grupo — con una sola voz basta para escuchar la historia</p>`;
      return;
    }
    const actual = N().vozActual();
    voces.forEach((v) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "voz-card" + (actual && actual.voiceURI === v.voiceURI ? " seleccionada" : "");
      card.dataset.accion = "elegir-voz";
      card.dataset.voz = v.voiceURI;
      const natural = N().esNatural(v)
        ? `<span class="voz-card-etiqueta-natural">cálida</span>` : "";
      card.innerHTML = `
        <div class="voz-card-nombre">${N().nombreBonito(v)} ${natural}</div>
        <div class="voz-card-origen">${N().origen(v)}</div>
        <span class="voz-card-probar" data-accion="probar-voz" data-voz="${v.voiceURI}">▶ probar</span>`;
      cont.appendChild(card);
    });
  }

  function actualizarControlesVoz() {
    const hud = document.querySelector('[data-accion="narracion"]');
    if (hud) hud.setAttribute("aria-pressed", String(N().activo));
    const pausa = document.querySelector('[data-accion="pausa-narracion"]');
    if (pausa) pausa.setAttribute("aria-pressed", String(N().pausado));
    const valor = `×${String(N().velocidad.toFixed(1)).replace(".", ",")}`;
    const v1 = $("#vel-valor");
    const v2 = $("#narrador-vel-valor");
    if (v1) v1.textContent = valor;
    if (v2) v2.textContent = valor;
  }

  /* botones ← → del HUD: encendidos solo cuando hay a donde ir */
  function actualizarNavEscenas() {
    const retro = document.querySelector('[data-accion="retro-escena"]');
    const avan = document.querySelector('[data-accion="avanzar-escena"]');
    if (retro) {
      const ok = M().puedeRetroceder();
      retro.classList.toggle("hud-inactivo", !ok);
      retro.setAttribute("aria-disabled", String(!ok));
    }
    if (avan) {
      const ok = M().puedeAvanzar();
      avan.classList.toggle("hud-inactivo", !ok);
      avan.setAttribute("aria-disabled", String(!ok));
    }
  }

  /* volver/recuperar una escena: deshace o rehace la última decisión */
  function navegarEscena(haciaAtras) {
    if ($("#tarjeta-consecuencia").hidden === false) return;
    const hecho = haciaAtras ? M().retrocederEscena() : M().avanzarEscena();
    if (!hecho) {
      toast(haciaAtras
        ? "No hay escena anterior a la que volver."
        : "Esa escena todavía no ocurrió: solo se avanza a lo ya vivido.");
      return;
    }
    N().detener();
    VIDA.audio.pararAmbiente();
    uiState.sonoroActivo = false;
    $("#subtitulos").hidden = true;
    renderNodo();
    toast(haciaAtras
      ? "Volviste una escena — lo de después quedó deshecho."
      : "Escena recuperada.");
  }

  /* ── teclado global ─────────────────────────────────────── */

  function instalarTeclado() {
    document.addEventListener("keydown", (ev) => {
      const enJuego = !$("#pantalla-juego").hidden;
      const tarjetaAbierta = !$("#tarjeta-consecuencia").hidden;

      if (tarjetaAbierta && (ev.code === "Space" || ev.code === "Enter")) {
        ev.preventDefault();
        accion("cerrar-consecuencia");
        return;
      }
      if (!enJuego || tarjetaAbierta) return;

      const menuAbierto = !$("#cortina-menu").hidden;
      if (menuAbierto) return;

      if (ev.code === "Space" || ev.code === "Enter") {
        const opcionesVisiblesAhora = $("#opciones").children.length > 0;
        if (tipo.activo) { ev.preventDefault(); completarEscritura(); return; }
        if (!opcionesVisiblesAhora && !$("#avanzar").hidden) {
          ev.preventDefault();
          accion("continuar-escena");
        }
      }
      const letraMap = { KeyA: 0, KeyB: 1, KeyC: 2, KeyD: 3, Digit1: 0, Digit2: 1, Digit3: 2, Digit4: 3 };
      if (ev.code === "ArrowLeft" && !tipo.activo) { ev.preventDefault(); navegarEscena(true); return; }
      if (ev.code === "ArrowRight" && !tipo.activo) { ev.preventDefault(); navegarEscena(false); return; }
      if (letraMap[ev.code] !== undefined && $("#opciones").children.length) {
        const btn = $("#opciones").children[letraMap[ev.code]];
        if (btn) btn.click();
      }
    });
  }

  /* ── init ───────────────────────────────────────────────── */

  function init() {
    document.body.addEventListener("click", (ev) => {
      const objetivo = ev.target.closest("[data-accion]");
      if (objetivo) {
        accion(objetivo.dataset.accion, objetivo);
        return;
      }
      // clic sobre el texto adelanta la escritura
      if (ev.target.closest("#escena-texto")) completarEscritura();
    });

    $("#cortina-menu").addEventListener("click", (ev) => {
      if (ev.target === $("#cortina-menu")) $("#cortina-menu").hidden = true;
    });

    instalarTeclado();
    refrescarTitulo();
    pantalla("pantalla-titulo");
  }

  document.addEventListener("DOMContentLoaded", () => {
    init();
    // si el sistema tarda en anunciar voces, refresca la pantalla abierta
    VIDA.narrador.alCambiar(() => {
      if (!$("#pantalla-narrador").hidden) renderNarrador();
      actualizarControlesVoz();
    });
    // si la voz del navegador se atasca, avisar una vez — sin alarmismo:
    // los subtítulos siguen y el narrador reintenta solo
    let ultimoAvisoSuspenso = 0;
    window.addEventListener("vida-tts-suspendido", () => {
      const ahora = Date.now();
      if (ahora - ultimoAvisoSuspenso < 40000) return;
      ultimoAvisoSuspenso = ahora;
      toast("La voz del navegador va lenta ahora mismo: la lectura sigue por subtítulos y reintenta sola en un momento.");
    });
  });

  /* API para main.js y depuración */
  VIDA.ui = { pantalla, renderNodo, renderFinal, renderIndice, renderDiario, toast, empezarPartida, refrescarTitulo };
})();
