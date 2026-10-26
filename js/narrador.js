/* ════════════════════════════════════════════════════════════
   VIDA · narrador
   Voces del sistema (Web Speech API) sin dependencias:
   · elenco: 3 voces femeninas + 3 masculinas latinoamericanas
   · velocidad ajustable en vivo
   · reparto por personaje (mamá, papá, doctora, comadre, LA VOZ)
   · colas de diálogo con subtítulos sincronizados
   Si el navegador no tiene voces, todo sigue funcionando en
   silencio: los subtítulos marcan el ritmo estimado.
   ════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  const VIDA = window.VIDA;
  const CLAVE = "vida-narrador-v1";

  /* ── género conocido: nombres de voces TTS hispanas ─────── */

  const NOMBRES_F = [
    "paulina", "monica", "mónica", "dalia", "sabina", "elvira", "helena",
    "laura", "francisca", "isabela", "isabella", "catalina", "valentina",
    "camila", "luciana", "lorena", "ximena", "emilia", "marisol",
    "angelica", "angélica", "ines", "inés", "esperanza", "yolanda",
    "beatriz", "lucia", "lucía", "soledad", "rocio", "rocío", "salma",
    "dalia", "renata", "adriana", "marisol", "clara", "estrella"
  ];
  const NOMBRES_M = [
    "jorge", "carlos", "juan", "diego", "javier", "pablo", "enrique",
    "alonso", "andres", "andrés", "felipe", "tomas", "tomás", "gonzalo",
    "mateo", "miguel", "raul", "raúl", "sergio", "german", "germán",
    "alvaro", "álvaro", "joaquin", "joaquín", "arnau", "dario", "darío",
    "liberto", "cecilio", "yago", "nil", "hugo"
  ];

  /* locales latinoamericanos, en orden de preferencia */
  const LOCALES_LA = [
    "es-mx", "es-us", "es-co", "es-cl", "es-ar", "es-pe", "es-419",
    "es-uy", "es-py", "es-bo", "es-ec", "es-ve", "es-cr", "es-pa",
    "es-gt", "es-sv", "es-hn", "es-ni", "es-do", "es-pr", "es-cu"
  ];

  const REGIONES = {
    "es-mx": "México", "es-us": "EE. UU.", "es-co": "Colombia",
    "es-cl": "Chile", "es-ar": "Argentina", "es-pe": "Perú",
    "es-419": "Latinoamérica", "es-uy": "Uruguay", "es-py": "Paraguay",
    "es-bo": "Bolivia", "es-ec": "Ecuador", "es-ve": "Venezuela",
    "es-es": "España", "es-cr": "Costa Rica", "es-pa": "Panamá",
    "es-gt": "Guatemala", "es-sv": "El Salvador", "es-hn": "Honduras",
    "es-ni": "Nicaragua", "es-do": "Rep. Dominicana", "es-pr": "Puerto Rico",
    "es-cu": "Cuba"
  };

  /* ── estado ─────────────────────────────────────────────── */

  let voces = [];
  let catalogoCache = null;
  let listoYa = false;
  const pendientes = [];
  const alCambiarFns = [];

  let pausaManual = false; // el botón ⏸ del HUD pidió pausa: el vigilante no la rompe
  let genHabla = 0;        // cada detener() invalida lo que estaba sonando

  let conf = { id: "", velocidad: 1, activo: true };
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE));
    if (guardado) Object.assign(conf, guardado);
  } catch (e) { /* modo privado */ }

  function guardarConf() {
    try { localStorage.setItem(CLAVE, JSON.stringify(conf)); } catch (e) {}
  }

  function avisarCambio() {
    alCambiarFns.forEach((fn) => { try { fn(); } catch (e) {} });
  }

  /* ── carga de voces (asíncrona en Chrome) ───────────────── */

  function terminarCarga() {
    if (listoYa) return;
    listoYa = true;
    pendientes.splice(0).forEach((fn) => { try { fn(); } catch (e) {} });
  }

  function init() {
    const synth = window.speechSynthesis;
    if (!synth) { terminarCarga(); return; }
    const tomar = () => {
      const vs = synth.getVoices();
      if (!vs.length) return;
      voces = vs;
      catalogoCache = null;
      synth.removeEventListener("voiceschanged", tomar);
      terminarCarga();
      avisarCambio();
    };
    if (typeof synth.addEventListener === "function") {
      synth.addEventListener("voiceschanged", tomar);
    } else if ("onvoiceschanged" in synth) {
      synth.onvoiceschanged = tomar;
    }
    tomar();
    setTimeout(() => {
      if (!listoYa) {
        voces = synth.getVoices() || [];
        catalogoCache = null;
        terminarCarga();
        avisarCambio();
      }
    }, 1500);

    // parche de Chrome: a veces se queda en pausa a mitad de frase
    // (respeta la pausa pedida a mano desde el botón del HUD)
    setInterval(() => {
      if (synth.speaking && synth.paused && !pausaManual) synth.resume();
    }, 5000);
  }

  function listo(fn) {
    if (listoYa) fn();
    else pendientes.push(fn);
  }

  function disponible() {
    const synth = window.speechSynthesis;
    if (!synth) return false;
    return (voces.length || synth.getVoices().length) > 0;
  }

  /* ── clasificación y calidad ────────────────────────────── */

  function clasificar(v) {
    const nombre = (v.name || "").toLowerCase();
    for (const n of NOMBRES_F) { if (nombre.includes(n)) return "F"; }
    for (const n of NOMBRES_M) { if (nombre.includes(n)) return "M"; }
    // heurística: palabra base terminada en -a suele ser mujer
    const base = nombre.replace(/\s*(?:[（([:].*)?$/, "").trim().replace(/[^\wáéíóúñü]+$/, "");
    if (/a$/.test(base)) return "F";
    if (/(o|os|el|ón|or|án)$/.test(base)) return "M";
    return "?";
  }

  function calidad(v) {
    const n = (v.name || "").toLowerCase();
    let p = 0;
    if (/google|natural|premium|enhanced|siri|eloquence/.test(n)) p += 3;
    if (v.localService) p += 1;
    const idx = LOCALES_LA.indexOf((v.lang || "").toLowerCase());
    if (idx >= 0) p += 20 - Math.min(idx, 18);
    else if ((v.lang || "").toLowerCase().indexOf("es") === 0) p += 1;
    return p;
  }

  function esLatinas() {
    return voces.filter((v) => (v.lang || "").toLowerCase().indexOf("es") === 0)
      .sort((a, b) => calidad(b) - calidad(a));
  }

  function catalogo() {
    if (catalogoCache) return catalogoCache;
    const latin = esLatinas();
    const fuente = latin.length ? latin : voces.slice();
    const femeninas = [], masculinas = [], neutras = [];
    fuente.forEach((v) => {
      const g = clasificar(v);
      if (g === "F") femeninas.push(v);
      else if (g === "M") masculinas.push(v);
      else neutras.push(v);
    });
    // si faltan de un género, completa con neutras para llegar a 3+3 si puede
    while (femeninas.length < 3 && neutras.length) femeninas.push(neutras.shift());
    while (masculinas.length < 3 && neutras.length) masculinas.push(neutras.shift());
    catalogoCache = {
      femeninas: femeninas.slice(0, 3),
      masculinas: masculinas.slice(0, 3),
      todas: fuente,
      latinas: latin.length > 0
    };
    return catalogoCache;
  }

  /* ── selección y ajustes ────────────────────────────────── */

  function vozPorId(id) { return voces.find((v) => v.voiceURI === id) || null; }

  function vozActual() {
    const cat = catalogo();
    return vozPorId(conf.id) || cat.femeninas[0] || cat.masculinas[0] || cat.todas[0] || null;
  }

  function fijar(id) {
    conf.id = id;
    guardarConf();
    avisarCambio();
  }

  function cambiarVelocidad(delta) {
    conf.velocidad = Math.round(
      Math.max(0.6, Math.min(1.6, conf.velocidad + delta)) * 10) / 10;
    guardarConf();
    avisarCambio();
    return conf.velocidad;
  }

  function alternar(on) {
    conf.activo = typeof on === "boolean" ? on : !conf.activo;
    if (!conf.activo) detener();
    else { pausaManual = false; }
    guardarConf();
    avisarCambio();
    return conf.activo;
  }

  /* ── nombres bonitos ────────────────────────────────────── */

  function nombreBonito(v) {
    let n = (v.name || "").replace(/^(Microsoft|Google|Apple)\s+/i, "");
    n = n.replace(/\s*[（([\-–—].*$/, "").replace(/\s+\w+ Online.*$/i, "").trim();
    if (!n) n = v.name || "Voz";
    return n.charAt(0).toUpperCase() + n.slice(1);
  }

  function origen(v) {
    const m = (v.name || "").match(/[（(]\s*(.+?)\s*[）)]/);
    if (m) return m[1];
    return REGIONES[(v.lang || "").toLowerCase()] || v.lang || "";
  }

  function esNatural(v) {
    return /google|natural|premium|enhanced|siri/i.test(v.name || "") ||
      (calidad(v) >= 23 && LOCALES_LA.indexOf((v.lang || "").toLowerCase()) <= 5);
  }

  /* ── reparto de personaje ───────────────────────────────── */

  function castingPerfil(quien) {
    const cat = catalogo();
    const nar = vozActual();
    const narG = nar ? clasificar(nar) : "?";
    const otraF = cat.femeninas.find((v) => !nar || v.voiceURI !== nar.voiceURI);
    const otroM = cat.masculinas.find((v) => !nar || v.voiceURI !== nar.voiceURI);
    const base = { voz: nar, pitch: 1, rate: 1 };

    switch (quien) {
      case "mama":
        return otraF
          ? { voz: otraF, pitch: 1.08, rate: 1 }
          : { voz: nar, pitch: narG === "F" ? 1.28 : 1.45, rate: 1 };
      case "papa":
        return otroM
          ? { voz: otroM, pitch: 0.95, rate: 1 }
          : { voz: nar, pitch: narG === "M" ? 0.62 : 0.45, rate: 1 };
      case "doctor":
      case "doctora":
        return { voz: nar, pitch: 0.72, rate: 0.96 };
      case "comadre":
        return otraF
          ? { voz: otraF, pitch: 0.9, rate: 0.93 }
          : { voz: nar, pitch: 0.82, rate: 0.92 };
      case "vecina":
        return otraF
          ? { voz: otraF, pitch: 1.18, rate: 1.08 }
          : { voz: nar, pitch: 1.22, rate: 1.06 };
      case "chofer":
        return otroM
          ? { voz: otroM, pitch: 0.85, rate: 1.05 }
          : { voz: nar, pitch: narG === "M" ? 0.7 : 0.55, rate: 1.05 };
      case "enfermera":
        return otraF
          ? { voz: otraF, pitch: 1.15, rate: 1.02 }
          : { voz: nar, pitch: 1.2, rate: 1.02 };
      case "voz":
        return { voz: nar, pitch: 1.38, rate: 0.9 };
      default:
        return base;
    }
  }

  /* ── troceado de texto (Chrome corta frases largas) ─────── */

  function limpiar(texto) {
    return String(texto)
      .replace(/\([^)]*\)/g, " ")   // acotaciones escénicas: se leen, no se dicen
      .replace(/\{(\w+)\}/g, "$1")
      .replace(/\s+/g, " ")
      .trim();
  }

  function trocear(texto) {
    const frases = texto.replace(/([.!?…:;])\s+/g, "$1|").split("|");
    const partes = [];
    let acum = "";
    frases.forEach((f) => {
      if ((acum + " " + f).trim().length <= 180) {
        acum = (acum ? acum + " " : "") + f;
      } else {
        if (acum) partes.push(acum);
        while (f.length > 180) {
          let corte = f.lastIndexOf(" ", 180);
          if (corte < 60) corte = 180;
          partes.push(f.slice(0, corte));
          f = f.slice(corte).trim();
        }
        acum = f;
      }
    });
    if (acum) partes.push(acum);
    return partes.length ? partes : [texto];
  }

  function duracionEstimada(texto) {
    return Math.min(9000, 600 + String(texto).length * 48);
  }

  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));

  /* ── habla ──────────────────────────────────────────────── */

  /* Regla de oro descubierta a la mala: cancelar con el sintetizador
     LIBRE es lo que atasca a Chrome y deja todo mudo. Solo se cancela
     cuando de verdad hay algo sonando o pendiente. */
  let fallosSeguidos = 0;     // trozos que nunca llegaron a arrancar
  let ttsEnSuspenso = 0;      // marca de tiempo: hasta aquí no confiamos en el synth
  let arrancoUltimo = false;  // ¿el último intento de habla llegó a sonar?
  let ultimoProblema = "";    // "" | "sin-voces" | "bloqueado" | "en-suspenso"

  function hablar(texto, perfil, alTerminar, rapido) {
    perfil = perfil || {};
    if (!texto) { if (alTerminar) alTerminar(); return; }

    const synth = window.speechSynthesis;
    const puedeHablar = synth && conf.activo && disponible() &&
      (!ttsEnSuspenso || Date.now() > ttsEnSuspenso);
    arrancoUltimo = false;
    ultimoProblema = synth ? "" : "sin-voces";
    if (ttsEnSuspenso && Date.now() <= ttsEnSuspenso) ultimoProblema = "en-suspenso";

    if (!puedeHablar) {
      // modo silencioso: ritmo estimado para que los subtítulos respiren
      if (rapido) { if (alTerminar) alTerminar(); }
      else setTimeout(alTerminar || (() => {}), duracionEstimada(texto));
      return;
    }

    const limpio = limpiar(texto);
    const trozos = trocear(limpio);
    const voz = perfil.voz || vozActual();
    const rate = clamp((perfil.rate || 1) * conf.velocidad, 0.5, 2);
    const pitch = clamp(perfil.pitch != null ? perfil.pitch : 1, 0, 2);
    const refs = []; // mantener vivas las utterances (bug de Chrome)
    const miGen = genHabla;
    let i = 0;
    let acabado = false;

    const terminarBien = () => {
      if (acabado) return;
      acabado = true;
      if (alTerminar) alTerminar();
    };

    // un trozo suelto, con red anti-cuelgue: si el navegador se lo traga,
    // destrabamos y reintentamos una vez; si sigue mudo, seguimos.
    // Solo el intento VIGENTE puede avanzar la cola.
    let actual = null;

    const decir = (trozo, sigo) => {
      let empezo = false;
      let hecho = false;

      /* cuánto TARDA en arrancar un trozo depende de su largo: los textos
         del parto son enormes y el motor necesita segundos para preparar
         la voz. Castigar esa lentitud con cancel() era lo que mataba la
         narración al final del juego. */
      const esperaArranque = Math.min(5000, Math.max(1800, 900 + trozo.length * 16));
      const esperaMuerte = Math.min(7000, esperaArranque + 2600);

      const fin = () => {
        if (hecho || actual !== finActual) return;
        hecho = true;
        sigo();
      };
      const finActual = fin;
      actual = fin;

      const lanzar = (desnudo) => {
        if (hecho || acabado || miGen !== genHabla || !conf.activo) {
          if (!hecho) { hecho = true; sigo(); }
          return;
        }
        let u;
        try { u = new SpeechSynthesisUtterance(trozo); }
        catch (e) { hecho = true; sigo(); return; }

        // voz FRESCA: los objetos de voz se vuelven obsoletos en algunos
        // navegadores y hablan a un canal muerto — silencio garantizado
        let vozFresca = null;
        if (voz && !desnudo) {
          const vivas = synth.getVoices() || [];
          vozFresca = vivas.find((v) => v.voiceURI === voz.voiceURI) ||
                      vivas.find((v) => v.name === voz.name) || voz;
        }
        if (vozFresca) { u.voice = vozFresca; u.lang = vozFresca.lang; }
        else { u.lang = "es-MX"; } // plan B mínimo: que el motor elija

        if (!desnudo) {
          u.rate = rate;
          u.pitch = pitch;
        }
        u.volume = 1;
        u.onstart = () => {
          empezo = true;
          arrancoUltimo = true;
          ultimoProblema = "";
          // un arranque REAL es la única prueba de salud del motor
          fallosSeguidos = 0;
          ttsEnSuspenso = 0;
        };
        u.onend = fin;
        u.onerror = fin;
        refs.push(u);
        try { synth.speak(u); } catch (e) { hecho = true; sigo(); return; }

        // vigilante 1: quedó pausado a medias → destrabar sin tocar la cola
        setTimeout(() => {
          if (hecho || empezo || actual !== finActual || !conf.activo || miGen !== genHabla) return;
          try { synth.resume(); } catch (e) {}
        }, Math.round(esperaArranque * 0.55));

        // vigilante 2: nunca arrancó → reintentar una vez DESNUDO (sin voz
        // ni pitch). Cancel solo si hay algo vivo en la cola: nunca de gratis.
        setTimeout(() => {
          if (hecho || empezo || actual !== finActual || !conf.activo || miGen !== genHabla) return;
          fallosSeguidos += 1;
          ultimoProblema = "bloqueado";
          if (synth.speaking || synth.pending || synth.paused) {
            try { synth.resume(); } catch (e) {}
            try { synth.cancel(); } catch (e) {}
          }
          setTimeout(() => {
            if (hecho || actual !== finActual || !conf.activo || miGen !== genHabla) return;
            lanzar(!desnudo); // segundo y último intento de este trozo
          }, 150);
        }, esperaArranque);

        // red final: la historia nunca se cuelga esperando una voz muda
        setTimeout(() => {
          if (hecho || empezo || actual !== finActual || miGen !== genHabla) return;
          hecho = true;
          fallosSeguidos += 1;
          ultimoProblema = "bloqueado";
          if (fallosSeguidos >= 3) {
            // el sintetizador no responde: un respiro en modo silencioso
            // (los subtítulos marcan el ritmo) y reintenta solo
            ttsEnSuspenso = Date.now() + 12000;
            ultimoProblema = "en-suspenso";
            fallosSeguidos = 0;
            try {
              window.dispatchEvent(new CustomEvent("vida-tts-suspendido"));
            } catch (e) { /* sin evento (tests) */ }
          }
          sigo();
        }, esperaMuerte);
      };

      // cancelar SOLO si hay algo ocupando el sintetizador
      if (synth.speaking || synth.pending || synth.paused) {
        try { synth.cancel(); } catch (e) {}
        setTimeout(lanzar, 110);
      } else {
        lanzar();
      }
    };

    const iniciar = () => {
      const siguiente = () => {
        if (acabado || miGen !== genHabla) return;
        if (i >= trozos.length) { terminarBien(); return; }
        decir(trozos[i++], siguiente);
      };
      siguiente();
    };

    iniciar();
  }

  /* cola de líneas: [{quien:"mama", texto:"…"}, …] */
  let tokenCola = 0;

  function hablarCola(items, enLinea, alFinal) {
    const token = ++tokenCola;
    const synth = window.speechSynthesis;
    // solo despejamos si de verdad hay algo sonando: un cancel con el
    // sintetizador libre es lo que deja a Chrome mudo
    if (synth && (synth.speaking || synth.pending || synth.paused)) {
      try { synth.resume(); } catch (e) {} // despausa para que el cancel muerda
      try { synth.cancel(); } catch (e) {}
    }

    const paso = (i) => {
      if (token !== tokenCola) return;
      if (i >= (items || []).length) { if (alFinal) alFinal(); return; }
      const linea = items[i];
      if (enLinea) { try { enLinea(i, linea); } catch (e) {} }
      hablar(linea.texto, castingPerfil(linea.quien), () => paso(i + 1),
        linea.rapido === true);
    };
    setTimeout(() => paso(0), 90);
  }

  function detener() {
    tokenCola++;
    genHabla++; // invalida vigilantes y reintentos de lo que sonaba
    pausaManual = false;
    const synth = window.speechSynthesis;
    // regla de oro también aquí: SOLO cancelar si hay algo ocupando el
    // sintetizador. Un cancel con el motor libre lo deja mudo para siempre.
    if (synth && (synth.speaking || synth.pending || synth.paused)) {
      try { synth.resume(); } catch (e) {}
      try { synth.cancel(); } catch (e) {}
    }
  }

  /* pausa manual desde el HUD: congela la frase, no mata la narración */
  function pausar() {
    const synth = window.speechSynthesis;
    if (synth && conf.activo && synth.speaking && !synth.paused) {
      try { synth.pause(); } catch (e) {}
      pausaManual = true;
      avisarCambio();
      return true;
    }
    return false;
  }

  function reanudar() {
    const synth = window.speechSynthesis;
    if (synth && synth.paused) {
      try { synth.resume(); } catch (e) {}
    }
    if (pausaManual) {
      pausaManual = false;
      avisarCambio();
      return true;
    }
    return false;
  }

  /* borra la desconfianza: obliga a intentar hablar otra vez ya */
  function reactivar() {
    ttsEnSuspenso = 0;
    fallosSeguidos = 0;
  }

  /* ── API ────────────────────────────────────────────────── */

  VIDA.narrador = {
    init, listo, disponible, catalogo, clasificar,
    vozActual, fijar, cambiarVelocidad, alternar,
    hablar, hablarCola, detener, pausar, reanudar, castingPerfil, reactivar,
    nombreBonito, origen, esNatural,
    alCambiar: (fn) => alCambiarFns.push(fn),
    get seleccion() { return conf.id; },
    get velocidad() { return conf.velocidad; },
    get activo() { return conf.activo; },
    get pausado() { return pausaManual; },
    // diagnóstico honesto: ¿el último intento de habla llegó a SONAR?
    get suenaAlgo() { return arrancoUltimo; },
    get problema() { return ultimoProblema; }
  };

  init();
})();
