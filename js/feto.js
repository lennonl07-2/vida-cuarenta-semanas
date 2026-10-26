/* ════════════════════════════════════════════════════════════
   VIDA · ventana al interior
   dibuja el desarrollo semana a semana: siluetas, partículas,
   latido y tamaños comparativos reales.
   ════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  const VIDA = window.VIDA;

  /* ── datos reales aproximados por semana ─────────────────── */

  const TAMANOS = {
    0:  ["un instante", "—"],
    1:  ["una idea del tamaño de un punto", "en formación"],
    2:  ["un cúmulo de polvo tibio", "en formación"],
    3:  ["la cabeza de un alfiler", "en formación"],
    4:  ["una semilla de amapola · 1 mm", "en formación"],
    5:  ["un grano de sésamo · 2 mm", "en formación"],
    6:  ["una lenteja · 4 mm", "≈110 lpm"],
    7:  ["un arándano · 10 mm", "≈125 lpm"],
    8:  ["una frambuesa · 16 mm", "≈145 lpm"],
    9:  ["una aceituna · 23 mm", "≈155 lpm"],
    10: ["una fresa · 31 mm", "≈160 lpm"],
    11: ["un higo · 41 mm", "≈158 lpm"],
    12: ["una lima · 53 mm", "≈152 lpm"],
    13: ["una vaina de guisantes · 7,4 cm", "≈150 lpm"],
    14: ["un limón · 8,7 cm", "≈150 lpm"],
    15: ["una manzana · 10 cm", "≈148 lpm"],
    16: ["un aguacate · 11,6 cm", "≈146 lpm"],
    17: ["una pera · 13 cm", "≈146 lpm"],
    18: ["un pimiento · 14,2 cm", "≈144 lpm"],
    19: ["un mango · 15,3 cm", "≈142 lpm"],
    20: ["un plátano · 16,4 cm", "≈140 lpm"],
    21: ["una zanahoria · 26,7 cm", "≈140 lpm"],
    22: ["un calabacín · 27,8 cm", "≈138 lpm"],
    23: ["una berenjena · 28,9 cm", "≈138 lpm"],
    24: ["una mazorca · 30 cm", "≈138 lpm"],
    25: ["una coliflor · 34,6 cm", "≈138 lpm"],
    26: ["un zapallito · 35,6 cm", "≈138 lpm"],
    27: ["un repollo · 36,6 cm", "≈136 lpm"],
    28: ["una berenjena grande · 37,6 cm", "≈136 lpm"],
    29: ["una calabaza · 38,6 cm", "≈136 lpm"],
    30: ["un repollo grande · 39,9 cm", "≈134 lpm"],
    31: ["un coco · 41,1 cm", "≈134 lpm"],
    32: ["una jícama · 42,4 cm", "≈134 lpm"],
    33: ["una piña · 43,7 cm", "≈132 lpm"],
    34: ["un melón · 45 cm", "≈132 lpm"],
    35: ["un melón maduro · 46,2 cm", "≈132 lpm"],
    36: ["una lechuga romana · 47,4 cm", "≈130 lpm"],
    37: ["una acelga · 48,6 cm", "≈130 lpm"],
    38: ["un puerro · 49,8 cm", "≈130 lpm"],
    39: ["una sandía chica · 50,7 cm", "≈128 lpm"],
    40: ["listo para el mundo · ≈51 cm", "≈128 lpm"]
  };

  /* ── utilidades de dibujo ────────────────────────────────── */

  const PIEL = "#e9c8b4";
  const PIEL_BRILLO = "#f6ddcd";
  const LINEA_SUAVE = "rgba(233,200,180,.4)";

  function circ(x, y, r, extra) {
    return `<circle cx="${x}" cy="${y}" r="${r}" ${extra || ""}/>`;
  }
  function trazo(d, w, extra) {
    return `<path d="${d}" fill="none" stroke-width="${w}" stroke-linecap="round" ${extra || ""}/>`;
  }

  /* cada etapa devuelve marcado dentro de un grupo centrado en 100,100 */
  const ETAPAS = [
    {
      desde: 0,
      dibujar() {
        return `
          ${circ(100, 100, 15, `fill="${PIEL}"`)}
          ${circ(100, 100, 6.5, `fill="${PIEL_BRILLO}"`)}
          ${circ(100, 100, 24, `fill="none" stroke="${LINEA_SUAVE}" stroke-dasharray="2 5"`)}
          ${[0, 60, 120, 180, 240, 300].map(a => {
            const rad = a * Math.PI / 180;
            return circ(100 + Math.cos(rad) * 34, 100 + Math.sin(rad) * 34, 1.4, `fill="rgba(233,200,180,.5)"`);
          }).join("")}`;
      }
    },
    {
      desde: 2,
      dibujar() {
        let cluster = circ(100, 100, 9, `fill="${PIEL_BRILLO}" opacity=".9"`);
        for (let i = 0; i < 9; i++) {
          const a = (i / 9) * Math.PI * 2;
          const r = 17 + (i % 2) * 4;
          cluster += circ(100 + Math.cos(a) * r, 100 + Math.sin(a) * r, 7.5, `fill="${PIEL}"`);
        }
        cluster += circ(100, 100, 34, `fill="none" stroke="${LINEA_SUAVE}" stroke-dasharray="2 6"`);
        return cluster;
      }
    },
    {
      desde: 4,
      dibujar() {
        // disco implantándose sobre una pared curva
        return `
          ${trazo("M20 150 Q 100 118 180 150", 26, `stroke="rgba(217,165,160,.22)"`)}
          ${trazo("M20 162 Q 100 132 180 162", 14, `stroke="rgba(217,165,160,.14)"`)}
          ${circ(100, 96, 17, `fill="${PIEL}"`)}
          ${circ(95, 91, 6, `fill="${PIEL_BRILLO}"`)}
          ${circ(109, 103, 5, `fill="#d8a68f" opacity=".7"`)}
          ${circ(100, 96, 30, `fill="none" stroke="${LINEA_SUAVE}" stroke-dasharray="2 6"`)}
          ${trazo("M64 66 q 8 -10 18 -4", 2, `stroke="rgba(233,200,180,.35)"`)}
          ${trazo("M124 70 q -6 -10 -16 -5", 2, `stroke="rgba(233,200,180,.35)"`)}`;
      }
    },
    {
      desde: 6,
      dibujar() {
        // embrión en coma, con cola visible y corazón que asoma
        return `
          ${circ(116, 78, 21, `fill="${PIEL}"`)}
          ${trazo("M112 96 C 102 126 76 142 56 132 C 42 125 42 108 54 102", 22, `stroke="${PIEL}"`)}
          ${trazo("M56 104 C 50 112 52 122 60 126", 9, `stroke="${PIEL}"`)}
          ${circ(112, 90, 3.4, `fill="#c96a52" class="corazoncito"`)}
          ${circ(124, 70, 2, `fill="rgba(56,41,47,.55)"`)}
          ${trazo("M84 118 q 10 6 20 2", 3, `stroke="rgba(185,92,61,.5)"`)}`;
      }
    },
    {
      desde: 8,
      dibujar() {
        // brotes de brazos y piernas, cabeza aún dominante
        return `
          ${circ(118, 72, 24, `fill="${PIEL}"`)}
          ${trazo("M112 92 C 104 118 84 134 62 132", 24, `stroke="${PIEL}"`)}
          ${trazo("M104 100 C 88 96 76 84 72 70", 9, `stroke="${PIEL}"`)}
          ${trazo("M98 116 C 86 124 78 136 78 148", 10, `stroke="${PIEL}"`)}
          ${trazo("M112 96 C 126 104 132 118 128 132", 8, `stroke="${PIEL}"`)}
          ${trazo("M62 132 C 56 140 58 150 66 154", 8, `stroke="${PIEL}"`)}
          ${circ(112, 84, 3.6, `fill="#c96a52" class="corazoncito"`)}
          ${circ(127, 63, 2.2, `fill="rgba(56,41,47,.55)"`)}
          ${circ(137, 76, 2.2, `fill="rgba(56,41,47,.4)"`)}
          ${trazo("M70 66 q 6 -8 14 -5", 2.5, `stroke="rgba(233,200,180,.4)"`)}
          ${trazo("M148 84 q 8 6 4 14", 2.5, `stroke="rgba(233,200,180,.4)"`)}`;
      }
    },
    {
      desde: 10,
      dibujar() {
        // feto temprano: cola desaparece, perfil humano
        return `
          ${circ(114, 66, 26, `fill="${PIEL}"`)}
          ${trazo("M110 88 C 104 118 88 140 66 144 C 52 146 46 136 52 126", 27, `stroke="${PIEL}"`)}
          ${trazo("M100 96 C 84 92 72 82 68 68", 11, `stroke="${PIEL}"`)}
          ${trazo("M94 116 C 80 124 72 138 74 152", 12, `stroke="${PIEL}"`)}
          ${trazo("M116 98 C 130 108 134 124 128 138", 9, `stroke="${PIEL}"`)}
          ${trazo("M66 144 C 60 152 62 160 70 164", 9, `stroke="${PIEL}"`)}
          ${circ(122, 78, 2.4, `fill="rgba(56,41,47,.6)"`)}
          ${trazo("M132 84 a 6 6 0 0 1 6 6", 2.5, `stroke="rgba(56,41,47,.35)"`)}
          ${trazo("M118 88 q 4 3 8 0", 2.2, `stroke="rgba(56,41,47,.3)"`)}
          ${trazo("M60 62 q 8 -9 18 -6", 3, `stroke="rgba(233,200,180,.4)"`)}`;
      }
    },
    {
      desde: 13,
      dibujar() {
        // feto medio: proporciones más humanas, cordón visible
        return `
          ${trazo("M168 40 C 176 60 174 92 160 116", 7, `stroke="rgba(216,166,143,.35)" stroke-dasharray="1 7"`)}
          ${circ(112, 60, 28, `fill="${PIEL}"`)}
          ${trazo("M106 84 C 100 118 86 142 64 148 C 50 151 44 140 51 131", 30, `stroke="${PIEL}"`)}
          ${trazo("M96 94 C 78 90 66 78 63 62", 13, `stroke="${PIEL}"`)}
          ${trazo("M90 118 C 74 128 66 144 69 160", 14, `stroke="${PIEL}"`)}
          ${trazo("M118 98 C 133 108 138 126 131 142", 11, `stroke="${PIEL}"`)}
          ${trazo("M64 148 C 57 157 59 166 68 170", 10, `stroke="${PIEL}"`)}
          ${circ(120, 71, 2.6, `fill="rgba(56,41,47,.6)"`)}
          ${trazo("M132 77 a 7 7 0 0 1 7 7", 2.8, `stroke="rgba(56,41,47,.35)"`)}
          ${trazo("M116 81 q 4 3 9 0", 2.4, `stroke="rgba(56,41,47,.3)"`)}
          ${trazo("M56 56 q 9 -10 20 -7", 3.2, `stroke="rgba(233,200,180,.4)"`)}`;
      }
    },
    {
      desde: 22,
      dibujar() {
        // feto grande: casi ocupa la ventana, cejas y pestañas
        return `
          ${trazo("M172 34 C 180 58 178 96 162 124", 8, `stroke="rgba(216,166,143,.32)" stroke-dasharray="1 8"`)}
          ${circ(110, 56, 32, `fill="${PIEL}"`)}
          ${trazo("M104 84 C 98 120 84 146 60 153 C 45 157 39 145 46 135", 34, `stroke="${PIEL}"`)}
          ${trazo("M92 94 C 72 90 58 76 55 58", 15, `stroke="${PIEL}"`)}
          ${trazo("M86 120 C 68 132 60 150 64 168", 16, `stroke="${PIEL}"`)}
          ${trazo("M120 100 C 136 112 141 132 133 150", 13, `stroke="${PIEL}"`)}
          ${trazo("M60 153 C 52 163 55 173 65 177", 11, `stroke="${PIEL}"`)}
          ${trazo("M97 46 a 4 4 0 0 1 8 1", 2.6, `stroke="rgba(56,41,47,.45)"`)}
          ${trazo("M119 47 a 4 4 0 0 1 8 1", 2.6, `stroke="rgba(56,41,47,.45)"`)}
          ${circ(101, 62, 2.8, `fill="rgba(56,41,47,.65)"`)}
          ${circ(123, 63, 2.8, `fill="rgba(56,41,47,.65)"`)}
          ${trazo("M130 70 a 8 8 0 0 1 8 8", 3, `stroke="rgba(56,41,47,.35)"`)}
          ${trazo("M112 74 q 5 4 10 0", 2.6, `stroke="rgba(56,41,47,.32)"`)}
          ${trazo("M50 48 q 10 -11 22 -8", 3.5, `stroke="rgba(233,200,180,.4)"`)}
          ${circ(150, 140, 5, `fill="none" stroke="rgba(216,166,143,.4)" stroke-dasharray="2 4"`)}
          <text x="150" y="144" text-anchor="middle" font-size="6" fill="rgba(246,221,205,.7)" font-family="monospace">+</text>`;
      }
    },
    {
      desde: 34,
      dibujar() {
        // término: encajado, de espaldas, listo para nacer
        return `
          ${trazo("M170 30 C 178 56 176 96 160 126", 8, `stroke="rgba(216,166,143,.3)" stroke-dasharray="1 8"`)}
          ${circ(104, 118, 34, `fill="${PIEL}"`)}
          ${trazo("M100 88 C 96 62 104 42 122 34", 32, `stroke="${PIEL}"`)}
          ${trazo("M92 96 C 74 100 60 112 56 128", 16, `stroke="${PIEL}"`)}
          ${trazo("M112 92 C 128 100 134 116 130 132", 14, `stroke="${PIEL}"`)}
          ${trazo("M84 132 C 72 142 68 156 74 168", 14, `stroke="${PIEL}"`)}
          ${trazo("M56 128 C 48 136 50 148 60 152", 12, `stroke="${PIEL}"`)}
          ${trazo("M92 108 a 5 5 0 0 1 9 2", 2.8, `stroke="rgba(56,41,47,.4)"`)}
          ${trazo("M116 110 a 5 5 0 0 1 9 2", 2.8, `stroke="rgba(56,41,47,.4)"`)}
          ${trazo("M96 124 q 6 4 12 0", 2.8, `stroke="rgba(56,41,47,.3)"`)}
          ${trazo("M50 96 q 8 -10 19 -8", 3.5, `stroke="rgba(233,200,180,.35)"`)}
          ${circ(146, 52, 6, `fill="none" stroke="rgba(216,166,143,.4)" stroke-dasharray="2 4"`)}
          <text x="146" y="56" text-anchor="middle" font-size="7" fill="rgba(246,221,205,.75)" font-family="monospace">↓</text>`;
      }
    }
  ];

  /* ── partículas flotantes (líquido amniótico / células) ──── */

  function particulas(cantidad) {
    let out = "";
    for (let i = 0; i < cantidad; i++) {
      const x = VIDA.util.azar(8, 192);
      const y = VIDA.util.azar(8, 192);
      const r = (VIDA.util.azar(8, 26)) / 10;
      const dur = VIDA.util.azar(9, 22);
      const delay = -VIDA.util.azar(0, 20);
      out += `<circle cx="${x}" cy="${y}" r="${r}" fill="rgba(233,200,180,${(VIDA.util.azar(15, 45)) / 100})"
        style="animation: vidaFlotar ${dur}s ease-in-out ${delay}s infinite alternate"/>`;
    }
    return out;
  }

  /* estilos inyectados una sola vez */
  let estilosListos = false;
  function inyectarEstilos() {
    if (estilosListos) return;
    estilosListos = true;
    const css = `
      @keyframes vidaFlotar { from { transform: translate(0,0); } to { transform: translate(6px,-10px); } }
      @keyframes vidaCorazon { 0%,100% { transform: scale(1);} 12% { transform: scale(1.35);} 24% { transform: scale(1);} 36% { transform: scale(1.22);} 48% { transform: scale(1);} }
      .corazoncito { transform-origin: center; transform-box: fill-box; animation: vidaCorazon 1s ease-in-out infinite; }
    `;
    const s = document.createElement("style");
    s.textContent = css;
    document.head.appendChild(s);
  }

  /* ── render principal ────────────────────────────────────── */

  function render(semana, contenedor, tamanoEl, bpmEl) {
    if (!contenedor) return;
    inyectarEstilos();

    let etapa = ETAPAS[0];
    ETAPAS.forEach((e) => { if (semana >= e.desde) etapa = e; });

    const escala = 0.62 + Math.min(semana, 40) / 40 * 0.5; // crece con las semanas

    const svg = `
      <svg viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <radialGradient id="vidaLuz" cx="38%" cy="32%" r="75%">
            <stop offset="0%" stop-color="rgba(255,214,186,.14)"/>
            <stop offset="55%" stop-color="rgba(255,214,186,.04)"/>
            <stop offset="100%" stop-color="rgba(0,0,0,.28)"/>
          </radialGradient>
          <filter id="vidaSuave" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.1"/>
          </filter>
        </defs>
        <rect width="200" height="200" fill="url(#vidaLuz)"/>
        ${particulas(semana <= 5 ? 26 : 16)}
        <g transform="translate(${100 - 100 * escala} ${100 - 100 * escala}) scale(${escala})">
          <g filter="url(#vidaSuave)" opacity=".5">${etapa.dibujar()}</g>
          ${etapa.dibujar()}
        </g>
      </svg>`;

    contenedor.innerHTML = svg;

    const info = TAMANOS[Math.max(0, Math.min(40, semana))] || TAMANOS[0];
    if (tamanoEl) tamanoEl.textContent = info[0];
    if (bpmEl) bpmEl.textContent = info[1];
  }

  VIDA.feto = { render, TAMANOS };
})();
