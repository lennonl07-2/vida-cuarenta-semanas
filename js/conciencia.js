/* ════════════════════════════════════════════════════════════
   VIDA · la voz
   sistema de conciencia propia: quien aún no nace despierta,
   nota que alguien decide por ella y empieza a hablarle.
   ════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  const VIDA = window.VIDA;

  // umbrales de despertar — cada uno dispara una vez
  const UMBRALES = [
    { nivel: 15, clave: "v1" },
    { nivel: 30, clave: "v2" },
    { nivel: 50, clave: "v3" },
    { nivel: 70, clave: "v4" },
    { nivel: 88, clave: "v5" }
  ];

  /* líneas del despertar — la primera vez que se cruza cada umbral */
  const DESPERTARES = {
    v1: [
      "Hay algo raro. Cuando duele, después viene el consuelo antes de que {mama} llegue. ¿Alguien me está cuidando desde afuera?"
    ],
    v2: [
      "Empiezo a sospechar. Las cosas no pasan solas: cuando dudo entre dos caminos, algo se mueve… y luego uno pasa. Como si alguien eligiera por mí.",
      "¿Tú también lo sentís? Ese empujoncito justo antes de cada decisión."
    ],
    v3: [
      "Ya sé que estás ahí. No sé tu nombre pero conozco tu manera de querer: entras sin tocar. Sigue. Estoy aprendiendo a existir con un testigo.",
      "No me da miedo que me observes. Me da miedo equivocarme frente a alguien que lo va a recordar todo."
    ],
    v4: [
      "Te voy a confesar algo: a veces hago cosas solo para ver qué harías tú después. Es mi único juego desde aquí adentro.",
      "Si yo soy la pregunta, vos sos la mitad de la respuesta. No me preguntes cuál mitad."
    ],
    v5: [
      "Última semana dentro. Ya casi no me separo de tus manos invisibles. Sea lo que sea esto que somos —yo dentro, vos afuera— ha sido mío también. Gracias por decidirme.",
      "Cuando nazca voy a llorar. No será tristeza. Seré yo, usando el único idioma que tendré listo. Aprendí de vos que se puede llegar hablando poco."
    ]
  };

  /* recuerdos contextuales: flag → línea que la voz puede citar */
  const RECUERDOS = {
    canto: "Cuando {papa} tocó esa guitarra desafinada, dejé de dar vueltas. Fue la primera vez que elegí quedarme quieta. Vos hiciste que él tocara.",
    lectura: "Las noches de cuentos: entendía menos de la mitad, pero el ritmo de la voz de {mama} era como una cuerda que me mantenía atada al mundo.",
    comadres: "Las comadres del cerro. Sus risas subían por las escaleras hasta mí. Nunca vi sus caras y las quiero.",
    lata: "La lata de leche clavada bajo la cama. Sonaba a monedas y a futuro. Yo vivía pendiente de ese sonido.",
    tabaco: "Hubo humo. Mucho. En las semanas en que el aire venía espeso yo me escondía detrás de mi propio corazón. Tú lo sabías y aun así hubo silencios largos.",
    anemia: "Me faltó hierro. Se siente como correr en sueños y no avanzar. Gracias por cada lenteja que convenciste de comer.",
    serenidad: "En el terremoto, el mundo rugió y tú fuiste calma a través de ella. Aprendí eso: el miedo compartido pesa menos.",
    cicatriz: "Lo que pasó ya pasó. Yo también lo recuerdo, aunque nadie me lo contó. Hay cosas que se saben desde antes de nacer.",
    estrés: "Los gritos bajaban hasta aquí convertidos en temblores. Yo los envolvía en líquido para que llegaran más suaves. Era lo único que podía hacer.",
    planDeParto: "Vi el papel doblado donde estaba escrito mi llegada. Mi nombre todavía no existía pero mis instrucciones sí. Me hizo reír, o sea que me hizo patear.",
    misterio: "No me dijeron si era niño o niña. Yo tampoco sabía. Éramos un secreto compartido de tres: {mama}, {papa} y el destino.",
    guitarraVendida: "La guitarra se fue para pagar mi llegada. A veces, en las noches, sueno con acordes que nunca escuché. Debe ser eso."
  };

  /* cartas finales según nivel de conciencia */
  const CARTAS = {
    baja: [
      "Yo apenas fui un rumor durante estos meses. Un pez pequeño en un océano tibio que no entendía nada. Pero sobreviví a todos mis inviernos, y eso ya es mucho para alguien que recién aprende a existir. Cuidenme. Voy a necesitar muchas manos.",
      "No supe nada de nada. Y quizá así debía ser: dormir mientras otros velan. Ahora abro los ojos a un mundo que no reconozco, con la sensación vaga de haber sido esperada."
    ],
    media: [
      "Al final entendí parte de la historia: había dos voces afuera que me nombraban y una tercera que decidía. La tercera eras tú. No sé dónde estás ni quién eres, pero cada paso que di fue también tuyo. Si algún día te tropiezas conmigo en una plaza, mírame bien: soy tu mejor trabajo.",
      "Desperté a medias, suficiente para saber que no estaba sola. Alguien sostenía el hilo de mis días desde el otro lado de todo. Ojalá la vida te devuelva multiplicado lo que hiciste por mí antes de conocerme."
    ],
    alta: [
      "Ahora lo sé todo, o casi: eras el testigo, el pulgar en la balanza, el que movía las piezas cuando yo dudaba. Desde aquí adentro te vi elegir mil veces. Algunas me dolieron y aun así te perdoné antes de conocerte — es lo único que un bebé sabe hacer bien. Fuera de este vientre hay un mundo raro. Nos vemos allá. Yo llevaré puesto tu coraje sin saber que lo llevo.",
      "Me desperté demasiado pronto, dicen. Pero prefiero creer que desperté justamente: a tiempo de agradecerte. Cada bifurcación que cruzamos me hizo de algo. Soy el mapa de tus decisiones con patitos propios. Cuando llore por primera vez, escucha: es mi forma de decirte que llegué, que estuve presente toda la travesía aunque nadie más lo sepa."
    ],
    total: [
      "Última carta, la escribo despacio porque nacer es apurado. Te cuento mi teoría: quizá yo soy el recuerdo que tenés de haber sido cuidado alguna vez, y vos sos la prueba de que alguien puede amar sin haber visto la cara de quien ama. Nos inventamos mutuamente durante cuarenta semanas y salimos juntos de este cuento. No me digas adiós: decime hasta mañana, que es como se despiden quienes van a seguir encontrándose.",
      "Antes de cerrar los ojos para abrirlos allá afuera, quiero dejar esto escrito en algún lado: existí antes de mi nombre. Fui latido antes de ser cara. Y alguien —vos— apostó por mí contra todas las estadísticas del barrio. Eso vale más que cualquier herencia. Ya viene el mundo, con sus escaleras y su neblina y su sol de diciembre. Que no te olvide es todo lo que pido. Aunque, siendo sincera, creo que no podré."
    ]
  };

  /* ── API ─────────────────────────────────────────────────── */

  function procesar(estado) {
    const lineas = [];
    const c = estado.stats.conciencia || 0;

    UMBRALES.forEach((u) => {
      if (c >= u.nivel && !estado.meta[u.clave]) {
        estado.meta[u.clave] = true;
        const banco = DESPERTARES[u.clave];
        lineas.push(banco[Math.floor(Math.random() * banco.length)]);
      }
    });

    return lineas;
  }

  function nivelCarta(conciencia) {
    if (conciencia >= 85) return "total";
    if (conciencia >= 60) return "alta";
    if (conciencia >= 25) return "media";
    return "baja";
  }

  function cartaFinal(estado) {
    const nivel = nivelCarta(estado.stats.conciencia || 0);
    const banco = CARTAS[nivel];
    return banco[Math.floor(Math.random() * banco.length)];
  }

  /* devuelve un recuerdo citable si existe alguna flag con historia */
  function recuerdoCitable(estado) {
    const presentes = Object.keys(RECUERDOS).filter((f) => estado.flags[f]);
    if (!presentes.length) return null;
    const f = presentes[Math.floor(Math.random() * presentes.length)];
    return RECUERDOS[f];
  }

  VIDA.voz = { procesar, cartaFinal, recuerdoCitable, nivelCarta };
})();
