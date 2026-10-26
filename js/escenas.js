/* ════════════════════════════════════════════════════════════
   VIDA · escenarios
   Un cuadrito ilustrado bajo el título de cada escena: dibuja el
   lugar (paradero, baño del pasaje, posta, azotea, hospital…) con
   SVG hecho a mano, sin imágenes externas. La clave se deduce del
   lugar/título/id del nodo, y algunas escenas miran flags.
   ════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  const VIDA = window.VIDA;

  /* ── paleta de la cartilla ───────────────────────────────── */
  const CIELO = "#ece2cd";
  const TINTA = "#38292f";
  const TERRACOTA = "#b95c3d";
  const SALVIA = "#7d9371";
  const ORO = "#c99a4b";
  const LUZ = "#f0d9a8";
  const CAMINO = "#c2a37f";
  const TIERRA = "#a8896b";
  const TIERRA_OSC = "#8f7057";
  const CRISTAL = "#cfdfd8";

  /* ── ayudantes de dibujo ─────────────────────────────────── */

  function casa(x, y, s, cuerpo) {
    return `<g transform="translate(${x} ${y}) scale(${s || 1})">
      <rect x="-8" y="-10" width="16" height="12" fill="${cuerpo || TIERRA_OSC}"/>
      <path d="M-10 -10 L0 -19 L10 -10 Z" fill="#6b4a35"/>
      <rect x="-3" y="-6" width="5" height="5" fill="rgba(240,217,168,.92)"/>
    </g>`;
  }

  function garua() {
    const gotas = [[30,18],[92,42],[152,12],[212,34],[262,16],[322,44],[372,20],
      [60,72],[182,62],[302,68],[120,98],[242,94]];
    let s = "";
    gotas.forEach(([x, y]) => { s += `<line x1="${x}" y1="${y}" x2="${x - 7}" y2="${y + 11}"/>`; });
    return `<g stroke="rgba(110,120,135,.32)" stroke-width="1.4">${s}</g>`;
  }

  function foco(x, hastaY, ancho) {
    return `<line x1="${x}" y1="0" x2="${x}" y2="${hastaY - 8}" stroke="${TINTA}" stroke-width="2"/>
      <circle cx="${x}" cy="${hastaY}" r="6.5" fill="#f2cf7c" stroke="${TINTA}"/>
      <polygon points="${x},${hastaY + 8} ${x - (ancho || 80)},150 ${x + (ancho || 80)},150"
        fill="rgba(242,207,124,.18)"/>`;
  }

  /* ── las viñetas ─────────────────────────────────────────── */

  const ESCENAS = {

    /* paradero de la Av. Los Héroes: combi, cerro y garúa */
    calle: `
      <rect width="400" height="150" fill="${CIELO}"/>
      <circle cx="332" cy="28" r="13" fill="rgba(201,154,75,.5)"/>
      <path d="M0 40 Q200 58 400 36" fill="none" stroke="${TINTA}" opacity=".22"/>
      <path d="M0 74 Q80 50 160 68 T320 62 Q360 58 400 66 L400 150 L0 150 Z" fill="${CAMINO}"/>
      ${casa(70, 62)}${casa(108, 68, .85)}${casa(252, 58, .9)}${casa(300, 66)}
      <path d="M0 96 Q120 78 240 92 T400 88 L400 150 L0 150 Z" fill="${TIERRA}"/>
      <rect y="122" width="400" height="28" fill="#6b5b59"/>
      ${[20, 64, 108, 152, 196].map((x) => `<rect x="${x}" y="134" width="16" height="3" fill="rgba(246,241,231,.5)"/>`).join("")}
      <rect x="54" y="84" width="4" height="42" fill="${TINTA}"/>
      <rect x="44" y="74" width="24" height="13" rx="2" fill="${TERRACOTA}"/>
      <rect x="30" y="112" width="36" height="4" fill="#8a5a44"/>
      <rect x="33" y="116" width="3" height="10" fill="${TINTA}"/><rect x="60" y="116" width="3" height="10" fill="${TINTA}"/>
      <g>
        <rect x="268" y="90" width="106" height="38" rx="7" fill="#c46a4a"/>
        <rect x="276" y="97" width="62" height="13" rx="2" fill="#efe6d3"/>
        <rect x="344" y="97" width="22" height="13" rx="2" fill="${CRISTAL}"/>
        <circle cx="290" cy="129" r="7" fill="#2b2026"/><circle cx="290" cy="129" r="2.6" fill="#9a8f92"/>
        <circle cx="352" cy="129" r="7" fill="#2b2026"/><circle cx="352" cy="129" r="2.6" fill="#9a8f92"/>
      </g>
      ${garua()}`,

    /* dentro de la combi rumbo al centro, de madrugada */
    combi: `
      <rect width="400" height="150" fill="#d9cbb4"/>
      <rect width="400" height="16" fill="#b8a68c"/>
      <line x1="20" y1="8" x2="380" y2="8" stroke="${TINTA}" opacity=".3"/>
      <rect y="128" width="400" height="22" fill="#8f7a63"/>
      <rect x="18" y="26" width="170" height="58" rx="10" fill="${CRISTAL}" stroke="${TINTA}" stroke-width="2"/>
      <line x1="100" y1="26" x2="100" y2="84" stroke="#8f7a63" stroke-width="6" opacity=".8"/>
      <rect x="216" y="24" width="166" height="72" rx="10" fill="${CRISTAL}" stroke="${TINTA}" stroke-width="2"/>
      <path d="M224 70 Q262 52 300 64 T374 58 L374 92 L224 92 Z" fill="${TIERRA}"/>
      <rect x="224" y="84" width="150" height="8" fill="#6b5b59"/>
      <circle cx="300" cy="116" r="17" fill="none" stroke="${TINTA}" stroke-width="5"/>
      <circle cx="300" cy="116" r="4" fill="${TINTA}"/>
      <line x1="315" y1="124" x2="342" y2="128" stroke="${TINTA}" stroke-width="4"/>
      <rect x="216" y="96" width="166" height="9" fill="#b3703f"/>
      <path d="M206 16 L213 46" stroke="${TINTA}" stroke-width="1.5"/>
      <rect x="209.5" y="46" width="7" height="10" rx="1.5" fill="${TINTA}"/>
      ${[30, 92, 154].map((x) => `<rect x="${x}" y="88" width="42" height="46" rx="9" fill="#7a4b3a"/>
        <rect x="${x + 6}" y="78" width="30" height="12" rx="5" fill="#6b4232"/>`).join("")}`,

    /* el baño compartido del pasaje: baldosas, foco desnudo, balde */
    bano: `
      <rect width="400" height="150" fill="#ddd3c0"/>
      ${[32, 64, 96, 128, 160].map((x) => `<line x1="${x}" y1="0" x2="${x}" y2="150" stroke="rgba(56,41,47,.08)"/>`).join("")}
      ${[26, 52, 78, 104, 130].map((y) => `<line x1="0" y1="${y}" x2="400" y2="${y}" stroke="rgba(56,41,47,.08)"/>`).join("")}
      <rect y="108" width="400" height="42" fill="#c9bba2"/>
      <circle cx="60" cy="58" r="15" fill="${CRISTAL}" stroke="${TINTA}" stroke-width="1.5"/>
      ${foco(140, 40, 46)}
      <ellipse cx="140" cy="96" rx="30" ry="9" fill="#eee6d6" stroke="${TINTA}"/>
      <rect x="132" y="101" width="16" height="33" fill="#e6dcc8" stroke="${TINTA}"/>
      <path d="M126 88 q14 -10 28 0" fill="none" stroke="${TINTA}" stroke-width="2"/>
      <ellipse cx="212" cy="139" rx="26" ry="5" fill="rgba(125,147,113,.4)"/>
      <ellipse cx="256" cy="144" rx="14" ry="3.5" fill="rgba(125,147,113,.3)"/>
      <path d="M228 110 L250 110 L246 134 L232 134 Z" fill="#9aa1a8" stroke="${TINTA}"/>
      <rect x="280" y="18" width="98" height="120" fill="#a9714f" stroke="${TINTA}" stroke-width="1.5"/>
      <line x1="274" y1="18" x2="396" y2="18" stroke="${TINTA}" stroke-width="3"/>
      <path d="M290 20 q9 30 0 60 q-7 30 5 58 L336 138 q-9 -30 0 -60 q7 -28 -2 -58 Z" fill="${TERRACOTA}" opacity=".92"/>`,

    /* la posta de Pamplona Alta: cruz salvia, banco, cola tempranera */
    posta: `
      <rect width="400" height="150" fill="${CIELO}"/>
      ${garua()}
      <rect y="118" width="400" height="32" fill="#b09a80"/>
      <rect x="36" y="30" width="328" height="88" fill="#e7dcc6" stroke="${TINTA}" stroke-width="1.5"/>
      <rect x="26" y="21" width="348" height="10" fill="${TERRACOTA}"/>
      <rect x="87" y="40" width="6" height="26" fill="${SALVIA}"/>
      <rect x="79" y="47" width="22" height="6" fill="${SALVIA}"/>
      <rect x="150" y="38" width="122" height="24" rx="3" fill="#f6f1e7" stroke="${TINTA}"/>
      <text x="211" y="56" text-anchor="middle" font-family="'IBM Plex Mono',monospace"
        font-size="13" letter-spacing="5" fill="${TINTA}">POSTA</text>
      <rect x="56" y="66" width="34" height="24" fill="${CRISTAL}" stroke="${TINTA}"/>
      <rect x="230" y="66" width="34" height="24" fill="${CRISTAL}" stroke="${TINTA}"/>
      <rect x="298" y="64" width="42" height="54" fill="#8a5a44" stroke="${TINTA}"/>
      <circle cx="332" cy="92" r="2.4" fill="${LUZ}"/>
      <rect x="50" y="110" width="76" height="5" fill="#8a5a44"/>
      <rect x="54" y="115" width="4" height="12" fill="${TINTA}"/><rect x="118" y="115" width="4" height="12" fill="${TINTA}"/>
      <circle cx="70" cy="96" r="6" fill="${TINTA}"/>
      <rect x="62" y="102" width="16" height="11" rx="5" fill="${TERRACOTA}"/>
      <circle cx="102" cy="96" r="6" fill="${TINTA}"/>
      <rect x="94" y="102" width="16" height="11" rx="5" fill="${SALVIA}"/>
      <circle cx="186" cy="88" r="6" fill="${TINTA}"/>
      <rect x="179" y="94" width="15" height="26" rx="6" fill="${ORO}"/>`,

    /* consultorio de ecografía: máquina con pantallita y camilla */
    clinica: `
      <rect width="400" height="150" fill="#e4dac6"/>
      <rect y="112" width="400" height="38" fill="#cfc3ad"/>
      <rect x="24" y="92" width="172" height="14" rx="4" fill="#f0ead9" stroke="${TINTA}"/>
      <rect x="34" y="106" width="5" height="18" fill="${TINTA}"/>
      <rect x="180" y="106" width="5" height="18" fill="${TINTA}"/>
      <rect x="30" y="85" width="32" height="8" rx="3" fill="#fdfaf2" stroke="${TINTA}"/>
      <circle cx="200" cy="86" r="8" fill="#fdfaf2" stroke="${TINTA}"/>
      <rect x="250" y="46" width="120" height="68" rx="8" fill="#5c6570" stroke="${TINTA}"/>
      <rect x="260" y="55" width="74" height="46" rx="3" fill="#10202a"/>
      <ellipse cx="296" cy="80" rx="13" ry="16" fill="none" stroke="#9fd4e0" stroke-width="2.5"/>
      <circle cx="296" cy="65" r="6" fill="none" stroke="#9fd4e0" stroke-width="2.5"/>
      <polyline points="262,95 272,95 276,87 282,99 288,95 330,95" fill="none" stroke="#7fb08a" stroke-width="1.6"/>
      <circle cx="350" cy="60" r="5" fill="#cfd4d9"/><circle cx="350" cy="76" r="5" fill="#cfd4d9"/><circle cx="350" cy="92" r="5" fill="#cfd4d9"/>
      <path d="M322 104 Q308 126 272 123" fill="none" stroke="${TINTA}" stroke-width="2"/>
      <rect x="260" y="119" width="14" height="8" rx="2" fill="#5c6570" stroke="${TINTA}"/>`,

    /* el cuarto de triplay: cama, lata de ahorros, guitarra */
    cuarto: `
      <rect width="400" height="150" fill="#c9a877"/>
      ${[40, 80, 120, 160, 200, 240, 280, 320, 360].map((x) => `<line x1="${x}" y1="0" x2="${x}" y2="132" stroke="rgba(56,41,47,.14)" stroke-width="1.5"/>`).join("")}
      <ellipse cx="102" cy="34" rx="4" ry="2.6" fill="none" stroke="rgba(56,41,47,.25)"/>
      <ellipse cx="301" cy="58" rx="3.4" ry="2.2" fill="none" stroke="rgba(56,41,47,.25)"/>
      <rect y="132" width="400" height="18" fill="#8f7a63"/>
      ${foco(206, 30, 88)}
      <rect x="26" y="96" width="212" height="30" fill="#8a5a44" stroke="${TINTA}"/>
      <rect x="22" y="86" width="220" height="14" rx="4" fill="#efe6d3" stroke="${TINTA}"/>
      <rect x="30" y="79" width="36" height="10" rx="4" fill="#fdfaf2" stroke="${TINTA}"/>
      <rect x="122" y="86" width="118" height="14" fill="${SALVIA}" opacity=".85"/>
      <line x1="150" y1="86" x2="150" y2="100" stroke="rgba(56,41,47,.3)"/>
      <line x1="188" y1="86" x2="188" y2="100" stroke="rgba(56,41,47,.3)"/>
      <rect x="248" y="112" width="27" height="22" rx="2" fill="#9aa1a8" stroke="${TINTA}"/>
      <ellipse cx="261.5" cy="112" rx="13.5" ry="4.5" fill="#c3c9ce" stroke="${TINTA}"/>
      <line x1="254" y1="118" x2="254" y2="128" stroke="rgba(246,241,231,.6)" stroke-width="2"/>
      <ellipse cx="352" cy="112" rx="19" ry="23" fill="#a9714f" stroke="${TINTA}"/>
      <circle cx="352" cy="110" r="5.5" fill="#6b4a35"/>
      <line x1="338" y1="96" x2="318" y2="34" stroke="#6b4a35" stroke-width="6"/>
      <line x1="341" y1="94" x2="322" y2="40" stroke="rgba(240,217,168,.7)" stroke-width="1"/>
      <rect x="374" width="26" height="150" fill="${TERRACOTA}" opacity=".88"/>
      <line x1="382" y1="0" x2="382" y2="150" stroke="rgba(56,41,47,.25)" stroke-width="2"/>
      <line x1="392" y1="0" x2="392" y2="150" stroke="rgba(56,41,47,.25)" stroke-width="2"/>`,

    /* azotea comunal al atardecer: tendal, mar de fondo, sillas */
    azotea: `
      <defs>
        <linearGradient id="vid-dusk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#d99a6b"/><stop offset="1" stop-color="#8d6470"/>
        </linearGradient>
      </defs>
      <rect width="400" height="150" fill="url(#vid-dusk)"/>
      <circle cx="70" cy="30" r="11" fill="#f0e3cd"/>
      <circle cx="70" cy="30" r="17" fill="rgba(240,227,205,.2)"/>
      <rect y="66" width="400" height="40" fill="#6d7f86"/>
      <line x1="40" y1="78" x2="120" y2="78" stroke="rgba(240,227,205,.35)"/>
      <line x1="230" y1="86" x2="330" y2="86" stroke="rgba(240,227,205,.3)"/>
      <line x1="140" y1="94" x2="200" y2="94" stroke="rgba(240,227,205,.25)"/>
      <rect y="104" width="400" height="10" fill="#9c8a74"/>
      <rect y="114" width="400" height="36" fill="#b09a80"/>
      <rect x="70" y="72" width="4" height="42" fill="${TINTA}"/>
      <rect x="322" y="72" width="4" height="42" fill="${TINTA}"/>
      <path d="M72 78 Q197 94 322 78" fill="none" stroke="${TINTA}" stroke-width="1.5"/>
      <path d="M104 92 h30 v20 h-9 v16 h-12 v-16 h-9 Z" fill="${TERRACOTA}" opacity=".92"/>
      <path d="M186 92 h24 v36 h-8 v-14 h-8 v14 h-8 Z" fill="#5f6f66" opacity=".92"/>
      <rect x="252" y="92" width="20" height="30" fill="${ORO}" opacity=".9"/>
      <g fill="#5f6f66">
        <rect x="136" y="112" width="26" height="6" rx="2"/>
        <rect x="138" y="96" width="6" height="18"/>
        <line x1="139" y1="118" x2="136" y2="132" stroke="#5f6f66" stroke-width="3"/>
        <line x1="159" y1="118" x2="163" y2="132" stroke="#5f6f66" stroke-width="3"/>
        <rect x="176" y="112" width="26" height="6" rx="2"/>
        <rect x="196" y="96" width="6" height="18"/>
        <line x1="179" y1="118" x2="176" y2="132" stroke="#5f6f66" stroke-width="3"/>
        <line x1="199" y1="118" x2="203" y2="132" stroke="#5f6f66" stroke-width="3"/>
      </g>
      <rect x="352" y="38" width="3" height="66" fill="${TINTA}"/>
      <line x1="353.5" y1="46" x2="338" y2="62" stroke="${TINTA}" stroke-width="2"/>
      <line x1="353.5" y1="46" x2="369" y2="62" stroke="${TINTA}" stroke-width="2"/>
      <path d="M150 40 q5 -6 10 0 M166 46 q4 -5 8 0" fill="none" stroke="${TINTA}" stroke-width="1.5" opacity=".6"/>`,

    /* escaleras del cerro subiendo entre neblina */
    escaleras: `
      <rect width="400" height="150" fill="#ded4c2"/>
      <path d="M180 150 L400 150 L400 30 Q300 40 260 80 Q228 112 202 150 Z" fill="${TIERRA}"/>
      ${casa(298, 62)}${casa(338, 46, .9)}${casa(368, 72, .8)}
      <path d="M24 148 L24 132 L66 132 L66 118 L108 118 L108 104 L150 104 L150 90 L192 90 L192 76 L234 76 L234 62 L276 62 L276 48 L318 48 L318 34 L360 34 L360 148 Z"
        fill="${CAMINO}" stroke="${TINTA}" stroke-width="1.5"/>
      <path d="M24 126 L360 28" fill="none" stroke="#6b4a35" stroke-width="3"/>
      ${[24, 108, 192, 276, 360].map((x, i) => {
        const y = 126 - (i * 24.5);
        return `<line x1="${x}" y1="${y.toFixed(0)}" x2="${x}" y2="${(y + 22).toFixed(0)}" stroke="#6b4a35" stroke-width="3"/>`;
      }).join("")}
      <circle cx="176" cy="82" r="5" fill="${TINTA}"/>
      <rect x="171" y="87" width="10" height="15" rx="4" fill="${TERRACOTA}"/>
      <rect y="98" width="400" height="18" fill="rgba(222,212,194,.55)"/>
      ${garua()}`,

    /* obra abandonada donde ensayan cumbia: andamios y ladrillos */
    obra: `
      <rect width="400" height="150" fill="${CIELO}"/>
      <rect y="118" width="400" height="32" fill="#a08a6d"/>
      ${[70, 150, 230].map((x) => `<rect x="${x}" y="24" width="5" height="94" fill="#7a5b43"/>`).join("")}
      ${[40, 70, 100].map((y) => `<rect x="70" y="${y}" width="160" height="4" fill="#7a5b43"/>`).join("")}
      <line x1="75" y1="44" x2="225" y2="98" stroke="#7a5b43" stroke-width="4"/>
      <rect x="70" y="100" width="160" height="6" fill="#b09368"/>
      ${[0, 1, 2].map((f) => `
        ${[0, 1, 2, 3, 4].map((i) => `<rect x="${270 + i * 25}" y="${109 - f * 11}" width="22" height="9" fill="#b3703f" stroke="rgba(56,41,47,.25)"/>`).join("")}
        ${f === 2 ? "" : [0, 1, 2, 3].map((i) => `<rect x="${282 + i * 25}" y="${100 - f * 11}" width="22" height="9" fill="#a5653a" stroke="rgba(56,41,47,.25)"/>`).join("")}
      `).join("")}
      <path d="M246 106 L268 106 L264 130 L250 130 Z" fill="#9aa1a8" stroke="${TINTA}"/>
      <line x1="222" y1="96" x2="222" y2="130" stroke="#6b4a35" stroke-width="3"/>
      <path d="M216 130 q6 10 12 0 Z" fill="#6b4a35"/>
      <rect x="40" y="98" width="36" height="22" rx="3" fill="#d8cdb4" stroke="${TINTA}"/>
      <line x1="40" y1="105" x2="76" y2="105" stroke="rgba(56,41,47,.3)"/>
      <path d="M46 98 a12 9 0 0 1 24 0 Z" fill="#e8b64c" stroke="${TINTA}"/>`,

    /* pasillo del hospital María Auxiliadora, camilla y monitor */
    hospital: `
      <rect width="400" height="150" fill="#e6dcc8"/>
      <polygon points="0,0 400,0 250,44 150,44" fill="#e6dcc8"/>
      <polygon points="0,150 400,150 250,108 150,108" fill="#cfc3ad"/>
      <polygon points="0,0 150,44 150,108 0,150" fill="#d3c7b1"/>
      <polygon points="400,0 250,44 250,108 400,150" fill="#ddd1bb"/>
      <rect x="150" y="44" width="100" height="64" fill="#d8ccb6"/>
      ${[[185, 10, 30, 5], [189, 24, 22, 4], [193, 34, 14, 3]].map(([x, y, w, h]) =>
        `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f5efd8"/>`).join("")}
      <polygon points="36,62 82,76 82,124 36,102" fill="#b99f83" stroke="${TINTA}"/>
      <polygon points="364,62 318,76 318,124 364,102" fill="#b99f83" stroke="${TINTA}"/>
      <rect x="190" y="50" width="20" height="20" rx="2" fill="#fdfaf2" stroke="${TINTA}"/>
      <rect x="197.5" y="53" width="5" height="14" fill="#c0463e"/>
      <rect x="190.5" y="57.5" width="19" height="5" fill="#c0463e"/>
      <polygon points="163,94 237,94 249,103 151,103" fill="#f2ecdd" stroke="${TINTA}"/>
      <polygon points="167,90 199,90 203,94 163,94" fill="#fdfaf2"/>
      <rect x="160" y="103" width="5" height="14" fill="${TINTA}"/>
      <rect x="235" y="103" width="5" height="14" fill="${TINTA}"/>
      <circle cx="158" cy="121" r="4" fill="${TINTA}"/><circle cx="242" cy="121" r="4" fill="${TINTA}"/>
      <line x1="304" y1="70" x2="304" y2="132" stroke="${TINTA}" stroke-width="3"/>
      <rect x="282" y="44" width="56" height="36" rx="3" fill="#10202a" stroke="${TINTA}"/>
      <polyline points="286,62 296,62 300,53 306,68 312,62 334,62" fill="none" stroke="#7fb08a" stroke-width="1.8"/>
      <rect x="296" y="132" width="18" height="4" fill="${TINTA}"/>`,

    /* quirófano: lámpara de techo, campo verde, instrumental */
    quirofano: `
      <rect width="400" height="150" fill="#dfe4dc"/>
      ${[30, 60, 90, 120, 150].map((y) => `<line x1="0" y1="${y}" x2="400" y2="${y}" stroke="rgba(56,41,47,.07)"/>`).join("")}
      ${[40, 80, 120, 160, 200, 240, 280, 320, 360].map((x) => `<line x1="${x}" y1="0" x2="${x}" y2="150" stroke="rgba(56,41,47,.07)"/>`).join("")}
      <circle cx="152" cy="46" r="40" fill="rgba(245,239,216,.28)"/>
      <line x1="200" y1="0" x2="200" y2="18" stroke="${TINTA}" stroke-width="3"/>
      <line x1="200" y1="18" x2="162" y2="34" stroke="${TINTA}" stroke-width="3"/>
      <circle cx="152" cy="46" r="25" fill="#f5efd8" stroke="${TINTA}" stroke-width="2"/>
      <circle cx="152" cy="46" r="15" fill="#fdfaf2" stroke="${TINTA}"/>
      <circle cx="152" cy="46" r="6" fill="#f2cf7c" stroke="${TINTA}"/>
      <path d="M115 108 Q205 64 295 108 Z" fill="#7fa08c" stroke="${TINTA}"/>
      <rect x="120" y="106" width="170" height="10" rx="4" fill="#cfd4d9" stroke="${TINTA}"/>
      <rect x="196" y="116" width="16" height="18" fill="${TINTA}"/>
      <rect x="176" y="134" width="56" height="6" fill="${TINTA}"/>
      <rect x="44" y="100" width="44" height="6" rx="2" fill="#cfd4d9" stroke="${TINTA}"/>
      <rect x="48" y="106" width="4" height="24" fill="${TINTA}"/><rect x="80" y="106" width="4" height="24" fill="${TINTA}"/>
      ${[52, 62, 72].map((x) => `<line x1="${x}" y1="97" x2="${x + 10}" y2="93" stroke="${TINTA}" stroke-width="2"/>`).join("")}
      <rect x="330" y="38" width="56" height="38" rx="3" fill="#10202a" stroke="${TINTA}"/>
      <polyline points="334,58 344,58 348,49 354,64 360,58 382,58" fill="none" stroke="#7fb08a" stroke-width="1.8"/>
      <line x1="358" y1="76" x2="358" y2="120" stroke="${TINTA}" stroke-width="3"/>`,

    /* parto en el cuarto: velas, tinaja de vapor, noche afuera */
    partoCasa: `
      <defs>
        <linearGradient id="vid-noche" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#4b3a3c"/><stop offset="1" stop-color="#33262a"/>
        </linearGradient>
      </defs>
      <rect width="400" height="150" fill="url(#vid-noche)"/>
      <rect y="118" width="400" height="32" fill="#2e2225"/>
      <rect x="36" y="28" width="34" height="50" fill="#2c3550" stroke="#1e2536" stroke-width="2"/>
      <circle cx="53" cy="42" r="6" fill="#e8dfc8"/>
      ${[44, 52].map((y) => `<line x1="36" y1="${y}" x2="70" y2="${y}" stroke="#1e2536" stroke-width="2"/>`).join("")}
      <rect x="110" y="98" width="204" height="26" fill="#5c4038"/>
      <rect x="104" y="90" width="216" height="12" rx="4" fill="#8a6a58"/>
      <rect x="112" y="84" width="34" height="9" rx="4" fill="#cbb9a4"/>
      <rect x="150" y="90" width="168" height="12" fill="#7d5a4c"/>
      <line x1="190" y1="90" x2="190" y2="102" stroke="rgba(46,34,37,.4)"/>
      <line x1="240" y1="90" x2="240" y2="102" stroke="rgba(46,34,37,.4)"/>
      <ellipse cx="90" cy="127" rx="19" ry="5.5" fill="#6b5a58" stroke="#1e2536"/>
      <path d="M84 118 q6 -8 0 -14 M96 116 q5 -7 0 -12" fill="none" stroke="rgba(240,227,205,.3)" stroke-width="2"/>
      <rect x="322" y="102" width="58" height="5" fill="#5c4038"/>
      ${[326, 374].map((x) => `<rect x="${x}" y="107" width="4" height="14" fill="#5c4038"/>`).join("")}
      ${[334, 350, 366].map((x) => `
        <circle cx="${x}" cy="86" r="11" fill="rgba(242,207,124,.16)"/>
        <rect x="${x - 2.5}" y="88" width="5" height="14" fill="#d8cdb4"/>
        <path d="M${x} 76 q4 6 0 10 q-4 -4 0 -10" fill="#f2cf7c"/>
      `).join("")}`,

    /* dentro: el saco, la luz que llega desde arriba */
    utero: `
      <defs>
        <radialGradient id="vid-utero" cx=".5" cy=".42" r=".75">
          <stop offset="0" stop-color="#7a4f5e"/><stop offset=".6" stop-color="#4a3240"/>
          <stop offset="1" stop-color="#2e1f27"/>
        </radialGradient>
      </defs>
      <rect width="400" height="150" fill="url(#vid-utero)"/>
      <polygon points="168,0 232,0 264,150 136,150" fill="rgba(255,226,200,.06)"/>
      ${[[52,30],[344,26],[70,116],[330,112],[120,22],[286,34],[40,74],[362,80]].map(([x, y]) =>
        `<circle cx="${x}" cy="${y}" r="${2 + (x % 3)}" fill="rgba(233,196,178,.2)"/>`).join("")}
      <circle cx="200" cy="82" r="57" fill="rgba(233,196,178,.1)" stroke="rgba(233,196,178,.4)" stroke-width="1.5"/>
      <circle cx="183" cy="66" r="13" fill="#e9c4b2"/>
      <path d="M187 76 Q166 94 184 108 Q206 119 223 103 Q232 92 220 85 Q205 77 195 84 Q190 87 191 92"
        fill="#e9c4b2"/>
      <circle cx="178" cy="64" r="1.6" fill="#6b4551"/>
      <path d="M190 60 q3 3 0 6" fill="none" stroke="#d9a58f" stroke-width="1.4"/>
      <path d="M216 96 Q238 110 230 126 Q224 137 209 133" fill="none" stroke="#d9a58f" stroke-width="3"/>
      <path d="M209 133 q-6 6 -12 2" fill="none" stroke="#d9a58f" stroke-width="2"/>`,

    /* el barrio visto de lejos: cerro, escalinata y ventanas prendidas */
    cerro: `
      <rect width="400" height="150" fill="${CIELO}"/>
      <path d="M60 28 q5 -6 10 0 M76 34 q4 -5 8 0" fill="none" stroke="${TINTA}" stroke-width="1.5" opacity=".55"/>
      <rect x="30" y="42" width="3" height="42" fill="${TINTA}"/>
      <line x1="18" y1="48" x2="45" y2="48" stroke="${TINTA}" stroke-width="2"/>
      <path d="M31 48 Q200 62 400 40" fill="none" stroke="${TINTA}" opacity=".25"/>
      <path d="M0 84 Q100 56 200 74 T400 68 L400 150 L0 150 Z" fill="${CAMINO}"/>
      <path d="M0 104 Q120 84 240 98 T400 94 L400 150 L0 150 Z" fill="${TIERRA}"/>
      <path d="M0 126 Q140 112 280 122 T400 118 L400 150 L0 150 Z" fill="${TIERRA_OSC}"/>
      <path d="M200 148 L214 132 L198 118 L212 102 L196 90 L210 78" fill="none" stroke="#e6d9bd" stroke-width="5" opacity=".85"/>
      ${casa(60, 74)}${casa(98, 66, .85)}${casa(142, 80, .9)}${casa(252, 86)}
      ${casa(300, 78, .9)}${casa(332, 90, .8)}${casa(362, 68)}
      ${casa(84, 108, 1.1, "#7d6450")}${casa(268, 112, 1.05, "#7d6450")}
      ${garua()}`
  };

  /* ── deducir la escena del nodo ──────────────────────────── */

  function clavePara(nodo, estado) {
    const bruto = `${nodo.id || ""} ${nodo.lugar || ""} ${nodo.titulo || ""}`;
    const n = bruto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // el grito depende de dónde decidieron tenerlo
    if (/parto-grito/.test(n)) {
      return estado && estado.flags["ruta-casa"] ? "partoCasa" : "quirofano";
    }
    if (/parto-casa/.test(n)) return "partoCasa";
    if (/utero|trompa|dentro de /.test(n)) return "utero";
    if (/perdida/.test(n)) return "hospital";
    if (/quirofano|cesarea/.test(n)) return "quirofano";
    if (/ecografia|consultorio|laboratorio|control|presentacion/.test(n)) return "clinica";
    if (/sala de partos|dilatacion|emergencia|hospital|auxiliadora|ultima frontera|recta final/.test(n)) return "hospital";
    if (/combi de la linea|en movimiento|dentro de la combi/.test(n)) return "combi";
    if (/paradero|calle|av\.|heroes|ladera|esquina|parque/.test(n)) return "calle";
    if (/bano|ducha|inodoro/.test(n)) return "bano";
    if (/posta/.test(n)) return "posta";
    if (/azotea/.test(n)) return "azotea";
    if (/comunal|curso|clase/.test(n)) return "posta";
    if (/obra|andamio|ladrillo/.test(n)) return "obra";
    if (/escalera/.test(n)) return "escaleras";
    if (/cuarto|casa|habitacion|pieza|velas|triplay/.test(n)) return "cuarto";
    return "cerro";
  }

  /* ── API ─────────────────────────────────────────────────── */

  function pintar(cont, nodo, estado) {
    if (!cont || !nodo) return;
    const clave = clavePara(nodo, estado);
    cont.innerHTML =
      `<svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">
         <rect width="400" height="150" fill="${CIELO}"/>${ESCENAS[clave] || ESCENAS.cerro}
       </svg>`;
    cont.dataset.escena = clave;
  }

  VIDA.escenas = { pintar, clavePara };
})();
