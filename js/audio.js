/* ════════════════════════════════════════════════════════════
   VIDA · audio
   latido fetal sintetizado + ambientes generados con WebAudio.
   Sin archivos: todo se fabrica con osciladores y ruido.
   ════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  const VIDA = window.VIDA;

  let ctx = null;
  let master = null;
  let busAmbiente = null;
  let temporizador = null;
  let activo = false;
  let bpmActual = 140;

  /* loops de ambiente activos: nombre → {stop} */
  const loopsActivos = [];

  function asegurarContexto() {
    if (ctx) return true;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.5;
    master.connect(ctx.destination);
    busAmbiente = ctx.createGain();
    busAmbiente.gain.value = 0.55;
    busAmbiente.connect(master);
    return true;
  }

  function reanudar() {
    if (ctx && ctx.state === "suspended") ctx.resume();
  }

  /* Los navegadores crean el AudioContext "suspendido" si nace fuera de
     un clic: todo lo que suene después es silencio. Este despertar corre
     en el PRIMER gesto del usuario (captura, antes que nadie) y destraba
     el contexto para siempre. */
  function despertar() {
    if (asegurarContexto()) reanudar();
  }
  document.addEventListener("pointerdown", despertar, { capture: true, passive: true });
  document.addEventListener("keydown", despertar, { capture: true });

  /* ── latido ─────────────────────────────────────────────── */

  function golpe(cuando, fuerza) {
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const ganancia = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(62, cuando);
    osc.frequency.exponentialRampToValueAtTime(38, cuando + 0.16);

    ganancia.gain.setValueAtTime(0.0001, cuando);
    ganancia.gain.exponentialRampToValueAtTime(fuerza, cuando + 0.015);
    ganancia.gain.exponentialRampToValueAtTime(0.0001, cuando + 0.22);

    osc.connect(ganancia).connect(master);
    osc.start(cuando);
    osc.stop(cuando + 0.3);
  }

  function cicloLatido() {
    if (!ctx || !activo) return;
    const ahora = ctx.currentTime;
    golpe(ahora, 0.9);
    golpe(ahora + 0.24, 0.5);
    const intervalo = (60 / bpmActual) * 1000;
    temporizador = setTimeout(cicloLatido, Math.max(320, intervalo));
  }

  function encender(bpm) {
    if (!asegurarContexto()) return false;
    reanudar();
    bpmActual = bpm || bpmActual;
    if (activo) return true;
    activo = true;
    cicloLatido();
    return true;
  }

  function apagar() {
    activo = false;
    if (temporizador) { clearTimeout(temporizador); temporizador = null; }
  }

  function cambiarBpm(bpm) { bpmActual = bpm; }

  /* ── primitivas ─────────────────────────────────────────── */

  /* buffer de ruido blanco reutilizable */
  let bufferRuido = null;
  function ruido() {
    if (!ctx) return null;
    if (bufferRuido) return bufferRuido;
    const len = ctx.sampleRate * 2;
    bufferRuido = ctx.createBuffer(1, len, ctx.sampleRate);
    const datos = bufferRuido.getChannelData(0);
    for (let i = 0; i < len; i++) datos[i] = Math.random() * 2 - 1;
    return bufferRuido;
  }

  function tono(frecuencia, duracion, tipo, volumen, cuando) {
    if (!asegurarContexto()) return;
    reanudar();
    const t = cuando !== undefined ? cuando : ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = tipo || "triangle";
    osc.frequency.value = frecuencia;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(volumen || 0.25, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + duracion);
    osc.connect(g).connect(master);
    osc.start(t);
    osc.stop(t + duracion + 0.05);
  }

  function acierto(ok) {
    if (ok) {
      tono(523.25, 0.18, "sine");
      setTimeout(() => tono(783.99, 0.22, "sine"), 90);
    } else {
      tono(196, 0.25, "sine");
    }
  }

  /* ── generadores de ambiente (devuelven stop) ───────────── */

  /* lluvia/garúa: ruido filtrado paso-banda grave */
  function genLluvia() {
    const fuente = ctx.createBufferSource();
    fuente.buffer = ruido(); fuente.loop = true;
    const filtro = ctx.createBiquadFilter();
    filtro.type = "bandpass"; filtro.frequency.value = 900; filtro.Q.value = 0.6;
    const g = ctx.createGain(); g.gain.value = 0.10;
    fuente.connect(filtro).connect(g).connect(busAmbiente);
    fuente.start();
    return () => { try { fuente.stop(); } catch (e) {} };
  }

  /* calle: rumor grave + bocinas y motos aleatorias */
  function genCalle() {
    const fuente = ctx.createBufferSource();
    fuente.buffer = ruido(); fuente.loop = true;
    const filtro = ctx.createBiquadFilter();
    filtro.type = "lowpass"; filtro.frequency.value = 300;
    const g = ctx.createGain(); g.gain.value = 0.14;
    fuente.connect(filtro).connect(g).connect(busAmbiente);
    fuente.start();

    const vivos = [];
    function bocina() {
      if (!ctx) return;
      const f = [392, 440, 349][VIDA.util.azar(0, 2)];
      const t = ctx.currentTime;
      const o = ctx.createOscillator(), og = ctx.createGain();
      o.type = "square"; o.frequency.value = f;
      og.gain.setValueAtTime(0.0001, t);
      og.gain.exponentialRampToValueAtTime(0.03, t + 0.02);
      og.gain.setValueAtTime(0.03, t + 0.25);
      og.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
      o.connect(og).connect(busAmbiente);
      o.start(t); o.stop(t + 0.4);
      // motor de moto que pasa
      const m = ctx.createOscillator(), mg = ctx.createGain(), mf = ctx.createBiquadFilter();
      m.type = "sawtooth"; m.frequency.setValueAtTime(70 + Math.random() * 30, t);
      m.frequency.linearRampToValueAtTime(120, t + 1.6);
      mf.type = "lowpass"; mf.frequency.value = 240;
      mg.gain.setValueAtTime(0.0001, t);
      mg.gain.linearRampToValueAtTime(0.05, t + 0.5);
      mg.gain.linearRampToValueAtTime(0.0001, t + 1.8);
      m.connect(mf).connect(mg).connect(busAmbiente);
      m.start(t); m.stop(t + 1.9);
    }
    const intervalo = setInterval(() => { if (Math.random() < 0.55) bocina(); }, 2600);

    return () => {
      clearInterval(intervalo);
      try { fuente.stop(); } catch (e) {}
      vivos.length = 0;
    };
  }

  /* posta/hospital: pitido de monitor cada tanto + murmullo */
  function genPosta() {
    const fuente = ctx.createBufferSource();
    fuente.buffer = ruido(); fuente.loop = true;
    const filtro = ctx.createBiquadFilter();
    filtro.type = "bandpass"; filtro.frequency.value = 500; filtro.Q.value = 1.4;
    const g = ctx.createGain(); g.gain.value = 0.05;
    // murmullo que sube y baja como gente conversando
    const lfo = ctx.createOscillator(), lg = ctx.createGain();
    lfo.frequency.value = 0.22; lg.gain.value = 0.025;
    lfo.connect(lg).connect(g.gain);
    lfo.start();
    fuente.connect(filtro).connect(g).connect(busAmbiente);
    fuente.start();

    const pitido = () => {
      if (!ctx) return;
      const t = ctx.currentTime;
      const o = ctx.createOscillator(), og = ctx.createGain();
      o.type = "sine"; o.frequency.value = 880;
      og.gain.setValueAtTime(0.0001, t);
      og.gain.exponentialRampToValueAtTime(0.04, t + 0.01);
      og.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
      o.connect(og).connect(busAmbiente);
      o.start(t); o.stop(t + 0.15);
      o2(t + 0.22);
    };
    const o2 = (cuando) => {
      const o = ctx.createOscillator(), og = ctx.createGain();
      o.type = "sine"; o.frequency.value = 988;
      og.gain.setValueAtTime(0.0001, cuando);
      og.gain.exponentialRampToValueAtTime(0.03, cuando + 0.01);
      og.gain.exponentialRampToValueAtTime(0.0001, cuando + 0.10);
      o.connect(og).connect(busAmbiente);
      o.start(cuando); o.stop(cuando + 0.13);
    };
    const intervalo = setInterval(pitido, 3400);

    return () => {
      clearInterval(intervalo);
      try { lfo.stop(); fuente.stop(); } catch (e) {}
    };
  }

  /* sismo: retumbo grave ondulante */
  function genSismo() {
    const fuente = ctx.createBufferSource();
    fuente.buffer = ruido(); fuente.loop = true;
    const filtro = ctx.createBiquadFilter();
    filtro.type = "lowpass"; filtro.frequency.value = 90;
    const g = ctx.createGain(); g.gain.value = 0.001;
    fuente.connect(filtro).connect(g).connect(busAmbiente);
    fuente.start();
    // crece, tiembla, decrece
    const t = ctx.currentTime;
    g.gain.linearRampToValueAtTime(0.30, t + 1.4);
    g.gain.setValueAtTime(0.30, t + 7);
    g.gain.linearRampToValueAtTime(0.05, t + 11);
    const lfo = ctx.createOscillator(), lg = ctx.createGain();
    lfo.frequency.value = 5.5; lg.gain.value = 0.12;
    lfo.connect(lg).connect(g.gain);
    lfo.start(t); lfo.stop(t + 11);
    return () => { try { fuente.stop(); lfo.stop(); } catch (e) {} };
  }

  /* cumbia lejana: kick + shaker en bucle a 96 bpm */
  function genCumbia() {
    let compas = 0;
    const negra = 60 / 96 / 2; // corcheas
    const patronKick = [1, 0, 0, 1, 0, 0, 1, 0];
    const id = setInterval(() => {
      if (!ctx) return;
      const t = ctx.currentTime + 0.05;
      if (patronKick[compas % 8]) {
        const o = ctx.createOscillator(), og = ctx.createGain();
        o.type = "sine";
        o.frequency.setValueAtTime(130, t);
        o.frequency.exponentialRampToValueAtTime(45, t + 0.12);
        og.gain.setValueAtTime(0.09, t);
        og.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
        o.connect(og).connect(busAmbiente);
        o.start(t); o.stop(t + 0.18);
      }
      // shaker
      const s = ctx.createBufferSource(); s.buffer = ruido();
      const sf = ctx.createBiquadFilter(); sf.type = "highpass"; sf.frequency.value = 6000;
      const sg = ctx.createGain();
      sg.gain.setValueAtTime(compas % 2 ? 0.015 : 0.008, t);
      sg.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);
      s.connect(sf).connect(sg).connect(busAmbiente);
      s.start(t); s.stop(t + 0.08);
      // bajo cada dos compases
      if (compas % 16 === 0) {
        tono([65.4, 73.4][Math.floor(compas / 16) % 2], 0.5, "triangle", 0.05, t);
      }
      compas++;
    }, negra * 1000);
    return () => clearInterval(id);
  }

  const GENERADORES = {
    lluvia: genLluvia,
    calle: genCalle,
    posta: genPosta,
    hospital: genPosta,
    sismo: genSismo,
    cumbia: genCumbia
  };

  function ambiente(nombres) {
    if (!asegurarContexto()) return;
    reanudar();
    pararAmbiente();
    (nombres || []).forEach((n) => {
      const gen = GENERADORES[n];
      if (gen) loopsActivos.push({ nombre: n, stop: gen() });
    });
  }

  function pararAmbiente() {
    while (loopsActivos.length) {
      try { loopsActivos.pop().stop(); } catch (e) {}
    }
  }

  /* ── golpes puntuales ───────────────────────────────────── */

  function puerta() {
    if (!asegurarContexto()) return;
    reanudar();
    const t = ctx.currentTime;
    const s = ctx.createBufferSource(); s.buffer = ruido();
    const f = ctx.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = 500;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.35, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
    s.connect(f).connect(g).connect(master);
    s.start(t); s.stop(t + 0.2);
    golpe(t + 0.01, 0.8);
  }

  /* primer llanto: barrido agudo tembloroso ×3 */
  function bebeLlora() {
    if (!asegurarContexto()) return;
    reanudar();
    const base = ctx.currentTime + 0.1;
    for (let i = 0; i < 3; i++) {
      const t = base + i * 0.85;
      const o = ctx.createOscillator(), g = ctx.createGain(), v = ctx.createOscillator(), vg = ctx.createGain();
      o.type = "sawtooth";
      o.frequency.setValueAtTime(420, t);
      o.frequency.linearRampToValueAtTime(640, t + 0.25);
      o.frequency.linearRampToValueAtTime(480, t + 0.55);
      v.frequency.value = 9; vg.gain.value = 26;
      v.connect(vg).connect(o.frequency);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(0.07, t + 0.08);
      g.gain.setValueAtTime(0.07, t + 0.45);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.62);
      const f = ctx.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = 1800;
      o.connect(f).connect(g).connect(master);
      o.start(t); o.stop(t + 0.65);
      v.start(t); v.stop(t + 0.65);
    }
  }

  /* acorde de guitarra desafinado — el motivo del papá */
  function guitarra(notasBase) {
    if (!asegurarContexto()) return;
    reanudar();
    const notas = notasBase || [146.8, 220, 293.7]; // D A D — tres acordes
    const t0 = ctx.currentTime;
    notas.forEach((f, i) => {
      const t = t0 + i * 0.42;
      [1, 1.5, 2].forEach((mult, j) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = "triangle";
        o.frequency.value = f * mult * (j === 2 ? 1.003 : 1); // ligera desafinación
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(j === 0 ? 0.09 : 0.035, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.8);
        o.connect(g).connect(master);
        o.start(t); o.stop(t + 0.85);
      });
    });
  }

  VIDA.audio = {
    encender, apagar, cambiarBpm, tono, acierto,
    ambiente, pararAmbiente, puerta, bebeLlora, guitarra, despertar,
    get activo() { return activo; },
    get ctxListo() { return !!asegurarContexto(); }
  };
})();
