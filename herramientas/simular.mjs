/* ════════════════════════════════════════════════════════════
   VIDA · simulador de partidas completas
   uso: node herramientas/simular.mjs [nº de partidas]
   juega el grafo con el motor REAL eligiendo opciones al azar
   y verifica que siempre se alcance un final sin errores.
   ════════════════════════════════════════════════════════════ */
import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const raiz = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

// shim mínimo del navegador (motor + voz no tocan DOM)
globalThis.window = { VIDA: {}, localStorage: {
  getItem: () => null, setItem: () => {}, removeItem: () => {}
}};

require(path.join(raiz, "js", "engine.js"));
require(path.join(raiz, "js", "conciencia.js"));
for (const archivo of ["prologo", "t1", "t2", "t3", "parto"]) {
  require(path.join(raiz, "js", "data", archivo + ".js"));
}

const M = globalThis.window.VIDA.motor;
const VOZ = globalThis.window.VIDA.voz;
const N_PARTIDAS = parseInt(process.argv[2] || "200", 10);
const ESTRATEGIA = process.argv[3] || "azar"; // azar | peor

const finalesVistos = {};
const fallos = [];
let partidasOK = 0;

for (let partida = 0; partida < N_PARTIDAS; partida++) {
  try {
    M.estado = M.nuevoEstado({});
    let pasos = 0;
    let resultado = null;
    let perdidasVividas = 0;

    while (pasos++ < 500) {
      const nodo = M.nodoActual();
      if (!nodo) throw new Error("nodo inexistente: " + M.estado.nodo);

      // pantalla final del juego
      if (nodo.tipo === "final") {
        const fin = M.calcularFinal();
        if (!window.VIDA.finales[fin.id]) throw new Error("final sin definición: " + fin.id);
        resultado = fin.id;
        // la carta debe generarse sin errores
        VOZ.cartaFinal(M.estado);
        VOZ.recuerdoCitable(M.estado);
        break;
      }
      if (M.estado.finalAlcanzado) {
        resultado = M.estado.finalAlcanzado.id;
        break;
      }

      const visibles = M.opcionesVisibles(nodo);
      if (visibles.length) {
        // ¿estamos parados en un nodo de pérdida?
        const enPerdida = !!M.estado.flags["en-perdida"] &&
          String(nodo.id).startsWith("perdida");

        let eleccion = 0;
        if (enPerdida) {
          // primera vez: rebobinar al checkpoint; después: aceptar F7
          perdidasVividas++;
          const iRetro = visibles.findIndex((o) => o.accion === "retroceder");
          const iFin = visibles.findIndex((o) => o.final);
          eleccion = (perdidasVividas === 1 && iRetro >= 0) ? iRetro : Math.max(iFin, 0);
          const res2 = M.elegirOpcion(eleccion);
          if (res2 && res2.irFinal) continue;
          continue;
        }

        const disponibles = visibles
          .map((op, i) => ({ op, i }))
          .filter((x) => M.disponible(x.op));
        if (disponibles.length) {
          eleccion = ESTRATEGIA === "peor"
            ? disponibles.sort((a, b) => ((a.op.ef?.salud ?? 0) - (b.op.ef?.salud ?? 0)))[0].i
            : disponibles[Math.floor(Math.random() * disponibles.length)].i;
        }

        const res = M.elegirOpcion(eleccion);
        if (res && res.irFinal) continue;

        // colapso de salud → ruta de pérdida (misma regla que la UI)
        if ((M.estado.stats.salud || 0) <= 0 && !M.estado.flags["en-perdida"]) {
          const sem = M.semana();
          const ruta = sem <= 12 ? "perdida-t1" : sem <= 27 ? "perdida-t2" : "perdida-t3";
          if (M.nodos[ruta]) {
            M.estado.flags["en-perdida"] = true;
            M.estado.nodo = ruta;
            M.guardar();
          }
        }
      } else {
        M.avanzar();
      }
    }

    if (!resultado) throw new Error("bucle infinito tras 500 pasos en " + M.estado.nodo);
    partidasOK++;
    finalesVistos[resultado] = (finalesVistos[resultado] || 0) + 1;
  } catch (e) {
    fallos.push(`partida ${partida}: ${e.message}`);
  }
}

console.log(`\nVIDA · simulación de ${N_PARTIDAS} partidas aleatorias`);
console.log(`  completadas : ${partidasOK}`);
console.log(`  fallidas    : ${fallos.length}`);
fallos.slice(0, 10).forEach((f) => console.log("   ✗ " + f));
console.log(`  finales alcanzados:`);
Object.entries(finalesVistos)
  .sort((a, b) => b[1] - a[1])
  .forEach(([id, n]) => console.log(`     ${id}: ${n} veces`));
process.exit(fallos.length ? 1 : 0);
