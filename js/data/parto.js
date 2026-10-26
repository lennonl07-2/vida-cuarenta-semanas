/* ════════════════════════════════════════════════════════════
   VIDA · parto, finales y pérdidas
   La madrugada definitiva y todas las maneras de terminar.
   ════════════════════════════════════════════════════════════ */
(function () {
  const V = window.VIDA.motor;

  /* ── catálogo de finales ────────────────────────────────── */

  window.VIDA.finales = {
    F1: {
      titulo: "El primer grito",
      texto: [
        "Nace a las 4:52 de la madrugada, entero y puntual como quien llega a cita importante. El primer grito es tan fuerte que se oye desde la sala de espera: un sonido agudo, indignado, magnífico — el anuncio oficial de que los pulmones entrenados durante meses funcionan a la primera.",
        "{papa} corta el cordón con las manos temblando y una cara que no sabe si reír o llorar y decide hacer ambas. Lo ponen sobre el pecho de {mama} y deja de llorar de golpe, escuchando el corazón ajeno como tantas veces lo escuchó desde adentro.",
        "Apgar nueve. Peso perfecto. Todo el trabajo de cuarenta semanas —cada lenteja, cada caminata, cada decisión tomada bien cuando fue difícil tomarla bien— está aquí, envuelto en una manta amarilla, bostezando por primera vez."
      ]
    },
    F2: {
      titulo: "Una llegada apurada",
      texto: [
        "Nace antes de tiempo pero después del susto: unas semanas menos, unos gramos de menos, ictericia leve que los médicos tratan con luz azulada y calma profesional.",
        "Pasan cuatro días bajo la lamparita azul, con los ojos vendados como boxeador diminuto, mientras su bilirrubina discute con la luz y pierde. {mama} va cada tres horas a darle pecho, aprendiendo el hospital como segunda casa.",
        "El alta llega el quinto día con instrucciones largas y un bebé que ya pesa lo suficiente para que el gorro se le caiga. No fue el parto soñado. Fue el parto real, y terminó bien: hay familias enteras construidas con menos."
      ]
    },
    F3: {
      titulo: "La espera más larga",
      texto: [
        "Nace peleando. La UCIN lo recibe con incubadora térmica, sondas finas, monitores que pitan en idioma técnico. Está vivo, estable, pequeño: un guerrero de dos kilos y medio con tubos donde deberían estar solo besos.",
        "Doce días de visitas programadas. {mama} extrae leche con bomba manual cada tres horas, noche incluida, etiquetando bolsitas con fecha y hora como farmacéutica rigurosa. {papa} aprende a lavarse las manos hasta el codo y a leer números de monitores.",
        "El día doce, la incubadora se abre por última vez y todo ese aparataje queda atrás. Lo visten con la ropa traída de casa —le queda grande— y sale al mundo común con una cicatriz invisible de prematuro y una historia que contará mal y le encantará contar."
      ]
    },
    F4: {
      titulo: "La batalla desde el minuto uno",
      texto: [
        "Nace con el cuerpo protestando cada decisión que se postergó demasiado. Los primeros minutos son de equipo médico alrededor: oxígeno, estimulación, prisa experta. Después, UCIN larga: tres semanas de batalla campal entre lo pequeño y lo difícil.",
        "Hay días buenos y días de terror. Una neumonía neonatal que cede con antibióticos. Un peso que baja antes de subir. Las paredes del hospital aprenden los pasos cansados de una pareja que duerme en bancas y come galletas de máquina.",
        "Y aun así: sale. Sale con retraso motor leve que la terapia temprana trabajará, con controles mensuales hasta los dos años, con una familia que salió de esta guerra sabiéndose invencible. No todos los finales limpios son felices; este es sucio y feliz a la vez."
      ]
    },
    F5: {
      titulo: "Dos corazones en vilo",
      texto: [
        "El monitor marca lo que nadie quiere escuchar y la sala se convierte en otra cosa: pasillo rápido, quirófano frío, luces grandes, voces calmadas dando órdenes exactas.",
        "La cesárea dura veinte minutos que duran un invierno. {papa} ve nacer a través de un campo quirúrgico azul y no entiende nada hasta que oye el llanto —fuerte, airado, perfecto— y el mundo vuelve a tener piso.",
        "Ella lo conoce despierta ya, en recuperación, con el cuerpo cosido y los ojos húmedos. «Vale la pena todo», dice, y la frase incluye la cicatriz, el susto, las cuarenta semanas completas. El bebé, entretanto, descubre el pecho materno como quien llega a puerto tras tormenta."
      ]
    },
    F6: {
      titulo: "Nacido en camino",
      texto: [
        "No espera ni al mototaxi ni a la puerta del hospital: decide llegar en tránsito, en la madrugada, entre las manos sorprendidas de quienes lo llevaban.",
        "Nace en el pasillo de emergencias, a diez metros de la sala de partos, sostenido por una obstetra que corría hacia él y llegó justo. Grita tan fuerte que toda la emergencia aplaude —ocurre pocas veces en la vida de un servicio—.",
        "Los chequeos salen limpios: los bebés de partos rápidos suelen ser robustos, dice la literatura. Este, además, viene con anécdota de por vida incluida: «naciste en camino» será su origen familiar oficial, contado cada cumpleaños con más detalles ficticios cada año."
      ]
    },
    F7: {
      titulo: "Cielo de Pamplona",
      texto: [
        "Hay finales que no son finales sino interrupciones. Esta cartilla se detiene antes de tiempo, como se detuvieron otras cosas, y ninguna palabra escrita aquí alcanza para lo que duele.",
        "Si estás viviendo esto de verdad —tú, el que lee—: no fue tu culpa. Ni de la comida, ni del trabajo, ni de las escaleras. Las pérdidas gestacionales ocurren en uno de cada cinco embarazos conocidos, casi siempre por razones que ningún amor del mundo puede evitar. El barrio sabe acompañar: pregúntale a las comadres, a la posta, a quien haya pasado por esto. Nadie debería cargarlo solo.",
        "Esta historia guarda sus otras versiones. Hay caminos donde todo sale adelante, y están esperando ser jugados."
      ]
    }
  };

  /* ── cadena del parto ───────────────────────────────────── */

  V.registrar([

    /* hub: ¿dónde? */
    {
      id: "parto-hub", sem: 40, temp: "Parto",
      lugar: "Madrugada definitiva",
      titulo: "Puertas adentro",
      eco: [
        "Las contracciones ya no dejan hablar entre una y otra. Es momento de entrar donde toque entrar y dejar que el proceso antiguo haga lo suyo.",
        "Todo lo decidido en cuarenta semanas converge ahora en un solo lugar físico."
      ],
      opciones: [
        {
          t: "María Auxiliadora: especialistas, quirófano listo, todo por protocolo.",
          ef: {}, fl: ["ruta-hospital"],
          nota: "",
          sig: "parto-hospital"
        },
        {
          t: "La posta del cerro: gente conocida para el momento más grande.",
          req: { fl: ["destino-posta"] }, pista: "",
          ef: {}, fl: ["ruta-posta"],
          sig: "parto-posta"
        },
        {
          t: "El cuarto, con doña Carmen dirigiendo.",
          req: { fl: ["parto-en-casa"] }, pista: "",
          ef: {}, fl: ["ruta-casa"],
          sig: "parto-casa"
        }
      ],
      sig: "parto-hospital"
    },

    /* ruta hospital */
    {
      id: "parto-hospital", sem: 40, temp: "Parto",
      lugar: "Sala de dilatación · María Auxiliadora",
      titulo: "Centímetro a centímetro",
      eco: [
        "Sala de dilatación: cortina azul, banca acolchada, monitor fetal pitando tu corazón cada segundo como radioaficionado fiel. Cuatro horas de contracciones documentadas, respiraciones practicadas, y una enfermera que entra cada tanto a mirar números.",
        "Dilatación avanza. Siete centímetros. Ocho."
      ],
      alEntrar: function (estado) {
        const fragil = (estado.stats.salud || 0) < 48 ||
          (estado.flags["prematuro"] && (estado.stats.salud || 0) < 62);
        const malPuesto = estado.flags["transverso-final"] && !estado.flags["girado"];
        if (fragil || malPuesto) {
          estado.flags["riesgo-cesarea"] = true;
          return malPuesto
            ? ["La obstetra revisa la presentación y levanta la vista: el bebé sigue atravesado. Con esa posición, el parto vaginal no es negociable. La palabra quirófano entra a la sala con su uniforme verde."]
            : ["El monitor marca algo que hace cambiar la cara al personal: tus latidos bajan con cada contracción, como si el motor se ahogara. La palabra sufrimiento fetal se pronuncia bajito, pero se pronuncia."];
        }
        return [];
      },
      opciones: [
        {
          t: "Seguir el plan escrito en el papel doblado: empujar cuando digan, respirar como en el curso.",
          req: { fl: ["plan-de-parto"], sinFl: ["riesgo-cesarea"] }, pista: "",
          ef: { vinculo: 3, salud: 2 },
          nota: "El papel doblado en cuatro sale del bolso y se lee en voz alta ante el personal, que sonríe sin burlarse. Respiración de tren en las contracciones, empuje triple en los pujos. El plan funciona porque existió: los planes no predicen el futuro, lo ordenan.",
          sig: "parto-puja"
        },
        {
          t: "Confiar en el cuerpo: él sabe salir, ella sabe parir, el hospital sabe esperar.",
          sinFl: ["riesgo-cesarea"],
          ef: { salud: 1 },
          nota: "Sin guion, con instinto: millones de años de biología respaldando cada pujo. El cuerpo humano es descendiente directo de todos los que lograron nacer; confiar en él es estadística aplicada.",
          sig: "parto-puja"
        },
        {
          t: "Quirófano. Ahora.",
          req: { fl: ["riesgo-cesarea"] }, pista: "",
          ef: {},
          sig: "parto-cesarea"
        }
      ],
      sig: "parto-puja"
    },

    /* cesárea */
    {
      id: "parto-cesarea", sem: 40, temp: "Parto",
      lugar: "Quirófano · luces grandes",
      titulo: "Veinte minutos de eternidad",
      eco: [
        "Anestesia raquídea: fría primero, ausente después. La cortina azul separa el pecho del abdomen y detrás de ella trabaja un equipo en silencio profesional. {papa}, sentado junto a la cabeza de {mama} con su pijama quirúrgico grande, narra todo lo que ve aunque ella no pregunta.",
        "Tirones. Presiones. Un momento de vacío absoluto.",
        "Y entonces el llanto —el PRIMER GRITO, agudo e indignado, lleno de aire recién estrenado— rompe la quietud del quirófano como sirena de fiesta."
      ],
      opciones: [
        {
          t: "Conocerlo.",
          ef: {}, fl: ["cesarea-emergencia"],
          nota: "",
          sig: "parto-grito"
        }
      ],
      sig: "parto-grito"
    },

    /* ruta posta */
    {
      id: "parto-posta", sem: 40, temp: "Parto",
      lugar: "Sala de partos de la posta del cerro",
      titulo: "Entre gente conocida",
      eco: [
        "La sala de partos de la posta es pequeña y limpia, con la lámpara de pie que todos recuerdan de otros controles. La obstetra de guardia —la misma de las treinta y una semanas— ajusta sus lentes: «llegaste justo, mamá. Ya estámos».",
        "Contracciones, respiración, la enfermera auxiliar sosteniendo una pierna y contando en voz alta como árbitro de vida. Afuera, en la sala de espera pequeña, {papa} camina en círculos que han gastado el linóleo de generaciones.",
        "«Ya viene la cabecita. Último pujo… ¡ahí!»"
      ],
      opciones: [
        {
          t: "Terminar de nacer.",
          ef: {}, fl: [],
          sig: "parto-grito"
        }
      ],
      sig: "parto-grito"
    },

    /* ruta casa */
    {
      id: "parto-casa", sem: 40, temp: "Parto",
      lugar: "El cuarto de triplay · velas y agua hervida",
      titulo: "El oficio antiguo",
      eco: [
        "Doña Carmen dirige la operación desde 1978: agua hervida, sábanas limpias, la lámpara del techo cubierta con pañuelo para que la luz caiga amortiguada. Huele a velas, a hierbas, a cuarto conocido.",
        "Las contracciones encuentran a {mama} de rodillas sobre el colchón, apoyada en {papa}, que ha dejado de parecer persona y se ha vuelto estructura: espalda contra la que arquear, mano que apretar, voz grave diciendo «ya, ya, ya» en el oído.",
        "Doña Carmen palpa, escucha tu corazón con el estetoscopio viejo de lata, y su cara cambia apenas. Cambió apenas. Pero {papa} la vio."
      ],
      alEntrar: function (estado) {
        if ((estado.stats.salud || 0) < 45 || estado.flags["anemia"] || estado.flags["prematuro"]) {
          estado.flags["complicacion-casa"] = true;
        }
        return [];
      },
      opciones: [
        {
          t: "Seguir: el cuerpo manda y doña Carmen sabe leerlo.",
          sinFl: ["complicacion-casa"],
          ef: { vinculo: 3, conciencia: 2 },
          nota: "El parto casero funciona como funciona desde siempre: dolor honesto, oficio ancestral, y un nacimiento limpio entre paredes que conocieron la concepción. Doña Carmen ata el cordón con hilo esterilizado y susurra el bendito milagro de costumbre.",
          sig: "parto-grito"
        },
        {
          t: "«Llévenla YA»: doña Carmen ordena transferir sin orgullo ni demora.",
          req: { fl: ["complicacion-casa"] }, pista: "",
          ef: { salud: 2 }, fl: ["parto-en-camino"],
          nota: "Setenta años de oficio enseñan lo más difícil: reconocer cuándo el oficio no basta. Mototaxi en la madrugada, {mama} entre dos brazos fuertes, doña Carmen rezando en el otro vehículo. Llegan a emergencias con el parto avanzado y el equipo médico tomando el relevo sin preguntar nada. Nacerás en tránsito o a los diez metros de la meta: el destino decide en estas cosas.",
          sig: "parto-grito"
        }
      ],
      sig: "parto-grito"
    },

    /* convergencia: el pujo final — minijuego de respiración */
    {
      id: "parto-puja", sem: 40, temp: "Parto",
      tipo: "respiracion", rondas: 3,
      lugar: "La recta final",
      titulo: "El pujo",
      consigna: "Diez centímetros. Ahora toca lo que ningún curso enseña del todo: respira cuando el círculo crece y acompaña cada contracción con tu toque. Los dos están empujando hacia el mismo afuera.",
      flExito: "respiracion-firme",
      recuerdoExito: "El último aire que compartimos antes de conocernos. Lo sentí ordenado, valiente, nuestro.",
      eco: [
        "Dilatación completa. El personal se reorganiza, las luces suben, y llega la parte final: el instinto. El cuerpo de {mama} toma el control absoluto y empuja con una fuerza que ella no sabía tener.",
        "Y tú, del otro lado de esa frontera fina como papel, también empujas. Giras, flexionas la barbilla, buscas el canal como quien busca la salida de un sueño intenso. Trabajo en equipo desde antes de conocerse las caras.",
        "Coronación. La cabecita asoma, gira sobre su eje como llave en cerradura antigua…"
      ],
      vozDesde: 0,
      voz: ["Estoy saliendo. No sé qué hay del otro lado y voy igual. Espérame un poco más, testigo: ya nos vemos las caras."],
      sig: "parto-grito"
    },

    /* ── parto-grito · ESCENA SONORA: el primer grito ───── */
    {
      id: "parto-grito", sem: 41, temp: "Parto",
      tipo: "sonoro",
      lugar: "La última frontera · segundos contados",
      titulo: "Se oye en todo el edificio",
      consigna: "(escena sonora — sube el volumen todo lo que quieras: este momento es para eso)",
      ambiente: function (estado) {
        if (estado.flags["ruta-casa"]) return [];
        if (estado.flags["ruta-posta"]) return ["posta"];
        return ["hospital"];
      },
      dialogos: function (estado) {
        const casa = estado.flags["ruta-casa"];
        const lineas = [];
        if (casa) {
          lineas.push(
            { quien: "comadre", texto: "(la voz más firme de sus setenta años) Ya viene, criatura. Con el próximo. ¡Todo, TODO!" },
            { quien: "papa", texto: "(en el oído de ella) Yo te tengo. Yo te tengo. Yo… ¿eso es? ¿Es la cabeza?" },
            { quien: "mama", texto: "(empujando, sin palabras ya, solo un sonido largo que viene del fondo de todo)" }
          );
        } else {
          lineas.push(
            { quien: "doctora", texto: "¡Ahí viene! Coronación… rotación interna… ¡perfecto! Último pujo, mamá, el último." },
            { quien: "enfermera", texto: "(contando fuerte) Uno… dos… ¡eso! ¡No se rinda ahora, que ya casi lo abraza!" },
            { quien: "papa", texto: "(desde donde lo dejen estar) La veo… ¡la cabecita! Dios mío, está llena de pelo…" },
            { quien: "mama", texto: "(el pujo final, un sonido que nace antes de las palabras)" }
          );
        }
        lineas.push({ quien: "voz", texto: "La panza ya no me alcanza. El próximo latido suena del otro lado. Nos vemos ahí, testigo: guarda mi lugar." });
        lineas.push({ quien: "narrador", texto: "Un segundo que dura toda una vida. Y entonces: el GRITO. Agudo, airado, magnífico — los pulmones reclamando su aire a pleno pulmón por primera vez. No hay sonido más nuevo en el universo." });
        return lineas;
      },
      golpes: function (estado) {
        return [{ en: estado.flags["ruta-casa"] ? 4 : 5, sfx: "llanto" }];
      },
      sig: "nacimiento-final"
    },

    /* FINAL */
    {
      id: "nacimiento-final", sem: 41, temp: "Parto",
      tipo: "final",
      lugar: "Fuera · por fin",
      titulo: "",
      eco: []
    },

    /* ── pérdidas: nodos de colapso ─────────────────────────── */

    {
      id: "perdida-t1", sem: null, temp: "Historias posibles",
      lugar: "Primer trimestre · la página que no quiso escribirse",
      titulo: "El silencio dentro",
      eco: [
        "El sangrado creció cuando nadie estaba mirando. Los dolores llegaron después, profundos, con intención. En la urgencia de la madrugada, la ecografía buscó el parpadeo gris de la luciérnaga y no lo encontró.",
        "La licenciada Huamán dijo las palabras correctas con la voz correcta: «el embarazo no continuó. No fue por nada que usted hizo o dejó de hacer. Estas cosas ocurren, casi nunca sabemos por qué, y casi nunca es culpa de nadie». Casi nunca es culpa de nadie.",
        "El cuarto de triplay quedó con la lata bajo la cama y los folletos sobre la mesa, y una pareja sentada en el borde del colchón aprendiendo que también existe esta versión de la historia."
      ],
      opciones: [
        {
          t: "Volver al último control y cuidarlo mejor esta vez.",
          accion: "retroceder",
          nota: "La historia se repliega hasta el último punto seguro. Algunas cosas quedan marcadas —siempre quedan—, pero el futuro todavía tiene páginas en blanco."
        },
        {
          t: "Dejar que esta versión termine aquí.",
          accion: "terminar-perdida",
          final: "F7",
          nota: ""
        }
      ]
    },

    {
      id: "perdida-t2", sem: null, temp: "Historias posibles",
      lugar: "Segundo trimestre · la página que no quiso escribirse",
      titulo: "El silencio dentro",
      eco: [
        "Empezó con manchas y terminó en urgencias. Veinte semanas de historias acumuladas —terremotos, patadas nuevas, música filtrada por triplay— suspendidas en una sala donde el monitor muestra una línea que ya no baila.",
        "El médico joven eligió las palabras con cuidado de cristalero. Habló de causas posibles, de estudios genéticos, de que el cuerpo a veces decide lo que ninguna voluntad puede discutir.",
        "En el cerro, doña Carmen supo sin que nadie llamara. Subió con un termo y no dijo casi nada: a veces la compañía muda es la única medicina que sirve las primeras noches."
      ],
      opciones: [
        {
          t: "Volver al último control y defenderlo mejor esta vez.",
          accion: "retroceder",
          nota: "La historia regresa al último punto seguro. Queda marca —las marcas enseñan—, pero el resto del camino aún puede escribirse distinto."
        },
        {
          t: "Cerrar esta versión aquí.",
          accion: "terminar-perdida",
          final: "F7",
          nota: ""
        }
      ]
    },

    {
      id: "perdida-t3", sem: null, temp: "Historias posibles",
      lugar: "Tercer trimestre · la página que no quiso escribirse",
      titulo: "El silencio dentro",
      eco: [
        "Después de tanto camino —terremotos, latas, escaleras, comadres— el final llegó torcido, en una madrugada donde las señales se leyeron tarde o no se quisieron leer. Cuando llegaron al hospital, la línea del monitor era horizontal desde hacía horas.",
        "No hubo forma de revertirlo. Hubo procedimientos respetuosos, papeles que firman manos temblorosas, y una habitación donde una pareja se sostuvo en silencio el tiempo suficiente para poder volver a caminar algún día.",
        "Este juego no se perdona a sí mismo fácilmente cuando llega hasta aquí. Tampoco debería. Solo recuerda, humilde: casi nunca es culpa de nadie. Y casi siempre había otra manera."
      ],
      opciones: [
        {
          t: "Volver al último control. Esta vez, escuchar cada señal.",
          accion: "retroceder",
          nota: "Última oportunidad de reescribir. Las señales que ignoraste siguen ahí, esperando ser leídas a tiempo."
        },
        {
          t: "Terminar esta versión aquí.",
          accion: "terminar-perdida",
          final: "F7",
          nota: ""
        }
      ]
    }
  ]);
})();
