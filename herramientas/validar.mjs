/* ════════════════════════════════════════════════════════════
   VIDA · validador del grafo narrativo
   uso: node herramientas/validar.mjs
   revisa: ids duplicados, enlaces rotos, flags exigidas sin
   origen, tipos desconocidos y tokens de texto.
   ════════════════════════════════════════════════════════════ */
import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const raiz = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

// shim del entorno del navegador
const capitulos = [];
globalThis.window = {
  VIDA: {
    motor: {
      registrar: (lista) => capitulos.push(...lista)
    },
    finales: null,
    util: {}
  }
};

for (const archivo of ["prologo", "t1", "t2", "t3", "parto"]) {
  require(path.join(raiz, "js", "data", archivo + ".js"));
}

globalThis.window.VIDA.finales = globalThis.window.VIDA.finales || {};

/* ── chequeos ────────────────────────────────────────────── */

const errores = [];
const avisos = [];

const nodos = new Map();
for (const cap of capitulos) {
  if (nodos.has(cap.id)) errores.push(`id duplicado: ${cap.id}`);
  nodos.set(cap.id, cap);
}

const FLAGS_OTORGADAS = new Set();
const FLAGS_EXIGIDAS = new Map(); // flag → nodo que la pide

function recorrerOpciones(nodo) {
  for (const op of nodo.opciones || []) {
    (op.fl || []).forEach((f) => FLAGS_OTORGADAS.add(f));
    if (op.nombres && op.nombres.bebe) FLAGS_OTORGADAS.add("apodo");
    // enlaces
    if (op.sig && !nodos.has(op.sig)) errores.push(`${nodo.id}: opción → "${op.sig}" no existe`);
  }
  if (nodo.sig && !nodos.has(nodo.sig)) errores.push(`${nodo.id}: sig → "${nodo.sig}" no existe`);
}

const TIPOS_VALIDOS = new Set([
  undefined, "relato", "decision", "control", "final",
  "carrera", "latido", "patadas", "eco", "voz", "maleta",
  "sonoro", "respiracion", "cancion", "quiz"
]);

for (const [id, nodo] of nodos) {
  if (!TIPOS_VALIDOS.has(nodo.tipo)) errores.push(`${id}: tipo desconocido "${nodo.tipo}"`);
  recorrerOpciones(nodo);

  (nodo.opciones || []).forEach((op) => {
    (op.req?.fl || []).forEach((f) => {
      if (!FLAGS_EXIGIDAS.has(f)) FLAGS_EXIGIDAS.set(f, id);
    });
    (op.req?.sinFl || []).forEach((f) => {
      if (!FLAGS_EXIGIDAS.has(f)) FLAGS_EXIGIDAS.set(f, id);
    });
  });

  // el motor marca algunas flags por su cuenta (en alEntrar)
  ["riesgo-cesarea", "complicacion-casa", "preeclampsia-riesgo"].forEach((f) => FLAGS_OTORGADAS.add(f));

  // texto con tokens válidos
  const textos = [
    ...(nodo.eco || []), nodo.lugar, nodo.titulo,
    ...(nodo.opciones || []).flatMap((o) => [o.t, o.nota, o.pista])
  ].filter(Boolean);
  for (const t of textos) {
    for (const m of t.matchAll(/\{(\w+)\}/g)) {
      if (!["mama", "papa", "bebe", "jugador"].includes(m[1])) {
        avisos.push(`${id}: token raro {${m[1]}}`);
      }
    }
  }
}

for (const [flag, donde] of FLAGS_EXIGIDAS) {
  if (!FLAGS_OTORGADAS.has(flag)) errores.push(`flag exigida pero nunca otorgada: "${flag}" (pedida en ${donde})`);
}

/* ── informe ─────────────────────────────────────────────── */

console.log(`\nVIDA · validación del grafo`);
console.log(`  capítulos registrados : ${capitulos.length}`);
console.log(`  minijuegos            : ${capitulos.filter(c => ["carrera","latido","patadas","eco","voz","maleta","respiracion","cancion","quiz"].includes(c.tipo)).length}`);
console.log(`  escenas sonoras       : ${capitulos.filter(c => c.tipo === "sonoro").length}`);
console.log(`  páginas de diario     : ${capitulos.filter(c => c.diario).length}`);
console.log(`  opciones totales      : ${capitulos.reduce((n, c) => n + (c.opciones?.length || 0), 0)}`);

if (avisos.length) {
  console.log(`\nAvisos (${avisos.length}):`);
  [...new Set(avisos)].forEach((a) => console.log("  ⚠ " + a));
}
if (errores.length) {
  console.log(`\nErrores (${errores.length}):`);
  [...new Set(errores)].forEach((e) => console.log("  ✗ " + e));
  process.exit(1);
}
console.log("\n  ✓ grafo íntegro: sin enlaces rotos ni flags huérfanas\n");
