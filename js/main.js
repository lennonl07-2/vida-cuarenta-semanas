/* ════════════════════════════════════════════════════════════
   VIDA · arranque
   ════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  window.addEventListener("DOMContentLoaded", () => {
    const VIDA = window.VIDA;

    // comprobación silenciosa del grafo: si hay enlaces rotos se
    // avisa en consola para poder arreglarlos sin romper la partida.
    const rotos = [];
    VIDA.motor.capitulosOrden.forEach((cap) => {
      if (cap.sig && !VIDA.motor.nodos[cap.sig]) {
        rotos.push(`${cap.id} → ${cap.sig} (sig inexistente)`);
      }
      (cap.opciones || []).forEach((op) => {
        if (op.sig && !VIDA.motor.nodos[op.sig]) {
          rotos.push(`${cap.id} → ${op.sig} (opción)`);
        }
      });
    });
    if (rotos.length) {
      console.warn("[VIDA] enlaces revisar:", rotos);
    }
    console.info(`[VIDA] ${VIDA.motor.capitulosOrden.length} capítulos cargados.`);
  });
})();
