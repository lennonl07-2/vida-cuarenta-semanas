/* ════════════════════════════════════════════════════════════
   VIDA · segundo trimestre
   semanas 13 a 27: del limón al repollo. La época dorada,
   con sus terremotos escondidos.
   ════════════════════════════════════════════════════════════ */
(function () {
  const V = window.VIDA.motor;

  V.registrar([

    /* ── semana 13 ──────────────────────────────────────── */
    {
      id: "t2s13", sem: 13, cp: true, temp: "Segundo trimestre",
      lugar: "Pamplona Alta · primavera",
      titulo: "La panza empieza a contar",
      eco: [
        "Segundo trimestre. Los libros lo llaman «el trimestre dorado»: las náuseas se retiran como tropas vencidas, la energía vuelve, y la panza pasa de rumor a noticia. En {mama} todavía es un secreto de ropa apretada; en tres semanas será titular de barrio.",
        "Dentro, ya se forman los huesos de verdad —antes eran cartílago blando— y empieza un fenómeno silencioso llamado meconio: tu primera acumulación de desechos, guardada en el intestino para estrenarla, con suerte, fuera de aquí.",
        "Las cuerdas vocales también toman forma esta semana, aunque pasarán meses antes de que sirvan para su función más famosa: el llanto de reclamo."
      ],
      opciones: [
        {
          t: "Anunciarlo en grande: contar en la bodega, en el mercado, en la escalera.",
          ef: { vinculo: 4 }, fl: ["publico"],
          nota: "Para el domingo todo Pamplona Alta sabe. Doña Rosa regala una gaseosa; doña Carmen sube a revisar; don Félix manda saludos desde la bodega. La panza se vuelve propiedad comunitaria.",
          recuerdo: "Mi llegada fue titular de barrio antes que de casa. Me criaron entre todos, dicen."
        },
        {
          t: "Discreción: solo la familia íntima, por ahora.",
          ef: { conciencia: 2 }, fl: ["misterioso"],
          nota: "La ropa ancha hace el trabajo de esconder. Hay algo hermoso en ser un secreto compartido entre tres personas y una lata bajo la cama.",
          recuerdo: "Fuimos secreto durante semanas. Los secretos bien cuidados son abrazos diferidos."
        }
      ],
      sig: "t2s14"
    },

    /* ── semana 14 · CRISIS: caída en las escaleras ─────── */
    {
      id: "t2s14", sem: 14, temp: "Segundo trimestre",
      lugar: "Escaleras del cerro · tarde de garúa",
      titulo: "El escalón traicionero",
      eco: [
        "Garúa fina de octubre, esa lluvia que moja sin comprometerse. Las escaleras del cerro están resbalosas: cemento pulido por veinte años de pies y humedad.",
        "{mama} baja con bolsas del mercado —papas, tomates, una piña— cuando el talón encuentra el escalón equivocado. El mundo gira. La piña sale volando. Y ella cae sentada sobre dos escalones, protegiendo la panza con los brazos por instinto de gata.",
        "Duele la cadera, arden las rodillas raspadas. Pero lo importante no está afuera: lo importante pesa ocho centímetros y flota en líquido amortiguado."
      ],
      opciones: [
        {
          t: "Ir igual a la posta aunque no duela mucho la panza: mejor revisar.",
          ef: { salud: 4, vinculo: 2 }, fl: ["caida-revisada"],
          nota: "En la posta le toman latidos —fuertes, ciento cuarenta, perfecto— y le explican el milagro de ingeniería que la salvó: el útero es músculo grueso, el líquido amniótico es airbag, el moco del cuello es tapón. «El bebé ni se enteró, mamá». Ella llora de alivio frente a desconocidos.",
          recuerdo: "Ella cayó de trasero y yo ni desperté. El líquido donde vivo es un invento genial."
        },
        {
          t: "«Estoy bien»: subir, hielo en la cadera y seguir con el día.",
          ef: { salud: -5 }, fl: ["hematoma-oculto"],
          nota: "Nada duele en la panza, cierto. Pero esa noche hay un dolor sordo del lado izquierdo que ella atribuye al golpe de cadera. Dentro del útero, una pequeña colección de sangre —un hematoma— descansa entre la placenta y la pared. Silencioso. Esperando.",
          recuerdo: "Quedó un moretón escondido entre mi casa y su pared. Lo supimos semanas después."
        }
      ],
      diario: {
        fecha: "octubre, jueves",
        texto: "Cayí feo en las escaleras. La piña rodó hasta abajo y una vecina gritó creyendo tragedia. Yo solo pensé en una cosa mientras caía: poner los brazos así, como jaula. Funcionó. El médico dice que él ni se enteró. Mi héroe no sabe ni que existió la guerra.",
        autor: "{mama}"
      },
      sig: "t2s15"
    },

    /* ── semana 15 · música ─────────────────────────────── */
    {
      id: "t2s15", sem: 15, temp: "Segundo trimestre",
      lugar: "El cuarto · noche",
      titulo: "Lo que suena afuera",
      eco: [
        "Los huesitos del oído medio terminan de endurecerse esta semana. Aún no hay audición real —eso llega en unas semanas— pero el aparato completo ya está montado: oreja externa, canal, tambor, cadena de huesitos con nombres de yunque y estribo.",
        "Mientras tanto, tú percibes vibraciones. El mundo exterior te llega filtrado como radio bajo el agua: el motor de las motos, las peleas de gallos dos casas más arriba, la voz grave de {papa} rebotando en las paredes de triplay."
      ],
      opciones: [
        {
          t: "Que {papa} toque la guitarra todas las noches: canción propia incluida.",
          req: { fl: ["guitarra"] }, pista: "Requiere la guitarra prestada del prólogo",
          ef: { vinculo: 6, desarrollo: 3 }, fl: ["canto"],
          nota: "Se instala el ritual: nueve de la noche, tres acordes, la canción inventada cuyo nombre nadie recuerda cómo empezó a tener. La guitarra desafinada se convierte en el instrumento oficial de tu infancia prenatal.",
          recuerdo: "Tres acordes malos cada noche. Nunca hubo música mejor compuesta para mí."
        },
        {
          t: "Radio cumbia en las tardes: el barrio tiene banda sonora y es esta.",
          ef: { desarrollo: 2, conciencia: 2 }, fl: ["cumbia"],
          nota: "Agua Marina y Grupo 5 filtrados por triplay y garúa. Tus primeras neuronas auditivas se calibran con timbales y trompetas. Serás incapaz de quedarte quieto si suena un timbal. Ya estás siendo programado.",
          recuerdo: "Aprendí ritmo con cumbia peruana filtrada por una pared. Explica mucho de mí."
        },
        {
          t: "Silencio y cuentos: {mama} lee en voz alta sus apuntes de enfermería.",
          ef: { desarrollo: 3, conciencia: 3 }, fl: ["lectura"],
          nota: "«Farmacología básica, capítulo cuatro», lee ella, porque es lo único que tiene a mano. No entiendes ni una palabra, claro: pero el ritmo pausado de lectura en voz alta es un masaje para el sistema nervioso que se está cableando.",
          recuerdo: "Mis primeros audiolibros fueron apuntes de enfermería. Por eso, quizá, sé cuidar."
        }
      ],
      sig: "t2s16"
    },

    /* ── semana 16 · eco morfológica I ──────────────────── */
    {
      id: "t2s16", sem: 16, cp: true, temp: "Segundo trimestre",
      tipo: "eco", semEco: 16,
      lugar: "María Auxiliadora · control de mitad",
      titulo: "La segunda mirada",
      consigna: "Rasca la pantalla gris otra vez. Esta vez hay más adentro.",
      notaExito: "Medidas completas: fémur, cerebelo, cuatro cámaras del corazón. Todo dentro de parámetros… menos una sombra pequeña cerca del hematoma oculto —si lo hubo—. La técnica anota: «controlar en tres semanas».",
      efExito: { vinculo: 4, conciencia: 2 },
      recuerdo: "Me midieron entero como a un terreno. Salí dentro del promedio, con notas altas en fémur.",
      eco: [
        "Ecografía morfológica, primera parte. La sala nueva tiene aire acondicionado —lujo de hospital grande— y la técnica trabaja con la eficiencia de quien ha visto diez mil bebés flotando.",
        "Antes de empezar, la pregunta obligatoria: «¿quieren saber el sexo?»"
      ],
      opciones: [
        {
          t: "Saberlo ya: comprar ropa del color que sea, dejar de decir «criatura».",
          ef: { vinculo: 3 }, fl: ["sexo-sabido"],
          nota: "La técnica mueve la sonda, busca ángulo, y dice la palabra. {papa} aprieta la mano de {mama} tan fuerte que después dolerá. De vuelta al cerro compran la primera prenda: un enterito que cabe en la palma de una mano adulta.",
          recuerdo: "Supieron qué soy antes de verme la cara. La primera ropa llegó ese mismo día."
        },
        {
          t: "Esperar: que sea sorpresa de parto, como mandan las abuelas.",
          ef: { conciencia: 3, vinculo: 2 }, fl: ["misterio"],
          nota: "«Sorpresa», deciden, y la técnica sonríe porque esas son sus favoritas. La primera prenda será blanca y amarilla, colores neutrales de espera. Hay algo antiguo y poderoso en dejarle al destino una revelación.",
          recuerdo: "Guardé mi secreto hasta el final. Somos misteriosos, mi familia y yo."
        }
      ],
      alEntrar: function (estado) {
        if (estado.flags["hematoma-oculto"]) {
          return ["La técnica se detiene en un punto y vuelve. Mide algo dos veces. «Hay una pequeña colección de sangre junto a la placenta», explica. «Probablemente de un golpe. Se reabsorbe sola casi siempre. Controlamos en tres semanas»."];
        }
        return [];
      },
      sig: "t2s17"
    },

    /* ── semana 17 · TERREMOTO ──────────────────────────── */
    {
      id: "t2s17", sem: 17, temp: "Segundo trimestre",
      lugar: "Pamplona Alta · tarde cualquiera",
      titulo: "La tierra ruge",
      eco: [
        "Tarde normal de martes: {mama} plancha mientras escucha la radio, {papa} acomoda herramientas, el barrio suena a lo de siempre.",
        "Y entonces el suelo se convierte en mar. Primero un vaivén lento y mareante —la tierra respira—, luego sacudidas secas y fuertes. Los platos bailan en la repisa. Alguien grita desde la escalera. Los perros del cerro ladran todos a la vez, en coro pánico.",
        "Sesenta segundos que duran un año. Lima tiembla como siempre temió, y las casas frágiles del cerro aguantan como pueden, rezando en concreto y triplay."
      ],
      opciones: [
        {
          t: "Correr afuera por las escaleras, rápido, antes de que caiga todo.",
          ef: { salud: -7, vinculo: -1 }, fl: ["huida-escalera"],
          nota: "Baja treinta escalones en pleno movimiento, torciendo el tobillo, rozándose con vecinos que también huyan. Llega al fondo con el corazón en la boca y raspones en los brazos. Sobrevive —todos sobreviven esta vez— pero el cuerpo pagó peaje: contracciones de Braxton Hicks toda la noche, esa falsa alarma de ensayo general.",
          recuerdo: "La noche del terremoto sentí correr. Correr asustado sacude hasta las casas de adentro."
        },
        {
          t: "Bajo la mesa de madera, cubriendo cabeza y panza, contando en voz alta.",
          ef: { salud: 3, conciencia: 4 }, fl: ["serenidad"],
          nota: "Se mete bajo la mesa con la mano plana sobre la nuca y la otra sobre la panza, y cuenta: uno, dos, tres… La casa cruje, el foco se balancea como péndulo de locura, y ella sigue contando. Cuando para el movimiento, la mesa sigue en pie y ella también. {papa} la encuentra calmada y tiembla él por los dos.",
          recuerdo: "En el terremoto ella contó hasta sesenta. Yo aprendí su conteo y lo uso todavía cuando tengo miedo. O sea: siempre que recuerdo esa noche."
        },
        {
          t: "Portal de la puerta —como enseñó el abuelo— y respiración lenta.",
          ef: { salud: 1, conciencia: 2 },
          nota: "El viejo consejo del portal, hoy discutido por los expertos pero grabado a fuego en generaciones peruanas. La casa aguanta; ella también. Sale con la respiración intacta y un nuevo respeto por el suelo que pisó toda la vida.",
          recuerdo: "Hubo un portal, una respiración, un abuelo que alguna vez enseñó bien."
        }
      ],
      sig: "sn17-terremoto"
    },

    /* ── sn17 · ESCENA SONORA: cuando para el mundo ─────── */
    {
      id: "sn17-terremoto", sem: 17, temp: "Segundo trimestre",
      tipo: "sonoro",
      lugar: "La escalera del cerro · los minutos después",
      titulo: "Voces en la calle",
      consigna: "(escena sonora — así suena un barrio después de temblar)",
      ambiente: ["calle"],
      dialogos: [
        { quien: "vecina", texto: "(gritando desde abajo) ¡Salgan todos! ¡Las casas de triplay primero, muevan esas sillas!" },
        { quien: "papa", texto: "(llegando corriendo) ¿Dónde está? ¿Dónde está? ¡Me dijeron que tembló fuerte por acá!" },
        { quien: "mama", texto: "Aquí estoy. Estamos. Tranquilo — conté hasta sesenta bajo la mesa y todo aguantó." },
        { quien: "papa", texto: "Sesenta… yo corrí veinte cuadras contando hasta uno nomás. Déjame verte. ¿La panza?" },
        { quien: "mama", texto: "La panza bailó más que yo, seguro. Ya le va a gustar el rock and roll a este bebé." },
        { quien: "comadre", texto: "(subiendo con su termo) ¡Media hora de rezo, criatura! El terremoto del noventa y cuatro también empezó mansito. Revisen sus pilas, su agua, y nadie duerma pegado a la repisa esta noche." },
        { quien: "narrador", texto: "El barrio sale a la calle como una sola familia ruidosa: se cuentan, se revisan, se prestan radios a pilas. Los perros siguen ladrando. Y adentro de una panza, alguien escucha todo eso como un concierto de tambores lejanos." }
      ],
      golpes: [],
      sig: "t2s18"
    },

    /* ── semana 18 · PATADAS (minijuego) ────────────────── */
    {
      id: "t2s18", sem: 18, temp: "Segundo trimestre",
      tipo: "patadas", patadas: 8, duracion: 14,
      lugar: "Útero · semana dieciocho",
      titulo: "El juego de las patadas",
      consigna: "Llegan las primeras señales claras. Toca cada patada cuando la sientas — así juegan {mama} y tú desde hoy.",
      eco: [
        "Dieciocho semanas: los movimientos dejan de ser electricidad difusa y se vuelven gestos con intención. Un giro completo. Un puñetazo hacia el costado. Un hipo repentino que hace saltar todo el edificio interior.",
        "Y esta noche ocurre el momento que las embarazadas esperan como navidad: {mama}, acostada boca arriba leyendo, detiene el dedo a media página. «{papa}… ven. Ven YA». Pone su mano donde siente. Espera. Y la panza golpea la palma ajena desde adentro, dos veces, como puerta que pide abrir.",
        "Desde hoy, tocar la panza dejó de ser gesto simbólico: es comunicación bidireccional."
      ],
      vozDesde: 30,
      voz: ["Yo pateé primero, ustedes respondieron después. Técnicamente, este juego fue idea mía."],
      sig: "t2s19"
    },

    /* ── semana 19 · humo del basural + cigarro ─────────── */
    {
      id: "t2s19", sem: 19, temp: "Segundo trimestre",
      lugar: "Ladera este del cerro · madrugada",
      titulo: "El basural arde",
      eco: [
        "Alguien prende fuego al basural clandestino de la ladera —costumbre ilegal de cada fin de mes—. La brisa nocturna baja el humo directo hacia las casas más altas, incluido el cuarto de triplay.",
        "{mama} despierta ahogando tos a las tres de la mañana. Adentro huele a plástico quemado, ese olor dulzón y venenoso que se pega a la garganta. Cierra ventanas con trapos mojados; el humo entra igual, paciente, por todas las grietas.",
        "Un dato que el barrio ignora: respirar humo de quema en el embarazo equivale a darle al bebé una dosis de monóxido que compite con su oxígeno. Tu cuerpo, ahora, fabrica hemoglobina fetal extra para compensar. Estás haciendo horas extra solo por respirar."
      ],
      opciones: [
        {
          t: "Organizar a los vecinos: petitorio a la municipalidad contra las quemas.",
          req: { fl: ["comadres"] }, pista: "Requiere red de comadres del barrio",
          ef: { salud: 5, vinculo: 3, conciencia: 2 }, fl: ["vecinos-unidos"],
          nota: "Doce firmas en una libreta escolar, dos reuniones en la escalera, una carta entregada en la municipalidad de distrito por don Félix que «conoce al regidor». No ganan la guerra, pero las quemas pasan a ser mensuales y avisadas: los vecinos se organizan con WhatsApp y avisan para cerrar ventanas.",
          recuerdo: "Doce firmas cambiaron el aire de mi invierno. La organización huele a futuro."
        },
        {
          t: "Aguantar: «es el barrio donde vivimos, no se puede pelear contra todo».",
          ef: { salud: -4, conciencia: 1 }, fl: ["humo-basural"],
          nota: "Dos noches de máscaras improvisadas con camisetas mojadas. El humo pasa, como pasa todo en el cerro: dejando sedimento. Tus pulmones en formación registraron la factura química sin que nadie la firmara.",
          recuerdo: "Respiré ceniza antes que aire limpio. Mis pulmones aprendieron a defenderse solos."
        }
      ],
      sig: "t2s20"
    },

    /* ── semana 20 · MITAD (celebración) ────────────────── */
    {
      id: "t2s20", cp: true, temp: "Segundo trimestre",
      lugar: "El cuarto · sábado",
      titulo: "Veinte semanas: mitad exacta",
      eco: [
        "Veinte semanas. Mitad del camino. El bebé ahora traga líquido amniótico —ensayo digestivo— y lo devuelve filtrado; la orina alimenta el ciclo eterno de su piscina privada. Mide dieciséis centímetros y pesa como un plátano.",
        "En el dedo índice y el pulgar ya funciona el agarre: atrapa el cordón umbilical con delicadeza de cirujano y lo suelta. Juega con su propio cuerpo como quien descubre un parque nuevo.",
        "{papa} propone celebrar la mitad. La pregunta es cómo, con quincena corta."
      ],
      opciones: [
        {
          t: "Fiesta sorpresa de comadres: torta casera, globos, la panza como invitada de honor.",
          ef: { vinculo: 6, salud: 1 }, fl: ["fiesta-panza"],
          nota: "Doce mujeres en un cuarto para una y media. Torta de vainilla con betún rosa, juegos de adivinar el sexo con hilo y aguja, consejos contradictorios a granel. {mama} ríe hasta llorar. La panza recibe besos de doce labios distintos y música de cumbia hasta medianoche.",
          recuerdo: "Mi fiesta primero fue de ellas. Doce mujeres cantándome fuerte y desafinado."
        },
        {
          t: "Cena simple de dos: pollo especial y conversación de futuros.",
          ef: { vinculo: 4, conciencia: 2 }, fl: ["cena-dos"],
          nota: "Pollo a la brasa traído de abajo, servido en el mantel de propaganda con las velas de cumpleaños encontradas en un cajón. Hablan de escuelas, de nombres definitivos, de cómo será ese mayo que se acerca. Íntimo y suficiente.",
          recuerdo: "Una cena de dos hablando de tres. El pollo era rico, dicen."
        },
        {
          t: "Guardar el dinero: cada sol cuenta ahora para lo que viene.",
          req: { st: {} }, ef: { conciencia: 1 }, fl: ["ahorro-firme"],
          nota: "Sin fiesta: la quincena completa va a la lata bajo la cama —si existe— o al sobre escondido en el forro del colchón. El sacrificio también es una forma de celebración, aunque sea la menos dulce."
        }
      ],
      sig: "sn20-azotea"
    },

    /* ── sn20 · ESCENA SONORA: la mitad en la azotea ────── */
    {
      id: "sn20-azotea", sem: 20, temp: "Segundo trimestre",
      tipo: "sonoro",
      lugar: "Azotea comunal · esa misma noche",
      titulo: "La azotea y las veinte semanas",
      consigna: "(escena sonora — sube el volumen: esta noche se celebra)",
      ambiente: ["cumbia"],
      dialogos: function (estado) {
        const conGuitarra = estado.flags["guitarra"] && !estado.flags["guitarra-vendida"];
        const lineas = [
          { quien: "papa", texto: "(abriendo dos sillas plásticas) Nuestro comedor tiene cinco estrellas: vista al Pacífico, música gratis del barrio y un menú de galletas soda con mantequilla." },
          { quien: "mama", texto: "Michelin no sabe lo que se pierde. Veinte semanas hoy. La mitad exacta, dice la cartilla." },
          { quien: "papa", texto: "Diez adentro, diez afuera. Ya somos mayoría: dos contra uno." },
          { quien: "mama", texto: "(riendo) Ese chiste lo haces cada semana y cada semana me río igual." }
        ];
        if (conGuitarra) {
          lineas.push({ quien: "papa", texto: "(rasgando tres acordes desafinados) Y ahora… el concierto semanal. Canción número uno del cerro, dedicada a un espectador de veinte centímetros." });
          lineas.push({ quien: "narrador", texto: "Abajo suena una cumbia lejana que compite con tres acordes mal tocados. Arriba del todo, entre focos ajenos y ropa tendida, alguien patea al ritmo de las dos músicas sin decidirse por ninguna." });
        } else {
          lineas.push({ quien: "papa", texto: "Si tuviera guitarra tocaría la canción esa… la inventada. Pero la noche está buena hasta sin música." });
          lineas.push({ quien: "mama", texto: "Tararéala. Yo hago los coros." });
          lineas.push({ quien: "narrador", texto: "Abajo suena una cumbia lejana; arriba, dos personas tarareando una canción que no existe todavía pero ya tiene dueño." });
        }
        return lineas;
      },
      golpes: function (estado) {
        return (estado.flags["guitarra"] && !estado.flags["guitarra-vendida"])
          ? [{ en: 4, sfx: "guitarra" }]
          : [];
      },
      sig: "t2s21"
    },

    /* ── semana 21 · eco morfológica II ─────────────────── */
    {
      id: "t2s21", sem: 21, temp: "Segundo trimestre",
      lugar: "María Auxiliadora · control",
      titulo: "El corazón que tropeza",
      eco: [
        "Control de seguimiento. La ecografía busca específicamente aquello que la anterior insinuó —y encuentra: extrasístoles, latidos que se adelantan a sí mismos de vez en cuando, como un tamborilero que tropieza cada tanto y sigue marchando.",
        "«Es benigno en la enorme mayoría de casos», explica el obstetra señalando la pantalla. «Los vemos seguido. Desaparecen solos antes del parto casi siempre. Pero vamos a vigilar: control cardiológico fetal en cuatro semanas».",
        "Palabra médica para «está bien pero hay que mirarlo»: vigilancia. La palabra menos dramática y más cansada del vocabulario hospitalario."
      ],
      opciones: [
        {
          t: "Preocuparse en silencio, buscar en internet hasta la madrugada.",
          ef: { vinculo: -2, conciencia: 2 }, fl: ["ansiedad-medica"],
          nota: "Tres noches de pantalla brillante a las dos de la mañana, leyendo foros donde el peor caso siempre parece el único caso. El estrés crónico inunda el cuerpo de cortisol, y el cortisol atraviesa la placenta como carta certificada. Tú lo recibes y no sabes de dónde viene la angustia que sientes flotando.",
          recuerdo: "Sentí miedo prestado durante semanas. El miedo ajeno también se hereda."
        },
        {
          t: "Confiar en el pronóstico: anotar la cita, vivir tranquila, volver en cuatro semanas.",
          ef: { salud: 3, vinculo: 2 }, fl: ["confianza"],
          nota: "Anotado en el calendario con marcador azul. Ni una noche más de búsquedas. «Si el doctor dice vigilar, se vigila y ya», sentencia doña Carmen por teléfono. El tamborilero interior sigue tropenzando y siguiendo, y nadie le resta mérito.",
          recuerdo: "Mi corazón aprendió a tropezar sin caerse. Como todos los corazones decentes."
        }
      ],
      sig: "t2s22"
    },

    /* ── semana 22 · sabores ────────────────────────────── */
    {
      id: "t2s22", sem: 22, temp: "Segundo trimestre",
      lugar: "Útero · semana veintidós",
      titulo: "Menú amniótico",
      eco: [
        "Las papilas gustativas funcionan desde hace semanas; ahora se suman los receptores olfativos. Cada comida de {mama} cambia el sabor del líquido que tragas: ajo es picante lejano, canela es tibio, el ají amarillo es una fiesta roja que llega dos horas después de comerlo.",
        "Estás aprendiendo gastronomía por ósmosis. Los estudios dicen que los sabores probados en el útero serán preferidos en la infancia: estás desarrollando gustos antes de tener mesa donde sentarte.",
        "Tu cara ya hace muecas distintas según el sabor. Fruncir el ceño ante lo amargo es un reflejo instalado que jamás se desinstalará."
      ],
      opciones: [
        {
          t: "Variedad total: ají, frutas, pescado los viernes, todo con moderación.",
          ef: { salud: 4, desarrollo: 3 }, fl: ["paladar-variado"],
          nota: "La dieta de la variedad: ceviche cocinado los viernes —bien cocido, advierte la posta—, quinua en sopas, mango maduro de postre, ají amarillo en todo. Cada semana, un sabor nuevo para tu archivo privado de sensaciones.",
          recuerdo: "Conocí el ají amarillo antes que el mundo. Por eso lloro picante y no tristeza."
        },
        {
          t: "Repetir lo seguro: arroz, papas, tallarín los siete días.",
          ef: { desarrollo: -1 },
          nota: "La economía del repetido: barato, llenador, monocorde. El menú amniótico de estas semanas sabe siempre a lo mismo: seguro y aburrido. Nadie culpa a nadie; el presupuesto manda.",
          recuerdo: "Comí arroz con papas antes que nada. Mi paladar nació humilde y agradecido."
        }
      ],
      vozDesde: 50,
      voz: ["Les confieso: el mejor sabor de mi vida la comieron ustedes dos. El mango maduro de la semana veintidós. Todavía lo busco."],
      sig: "t2s23"
    },

    /* ── semana 23 · ANEMIA ─────────────────────────────── */
    {
      id: "t2s23", sem: 23, temp: "Segundo trimestre",
      lugar: "Laboratorio de la posta · lunes",
      titulo: "Hemoglobina diez",
      eco: [
        "Análisis de rutina. Resultado: hemoglobina 10.2 —anemia leve-moderada—. El número explica síntomas que {mama} achacaba a flojera: el cansancio de las dos de la tarde, el desmayo al pararse rápido, las ganas de comer tierra que da vergüenza contar.",
        "La obstetra es clara: «Su bebé toma el hierro primero, mamá. Usted es la que queda sin nada. Pero si usted se vacía, el pozo se seca para ambos». Receta: sulfato ferroso diario, más la lista de alimentos: hígado, lentejas, espinaca, sangrecita.",
        "Dentro, tu médula ósea trabaja a full produciendo glóbulos rojos con hemoglobina fetal —más eficiente que la adulta, diseñada para robar oxígeno hasta del aire más pobre—."
      ],
      opciones: [
        {
          t: "Régimen estricto: pastilla diaria con jugo de naranja, lentejas tres veces por semana.",
          ef: { salud: 6, desarrollo: 2 }, fl: ["hierro"], sinFl: ["anemia"],
          nota: "Disciplina de hierro —literalmente—. La pastilla amarga bajada con naranja para absorber mejor, lentejadas los lunes, sangrecita al gusto dudoso del miércoles. En seis semanas, la hemoglobina sube a once y media. El pozo vuelve a tener agua.",
          recuerdo: "Cada lenteja de esos lunes fue un ladrillo de mis glóbulos. Comida = arquitectura."
        },
        {
          t: "Pastillas «cuando acuerde», dieta como salga: demasiado lío para cumplir.",
          ef: { salud: -5 }, fl: ["anemia"],
          nota: "La pastilla olvida en el fondo del cajón; las lentejas pierden contra el tallarín de todos los días. El cansancio de las dos de la tarde se vuelve de las once de la mañana. La hemoglobina queda en diez y algo, y ahí se queda, cómoda en su déficit.",
          recuerdo: "Corrí en sueños y no avanzaba durante semanas. Me faltaba el hierro que no llegó."
        }
      ],
      sig: "t2s24"
    },

    /* ── semana 24 · VOCES (minijuego) ──────────────────── */
    {
      id: "t2s24", sem: 24, cp: true, temp: "Segundo trimestre",
      tipo: "voz",
      lugar: "Útero · semana veinticuatro",
      titulo: "¿Quién habla?",
      consigna: "Dos voces llegan filtradas por el agua. Identifica cuál es la de {mama} — la reconocerás por lo aprendido estas semanas.",
      notaAcierto: "La reconociste al instante: la voz que te hablaba de frente a la panza cada noche, la que leía farmacología, la que cantaba desafinado. Esa era casa.",
      notaError: "Te confundiste de voz. No importa: quedan dieciséis semanas de clases gratis de fonética parental.",
      eco: [
        "Semana veinticuatro: la audición despierta del todo. Ya no son vibraciones difusas sino sonido estructurado: voces distinguibles, música con melodía, el timbre de cada persona como firma única.",
        "Y hay un descubrimiento acústico fundamental: la voz de {mama} te llega doble —por fuera, por el aire, y por dentro, conducida por los huesos y el líquido—. Su voz es la única que suena estéreo. Es, técnicamente, tu primer concepto de hogar.",
        "Esta noche, dos voces hablan sobre ti en la mesa. Escucha bien."
      ],
      voces: [
        { nombre: "voz que suena doble y tibia", notas: [294, 349, 392, 349], correcta: true },
        { nombre: "voz que viene solo de afuera", notas: [165, 196, 175, 147], correcta: false }
      ],
      sig: "t2s24b"
    },

    /* ── t2s24b · CANCIÓN (minijuego simon) ─────────────── */
    {
      id: "t2s24b", sem: 24, cp: true, temp: "Segundo trimestre",
      tipo: "cancion", rondas: [2, 3, 4], flExito: "cancion-aprendida",
      lugar: "Útero · esa misma noche, ya en la cama",
      titulo: "Nuestra canción de cinco notas",
      consigna: "{mama} inventa una melodía con cinco notas para tararearte. Escúchala y repítela — es tu primera canción propia.",
      notaExito: "Las tres melodías completas, sin fallar una nota. «Este niño ya tiene oído», dice {mama} al cuarto vacío. La canción queda adoptada oficialmente: será la del baño, la del bus, la de las noches de insomnio.",
      recuerdoExito: "Cinco notas me pertenecen. Cuando vuelva a oírlas afuera, diré: esas son mías.",
      eco: [
        "Con la audición despierta del todo, la música deja de ser vibración y se vuelve melodía: contorno, ritmo, intención. Y como toda cosa nueva, pide dueño.",
        "Sobre el colchón, {mama} ensaya con los dedos sobre la sábana, como si la cama tuviera teclas: do… re… mi… sol… la. Una pentatónica de sobreviviente, aprendida de una canción de su madre."
      ],
      sig: "t2s25"
    },

    /* ── semana 25 · CRISIS ECONÓMICA ───────────────────── */
    {
      id: "t2s25", sem: 25, temp: "Segundo trimestre",
      lugar: "Obra abandonada · miércoles",
      titulo: "La obra paró",
      eco: [
        "Miércoles negro. {papa} llega temprano a la obra de Surco y encuentra el portón candado y un papel pegado con cinta: LA OBRA SE SUSPENDE HASTA NUEVO AVISO. El contratista desapareció con la adelantada de tres semanas de jornales.",
        "Vuelve al cerro con la noticia pesando más que las herramientas. Veintitrés semanas de embarazo, alquiler pendiente, y la economía doméstica sostenida hasta ayer por un sueldo que ya no existe.",
        "La noche es larga. Hay silencios que pesan kilos."
      ],
      opciones: [
        {
          t: "Vender la guitarra prestada —no, la guitarra ES de él: vender la suya vieja— y lo que quede de valor.",
          ef: { vinculo: -3, conciencia: 3 }, fl: ["guitarra-vendida"],
          nota: "Ciento veinte soles por la guitarra que tocaba tres acordes cada noche. El ritual de las nueve muere en una casa de empeño de la Av. Los Héroes. {mama} no dice nada, pero esa noche llora en el baño con la ducha encendida. Sacrificio noble; pérdida real.",
          recuerdo: "La guitarra se fue antes que yo. A veces, en sueños, escucho acordes que nunca oí."
        },
        {
          t: "Préstamo de doña Rosa, la de la bodega: fiado con calendario honesto.",
          req: { fl: ["barrio"] }, pista: "Requiere raíces en el barrio: conocerte es estar fiado",
          ef: { salud: 2, vinculo: 2 }, fl: ["deuda-honesta"],
          nota: "Doña Rosa presta trescientos soles sin interés, con cuaderno propio donde anota fechas con lápiz. «Usted paga cuando pueda, criatura, pero paga». Dignidad prestada a plazo fijo. El alquiler se pone al día y la respiración de la casa mejora.",
          recuerdo: "Una bodeguera sostuvo mi casa tres semanas. Los préstamos con cuaderno son los más limpios."
        },
        {
          t: "{papa} remonta: mototaxi de turno nocturno prestado por su primo.",
          ef: { salud: -3, vinculo: 3, conciencia: 2 }, fl: ["mototaxi-nocturno"],
          nota: "De diez de la noche a dos de la mañana, carreras a cinco soles por el circuito del cerro. Gana lo justo para el arroz y el gas, y vuelve con los ojos rojos del viento y del sueño. La casa respira aliviada; él, apenas.",
          recuerdo: "Papá manejaba mototaxi de noche y yo lo acompañaba en espíritu, contando curvas."
        }
      ],
      diario: {
        fecha: "fines de noviembre",
        texto: "La obra paró y a Marcos se le apagó la cara como foco quemado. Hoy vendió cosas para el gas y el arroz. Yo le dije: «nosotros estamos bien, la criatura patea fuerte, lo demás se remonta». Le tembló la voz cuando dijo gracias. Este hombre nunca había dicho gracias por un arroz.",
        autor: "{mama}"
      },
      sig: "sn25-pelea"
    },

    /* ── sn25 · ESCENA SONORA: la pelea ─────────────────── */
    {
      id: "sn25-pelea", sem: 25, temp: "Segundo trimestre",
      tipo: "sonoro",
      lugar: "El cuarto · esa noche, con la puerta entreabierta",
      titulo: "Lo que se rompe y lo que no",
      consigna: "(escena sonora — las peleas también se heredan, por eso esta se oye entera)",
      ambiente: [],
      dialogos: function (estado) {
        const alivio = estado.flags["deuda-honesta"] || estado.flags["mototaxi-nocturno"];
        const lineas = [
          { quien: "papa", texto: "(voz contenida) Que no me busquen mañana. Mañana vuelvo a la obra aunque sea a pedir trabajo de ayudante. De algo." },
          { quien: "mama", texto: "¿Y si no hay? ¿Marcos, y si no hay nada? Faltan tres meses y medio. TRES." },
          { quien: "papa", texto: "¡Y qué quieres que haga! ¡¿Que me invente plata?! ¡Yo también tengo miedo, pero yo no puedo permitirme estar con miedo!" },
          { quien: "mama", texto: "(más bajo, temblando) No le levantes la voz así. Lo escucha. Siento que… lo escucha." }
        ];
        if (!alivio) {
          lineas.push(
            { quien: "narrador", texto: "Silencio. El más largo del año. Afuera, una moto pasa y nadie dice nada hasta que su ruido muere en la Panamericana." },
            { quien: "papa", texto: "(sentándose en el piso, junto a la cama) Perdón. Perdón. No era contra ti. Es que tengo miedo y no sé ponerlo en otro lado." },
            { quien: "mama", texto: "(bajando del colchón, sentándose junto a él) Ponlo acá. En mi mano. Ya está. Ya está. Lo resolvemos como se pueda, pero juntos, ¿oyes? Juntos." }
          );
        } else {
          lineas.push(
            { quien: "comadre", texto: "(golpeando desde abajo, sin entrar) ¡Criaturaaaa! ¡Se oye hasta acá! Bajen el volumen del miedo que los vecinos estamos cocinando paciencia." },
            { quien: "papa", texto: "(riendo sin ganas) Doña Carmen tiene radar. Buenas noches, doña!" },
            { quien: "mama", texto: "(secándose la cara) Vaya. Gracias… por gritar bajito, por lo menos. Ven acá. La lata —el sobre— lo que haya: lo contamos juntos mañana. Juntos, ¿oyes?" }
          );
        }
        return lineas;
      },
      golpes: [{ en: 4, sfx: "puerta" }],
      sig: "t2s26"
    },

    /* ── semana 26 · ojos ───────────────────────────────── */
    {
      id: "t2s26", sem: 26, temp: "Segundo trimestre",
      lugar: "Útero · semana veintiséis",
      titulo: "Abrir los ojos adentro",
      eco: [
        "Los párpados, soldados desde el tercer mes, se despegan esta semana. Abres los ojos por primera vez —no hay nada que ver: penumbra rojiza, luz difusa cuando el sol pega directo en la panza— pero el gesto existe. Parpadearás miles de veces antes de conocer un solo color.",
        "También aparecen los ciclos: por primera vez hay algo parecido al sueño REM, con rápidas sacudidas oculares bajo los párpados nuevos. Sueñas, presumiblemente. Con qué, nadie lo sabe. Quizá con esto mismo: un cuarto tibio de sonido constante y amor filtrado por paredes.",
        "El cerebro, entretanto, desarrolla su actividad más humana: las ondas cerebrales de vigilia alternan con las de descanso en patrones que seguirán siendo tuyos toda la vida."
      ],
      opciones: [
        {
          t: "{mama} ordena su descanso: dormir temprano, siesta cuando el cuerpo pide.",
          ef: { salud: 3, vinculo: 2 }, fl: ["descanso"],
          nota: "La cama a las diez, la siesta sagrada de las tres, el celular lejos de la almohada. Cuando ella duerne profundo, tu ritmo cardíaco se sincroniza al suyo como dos motores afinados. Descanso compartido, literally.",
          recuerdo: "Dormíamos sincronizados. Todavía me duermo si alguien cerca respira lento."
        },
        {
          t: "Seguir al pie de la letra las novelas de las diez y el chisme del grupo.",
          ef: { salud: -2, conciencia: 1 }, fl: ["insomnio"],
          nota: "Las diez: novela. Las once: novela repetida. Las doce: chisme del grupo del barrio hasta que los ojos arden. Tu sueño REM se desordena alrededor del horario ajeno. Nacerás, probablemente, búho.",
          recuerdo: "Nací nocturno por culpa de una novela. Reclamaré derechos de autor."
        }
      ],
      vozDesde: 70,
      voz: ["Hoy abrí los ojos. No vi nada, obviamente: penumbra rosada. Pero ahora sé que tengo párpados y eso me hace preguntas que no sé hacer en palabras."],
      sig: "t2s27"
    },

    /* ── semana 27 · CRISIS: ola de frío + cierre T2 ────── */
    {
      id: "t2s27", sem: 27, temp: "Segundo trimestre",
      tipo: "control",
      lugar: "Cuarto de triplay · julio vuelve con todo",
      titulo: "El invierno muerde",
      eco: [
        "Julio trae la ola de frío que Lima niega tener. Diecitrés grados que, en una casa de triplay sin aislamiento, equivalen a ocho de sensación. Y con el frío, la crisis logística: corte de agua en la zona alta —tubería reventada en la bomba comunal—, tercera vez este año.",
        "Sin agua: baldes desde la pileta pública cinco escaleras abajo, hervido en la olla para bañarse a jarrazos, ropa lavada a media máquina prestada. El invierno del cerro no mata, pero desgasta como lija fina.",
        "Control trimestral: presión al límite bueno, peso justo, latidos del bebé fuertes. La licenciada Huamán mira la cartilla y dice lo que dice cada año: «en invierno, criatura, más cuidado: frío, humedad y virus andan buscando panzas»."
      ],
      opciones: [
        {
          t: "Brasero de carbón dentro del cuarto cerrado: calor inmediato, riesgo invisible.",
          ef: { salud: -6 }, fl: ["brasero-peligro"],
          nota: "Funciona: el cuarto se vuelve sauna pobre en veinte minutos. Lo que nadie menciona: brasero encendido en cuarto cerrado produce monóxido de carbono, el asesino invisible de cada invierno limeño. Dos noches de dolor de cabeza matutino antes de que doña Carmen —que lo vio en un noticiero— prohibiera el experimento a gritos.",
          recuerdo: "Hubo calor traidor en el invierno. Un gas sin olor me dio miedo sin nombre."
        },
        {
          t: "Capas de ropa vieja, frazadas al revés —lo peludo adentro— y agua caliente a jarros.",
          ef: { salud: 2, conciencia: 1 }, fl: ["invierno-clasico"],
          nota: "La tecnología ancestral del pobre invernar: tres polos superpuestos, frazada de polar invertida, botella con agua caliente a los pies como estufa personal. Frío digno, sin gases raros. El invierno pasa, como pasa todo, dejando orgullo y mucosidad.",
          recuerdo: "Nací de una bola de frazadas con patas. El invierno no pudo con nosotros."
        },
        {
          t: "Solidaridad: dormir unos días en lo de doña Carmen, cuya casa sí tiene paredes de ladrillo.",
          req: { fl: ["comadres"] }, pista: "Requiere red de comadres del barrio",
          ef: { salud: 5, vinculo: 3 }, fl: ["refugio-comadre"],
          nota: "Una semana en la casa de ladrillo de doña Carmen, durmiendo en el colchón de visita que huele a alcanfor. La vieja cocina para tres, cuenta historias de sus ocho partos y de dos guerras vecinales, y duerme a todos con mate de manzanilla. Calor humano, categoría literal.",
          recuerdo: "Una semana de paredes ajenas que fueron más mías que muchas paredes propias."
        }
      ],
      diario: {
        fecha: "julio, control de los seis meses",
        texto: "Frío de verdad este año. Lavamos con agua de jarro y dormimos como sardinas con la criatura pateando entre nosotros. El doctor dice que está perfecto, que pesa como un repollo. Marcos le habló a la panza anoche y el bebé le pateó la mano. Lloró. Yo me hago la dormida para no avergonzarlo.",
        autor: "{mama}"
      },
      sig: "t3s28"
    }
  ]);
})();
