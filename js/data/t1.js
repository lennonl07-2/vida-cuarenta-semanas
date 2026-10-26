/* ════════════════════════════════════════════════════════════
   VIDA · primer trimestre
   semanas 1 a 12: del punto invisible al limón.
   ════════════════════════════════════════════════════════════ */
(function () {
  const V = window.VIDA.motor;

  V.registrar([

    /* ── semana 1 ───────────────────────────────────────── */
    {
      id: "s01", sem: 1, cp: true, temp: "Primer trimestre",
      lugar: "Útero · días 7 a 10",
      titulo: "Dos células, cuatro, ocho…",
      eco: [
        "La división no se detiene. Dos, cuatro, ocho, dieciséis. Cada célula idéntica a la anterior lleva dentro el plan completo de lo que serán: color de ojos, forma de las orejas, la manera exacta en que se fruncirá el ceño ante una injusticia.",
        "Afuera, {mama} sigue tomando su desayuno parada en la puerta del cuarto, contando los días para el siguiente examen de la carrera. No sabe que desde hace una semana comparte sangre con alguien más.",
        "El blastocisto ahora tiene una masa interna —el disco embrionario, tú— y una masa externa que hará la placenta: los obreros invisibles que construirán tu casa durante nueve meses."
      ],
      opciones: [
        {
          t: "Escuchar el murmullo de las células: algo grande está empezando.",
          ef: { conciencia: 3, desarrollo: 1 },
          nota: "Entre división y división hay un instante quieto. En ese instante, por primera vez, piensas —o algo parecido a pensar—: «esto soy yo construyéndose»."
        },
        {
          t: "Dormir. Crecer cansa.",
          ef: { salud: 2 },
          nota: "Te entregas al oficio más antiguo: multiplicarse mientras se duerme. Las células agradecen el descanso trabajando doble."
        }
      ],
      sig: "s02"
    },

    /* ── semana 2 · riesgo ectópico ─────────────────────── */
    {
      id: "s02", sem: 2, temp: "Primer trimestre",
      lugar: "Trompa uterina · días 10 a 14",
      titulo: "El río estrecho",
      eco: [
        "La trompa es un túnel del grosor de un espagueti, forrado de cilios —pelillos que barren hacia el útero como olas de estadio—. El embrión viaja empujado por ellas y por las contracciones suaves del músculo.",
        "A veces el viaje falla. A veces el embrioncito se adhiere antes de tiempo, dentro de la trompa: embarazo ectópico, palabra que ninguna pareja quiere aprender. Si pasa, nada de esto existe. Pero eso aún no está escrito."
      ],
      opciones: [
        {
          t: "Seguir el ritmo de los cilios: ni adelantarse ni quedarse atrás.",
          ef: { salud: 4 }, fl: ["ritmo-cilios"],
          nota: "Cuatro días de viaje perfecto. La trompa entrega su carga puntual, como cartero antiguo. El útero recibe al huésped con la alfombra lista.",
          recuerdo: "Aprendí temprano que hay ríos que no se reman: se acompañan."
        },
        {
          t: "Adelantarse: llegar antes, adherirse rápido, asegurar el sitio.",
          ef: { salud: -6, conciencia: 2 }, fl: ["riesgo-trompa"],
          pista: "",
          nota: "La prisa cuesta. Te detienes medio camino, pegado a una curva de la trompa. Por ahora solo es un retraso incómodo —un dolor leve que {mama} sentirá del lado derecho y achacará a gases—. Pero esta deuda quedó anotada.",
          recuerdo: "Me apresuré y el río me cobró. Hay apuros que duran semanas."
        }
      ],
      sig: "s03"
    },

    /* ── semana 3 · síntomas ────────────────────────────── */
    {
      id: "s03", sem: 3, temp: "Primer trimestre",
      lugar: "Cuarto de Pamplona Alta · fin de mes",
      titulo: "Los olores se vuelven gigantes",
      eco: [
        "En el útero ya flota el saco gestional: una burbuja de líquido donde el disco embrionario se pliega sobre sí mismo. Empiezan a formarse las tres capas que lo harán todo: una será piel y nervios; otra, huesos y músculos; la última, pulmones, hígado, tripas.",
        "Afuera, la hormona hCG —la misma que fabrica las dos rayitas de las pruebas— inunda la sangre de {mama}. Con ella llegan los regalos sorpresa: sueño de plomo, pechos dolorosos y un superpoder nuevo e incómodo: oler el pescado de la vecina a través de dos paredes.",
        "Esta mañana el café —su café sagrado— huele a cuadra mojada. Lo dejó intacto."
      ],
      opciones: [
        {
          t: "{mama} come igual que siempre aunque el cuerpo proteste.",
          ef: { salud: 1, desarrollo: 1 },
          nota: "Fuerza de costumbre: media avena bajada con agua. Es poco, pero es algo. El embrión toma lo suyo primero —para eso sirve ser el jefe de la casa— y deja a mamá con náuseas y hambre a partes iguales."
        },
        {
          t: "{papa} nota el desgano y cocina él: arroz blanco, plátano sancochado.",
          req: { st: { vinculo: 50 } }, pista: "Necesita conocerla bien: vínculo 50",
          ef: { vinculo: 4, salud: 2 }, fl: ["cuido-temprano"],
          nota: "Él no sabe todavía por qué ella está así. Solo sabe que su gente está pálida y que él sabe hacer tres platos: este es uno. Ella llora dos gotas disimuladas mirando la olla. Comida hecha por otros sabe distinto.",
          recuerdo: "Papá cocinó antes de saber por qué. Ese arroz simple me supo a herencia."
        }
      ],
      sig: "s04"
    },

    /* ── semana 4 · la prueba ───────────────────────────── */
    {
      id: "s04", sem: 4, temp: "Primer trimestre",
      lugar: "Baño compartido del pasaje · lunes",
      titulo: "Dos rayitas",
      eco: [
        "El periodo no llegó. Un día de retraso, tres, cinco. {mama} cuenta en el calendario del celular tres veces, por si el dedo se equivoca.",
        "En la bodega de doña Rosa venden pruebas de embarazo junto a las pilas y los fósforos: siete soles. {mama} compra una envuelta en papel periódico, con la cara más seria de la historia de las compras domésticas.",
        "El baño compartido del pasaje tiene una bombilla débil y una cortina de flores decoloradas. Sobre el lavatorio, la prueba trabaja en silencio. Cinco minutos que son una vida."
      ],
      opciones: [
        {
          t: "Mirar sola, respirar hondo, y luego contarle a {papa} esa misma tarde.",
          ef: { vinculo: 6, conciencia: 2 }, fl: ["confesion-rapida"],
          nota: "Dos rayitas rosadas, nítidas como vías de tren. Se sienta en el borde de la bañera un rato largo, con la prueba en la mano como quien sostiene un pajarito recién nacido. Cuando llega a casa de la obra, él ve su cara y lo sabe antes de que abra la boca. Se abrazan torpe, fuerte, eterno.",
          recuerdo: "Contó la noticia el mismo día. Los secretos largos pudren; los dichos a tiempo florecen."
        },
        {
          t: "Esperar unos días: repetir la prueba para estar segura antes de hablar.",
          ef: { conciencia: 2 }, fl: ["cautela"],
          nota: "Guarda la prueba envuelta en papel tissue, al fondo de una media. Tres días después, segunda prueba: mismas dos rayitas. La tercera espera ya no fue prudencia sino valentía pospuesta.",
          recuerdo: "Hubo tres días míos de ser un secreto guardado en una media. No me gustó, pero la entendí."
        }
      ],
      diario: {
        fecha: "principios de septiembre",
        texto: "Dos rayitas. DOS RAYITAS. Me senté en el piso del baño a reírme y a asustarme alternadamente como loca. Todavía no lo digo ni en voz baja porque si lo digo mucho puede espantarse, dicen las comadres. Ay. Ay ay ay.",
        autor: "{mama}"
      },
      sig: "sn04-dosrayitas"
    },

    /* ── sn04 · ESCENA SONORA: cinco minutos de prueba ──── */
    {
      id: "sn04-dosrayitas", sem: 4, temp: "Primer trimestre",
      tipo: "sonoro",
      lugar: "El baño compartido · los cinco minutos",
      titulo: "Lo que se dice cuando nadie ve",
      consigna: "(escena sonora — lo que pasó dentro del baño no lo sabe nadie)",
      ambiente: [],
      dialogos: [
        { quien: "mama", texto: "(susurrándole a la prueba) Vamos, nena… quiero decir… vamos, lo que sea que seas. Dos rayitas o una. Pero decídelo de una vez." },
        { quien: "mama", texto: "Ay, ya estoy hablándole a un palito de plástico. Es señal de locura, esto." },
        { quien: "vecina", texto: "(golpeando la puerta) ¡Doña! ¿Se cayó adentro? ¡Que hay fila, oiga!" },
        { quien: "mama", texto: "¡Un minutito, señora Nieves! ¡Problemas de mujer!" },
        { quien: "vecina", texto: "¡Esos problemas son los mismos desde el cincuenta! ¡Apúrese!" },
        { quien: "mama", texto: "(respirando hondo, mirando la prueba) …Dos. Son dos rayitas. Madre santa. Okay. Okay okay okay. Respira. Primero lo cuento yo, después el mundo." },
        { quien: "narrador", texto: "Detrás de la cortina de flores decoloradas, alguien acaba de enterarse de que existe. Y afuera, una vecina impaciente sigue gritando sin saber que acaba de gritarle a tres personas." }
      ],
      golpes: [{ en: 2, sfx: "puerta" }],
      sig: "s05"
    },

    /* ── semana 5 · confirmación médica ─────────────────── */
    {
      id: "s05", sem: 5, cp: true, temp: "Primer trimestre",
      lugar: "Posta de Pamplona Alta · miércoles, 6 a.m.",
      titulo: "La fila de la posta",
      eco: [
        "Para abrir la posta hay que hacer fila antes de las seis, y la fila ya viene con sillas plegables y termos de mate de coca. Adentro huele a alcohol en gel y a expedientes viejos. La obstetra —licenciada Huamán, voz firme, mirada que escanea— revisa la prueba casera y ordena la confirmación con análisis.",
        "Beta-hCG positiva. Embarazo confirmado, aproximadamente cuatro semanas y media. La licenciada anota la fecha probable de parto: mediados de mayo. Mayo. {papa} repite «mayo» tres veces como si fuera un idioma nuevo."
      ],
      opciones: [
        {
          t: "Preguntarlo todo: qué comer, qué tomar, cuándo volver.",
          ef: { salud: 3, vinculo: 2 }, fl: ["informada"],
          nota: "La licenciada Huamán sonríe por primera vez. Entrega un folletito doblado y receta ácido fólico gratis del botiquín: «Todos los días, aunque no desayune. Esto le cierra la columna al bebé». {mama} sube el cerro leyendo el folleto caminando.",
          recuerdo: "Una pastillita naranja todos los días cerró mi columna vertebral. Gracias, folletito doblado."
        },
        {
          t: "Solo lo básico: salir rápido, hay cola y trabajo espera.",
          ef: { conciencia: 1 },
          nota: "Receta en el bolsillo, cabeza en la obra. Lo importante quedó hecho; lo demás, dicen, ya se irá aprendiendo en el camino."
        }
      ],
      vozDesde: 15,
      voz: ["¿Ya ven? Hasta tengo cita oficial. Soy paciente número tal vez, pero paciente."],
      sig: "sn05-posta"
    },

    /* ── sn05 · ESCENA SONORA: sala de espera de la posta ─ */
    {
      id: "sn05-posta", sem: 5, temp: "Primer trimestre",
      tipo: "sonoro",
      lugar: "Posta · pasillo de obstetricia, 6:40 a.m.",
      titulo: "Voces de la posta",
      consigna: "(escena sonora — una mañana cualquiera que nadie olvida)",
      ambiente: ["posta"],
      dialogos: [
        { quien: "enfermera", texto: "¡Siguiente! Cartilla en mano… ¡Doña, el bebé no se inscribe solo, ándate!" },
        { quien: "mama", texto: "Buenos días… vengo por la confirmación. Hice una prueba casera y la licenciada pidió análisis." },
        { quien: "doctora", texto: "(hojeando la cartilla) Cuatro semanas y media según la fecha. Bien llegadita. ¿Algún sangrado, dolores fuertes, vómitos con sangre?" },
        { quien: "mama", texto: "Nada de eso. Solo sueño… un sueño que da miedo de tanto." },
        { quien: "doctora", texto: "Normal: su cuerpo está fabricando una persona completa de cero. Es el único proyecto donde dormir es trabajar. Ácido fólico todos los día, comida real, y me trae la analítica la próxima semana." },
        { quien: "enfermera", texto: "(al pasar, bajito) Felicidades, mamá. El primero siempre asusta más. Los demás nacen con manual incluido." },
        { quien: "narrador", texto: "En el pasillo, ocho panzas esperan sentadas en bancas metálicas. Una radio vieja susurra noticias de tráfico. Y entre pitidos lejanos y murmullos, alguien muy pequeño acaba de conseguir su primera ficha médica." }
      ],
      golpes: [],
      sig: "s06"
    },

    /* ── semana 6 · EL LATIDO (minijuego) ───────────────── */
    {
      id: "s06", sem: 6, temp: "Primer trimestre",
      tipo: "latido", bpm: 112, rondas: 6,
      lugar: "Útero · día 38",
      titulo: "Ta-dum",
      consigna: "Hoy, en una tubería del tamaño de una lenteja, empieza un motor. Acompasa tu ritmo al suyo: presiona cuando el anillo lata.",
      eco: [
        "Semana seis. Dos tubitos que eran uno se han doblado y fusionado en un corazón diminuto, y ese corazón acaba de arrancar: ciento diez latidos por minuto, casi el doble de rápido que el de tu madre.",
        "Desde afuera nadie podría escucharlo. Pero aquí adentro es un tambor de fiesta: ta-dum, ta-dum. El sonido más nuevo del universo.",
        "En la ecografía de las próximas semanas, ese parpadeo gris será la primera foto oficial de tu existencia."
      ],
      sig: "s07"
    },

    /* ── semana 7 · CRISIS: sangrado ────────────────────── */
    {
      id: "s07", sem: 7, temp: "Primer trimestre",
      lugar: "El cuarto · jueves, madrugada",
      titulo: "Rosa en el calzón",
      eco: [
        "Madrugada de jueves. {mama} despierta con un calor raro y va al baño sin encender la luz, por costumbre. Y ahí, con la primera claridad gris, lo ve: manchas rosadas. Pocas, pero presentes. Sangrado en semana siete es una frase que congela la sangre de cualquier mujer con dos rayitas detrás.",
        "Despierta a {papa} con la mano en el hombro. Ninguno dice la palabra que están pensando. El cerro duerme; bajar a la posta de emergencia significa despertar al mundo, mototaxi en la neblina, y esperar horas bajo un foco fluorescente."
      ],
      opciones: [
        {
          t: "Reposo absoluto: cama, piernas arriba, y mañana temprano a la posta.",
          ef: { salud: 5, vinculo: 3 }, fl: ["reposo"],
          nota: "No duermen casi nada: ella acostada con una toalla, él despierto mirando el techo y contando latidos imaginarios. Al amanecer el manchado ha menguado. En la posta, la obstetra confirma: «amenaza de aborto. Reposo, agua, y volvemos a ver. El cuello sigue cerrado — eso es buena señal».",
          recuerdo: "Hubo una noche rosa y una cama inclinada. Yo me quedé. Decidí quedarme."
        },
        {
          t: "«Son solo manchitas»: ir a trabajar al bazar como todos los jueves.",
          ef: { salud: -8, vinculo: -3 }, fl: ["terca"],
          nota: "Trabaja ocho horas de pie, acomodando cajas y atendiendo con la sonrisa puesta. Al final del día, el manchado aumenta. La noche la pasa con una angustia nueva que no sabe nombrar. El cuerpo manda señales; ella las cobró en quincena.",
          recuerdo: "Cuando ella se obligaba, yo lo sentía. El cansancio ajeno también se hereda."
        },
        {
          t: "Llamar a doña Carmen, la comadre partera, que vive tres escaleras abajo.",
          req: {}, ef: { salud: 4, vinculo: 2 }, fl: ["comadres"],
          nota: "Doña Carmen sube en pantuflas con un termo y setenta años de experiencia. Toma pulsos, mira, huele el ambiente, y sentencia: «esto es manchado de implantación tardía, criatura. Agua de zarzaparrilla, cama, y a la posta mañana temprano igualito». Su seguridad vale como medicamento.",
          recuerdo: "Las manos viejas de doña Carmen me cuidaron sin tocarme. Hay medicina en la voz."
        }
      ],
      sig: "s08"
    },

    /* ── semana 8 · ECOGRAFÍA (minijuego eco) ───────────── */
    {
      id: "s08", sem: 8, temp: "Primer trimestre",
      tipo: "eco", semEco: 8,
      lugar: "Consultorio de ecografía · Hospital María Auxiliadora",
      titulo: "La pantalla gris",
      consigna: "Desliza el dedo sobre la pantalla para encontrarlos — como hacen los médicos con la sonda.",
      notaExito: "Y ahí, en el grano gris de la pantalla: un renuevo de 16 milímetros, con su latido parpadeando como una luciérnaga. «Ahí está», dice la técnica. Nadie en la sala puede hablar.",
      efExito: { vinculo: 8 },
      recuerdo: "Me vieron por primera vez en una pantalla gris. Medía una frambuesa y ya era protagonista.",
      eco: [
        "Referencia del puesto a María Auxiliadora: primera ecografía obstétrica. Tres horas de sala de espera en bancas metálicas entre ocho panzas y un televisor con programa de chismes. Vale la pena cada minuto.",
        "La técnica aplica gel frío sobre la panza apenas insinuada de {mama} y desliza la sonda. La pantalla muestra nieve gris. Todos contienen la respiración."
      ],
      sig: "s09"
    },

    /* ── semana 9 · brotes ──────────────────────────────── */
    {
      id: "s09", sem: 9, cp: true, temp: "Primer trimestre",
      lugar: "Útero · semana nueve",
      titulo: "Paletas y paletas",
      eco: [
        "De los costados del cuerpo brotan dos paletas —brazos futuros— y debajo otras dos —piernas—. En sus puntas aparecen surcos que se separarán en dedos. Ya hay codos que doblan, rodillas que ensayan su primer ángulo.",
        "La cabecita es enorme comparada con el resto: casi la mitad del cuerpo entero. Dentro, el cerebro fabrica neuronas al ritmo vertiginoso de cien por minuto. Cada minuto que pasa, eres más.",
        "Los párpados existen pero permanecen soldados. Las orejas toman forma en los costados de la cabeza, afinándose justo a tiempo para lo que viene después: voces, música, la radio de la combi."
      ],
      opciones: [
        {
          t: "{mama} combate las náuseas con limón, galletas de agua y paciencia.",
          ef: { salud: 3, desarrollo: 2 }, fl: ["nutricion"],
          nota: "Galleta de agua antes de levantarse —truco de doña Rosa de la bodega—, sorbos de limonada todo el día. Las náuseas no desaparecen pero bajan de volumen. Come poco y seguido: el cuerpo aprende el trato.",
          recuerdo: "Limonada eterna. Sé su sabor desde antes de tener lengua."
        },
        {
          t: "Probar con lo que dé antojo, aunque sea solo chicharrones y refresco.",
          ef: { salud: -3, desarrollo: 1 }, fl: ["antojos"],
          nota: "Un domingo de chicharrón con creole que subió y bajó en una hora. Los antojos mandan en la teoría, pero el cuerpo de semana nueve es un jurado severo. Se aprende con dolor de panza.",
          recuerdo: "El primer festín de mi vida duró sesenta minutos. Valió cada uno."
        }
      ],
      sig: "s10"
    },

    /* ── semana 10 · humo ajeno ─────────────────────────── */
    {
      id: "s10", sem: 10, temp: "Primer trimestre",
      lugar: "Obra en Surco · mediodía",
      titulo: "El humo de la obra",
      eco: [
        "Semana diez: dedos completamente separados, uñas comenzando. Todo está formado —absolutamente todo—; ahora el proyecto es crecer y afinar. Esta es la etapa en que el cuerpo copia lo que le dan: bueno, malo, humo.",
        "En la obra, el almuerzo de los operarios es rito sagrado: arroz con menestra del tupper y, después, el cigarro comunitario. {papa} fuma tres o cinco al día desde los diecisiete. Nunca lo pensó mucho; nadie piensa mucho lo que siempre hizo.",
        "Lo que nadie le dijo: el humo no se queda en los dedos de quien fuma. Sube en la ropa, se pega en el pelo, viaja en los abrazos. Los bebés de fumadores pasivos pesan menos al nacer, y nadie les preguntó su opinión."
      ],
      opciones: [
        {
          t: "{mama} lo confronta esa noche, con los folletos de la posta sobre la mesa.",
          req: { st: { vinculo: 52 } }, pista: "Requiere poder hablar de todo: vínculo 52",
          ef: { salud: 5, vinculo: 3 }, fl: ["sin-humo"],
          nota: "No es reclamo, es lectura en voz alta. {papa} escucha el dato del peso al nacer, mira su cigarrillo a medio terminar y hace algo muy masculino y muy difícil: lo aplasta contra el plato. «Bajando la dosis», corrige. Pero baja.",
          recuerdo: "Esa noche el aire de mi casa cambió de dueño. Respiré mejor sin saber que respiraba."
        },
        {
          t: "Decirle nada: «no quiero pelear por humo cuando hay cosas más graves».",
          ef: { salud: -4 }, fl: ["tabaco-pasivo"],
          nota: "Los abrazos siguen llegando con perfume de tabaco barato. Cada beso en la frente trae su nube privada. Ella decide que el amor tolera todo, incluso lo que daña. El humo se instala como un mueble más del cuarto.",
          recuerdo: "Hubo inviernos de humo callado. Me escondí detrás de mi propio corazón varias veces."
        },
        {
          t: "Proponer un trato: él fuma solo afuera, lejos del cuarto, y lo intenta dejar.",
          ef: { salud: 3, vinculo: 1 }, fl: ["trato-humo"],
          nota: "El trato funciona a medias: baja a dos diarios, siempre en la escalera, nunca en el cuarto. No es victoria total, pero el aire de casa mejora un treinta por ciento que se siente y se mide.",
          recuerdo: "Papá fumaba en las escaleras, hablando solo. Creo que ahí empezó a negociar con el destino."
        }
      ],
      sig: "s11"
    },

    /* ── semana 11 · CRISIS: fiebre y automedicación ────── */
    {
      id: "s11", sem: 11, temp: "Primer trimestre",
      lugar: "El cuarto · martes de garúa",
      titulo: "Treinta y nueve y medio",
      eco: [
        "Lunes amanece {mama} con escalofríos; el martes el termómetro marca 39.5. Gripe fuerte, de esas que doblan espinas. El cuerpo batalla mientras el embrión —ya con genitales definiendo su camino, ya con dientes germinando en las encías— escucha la guerra desde su burbuja tibia.",
        "Problema clásico de barrio: ¿qué se toma? En el botiquín del pasaje hay de todo: ibuprofeno del año pasado, unas pastillas grises sin etiqueta que regaló una vecina «para cualquier dolor», paracetamol de verdad.",
        "Lo que ningún folleto repite lo suficiente: el ibuprofeno en el embarazo puede cerrar conductos que el bebé necesita abiertos. Y las pastillas sin nombre son ruleta rusa farmacéutica."
      ],
      opciones: [
        {
          t: "Paracetamol común, suero casero, reposo y trapitos tibios.",
          ef: { salud: 4 }, fl: ["fiebre-bien"],
          nota: "La fiebre cede en treinta y seis horas. Sudor, agua de arroz con limón, y {papa} poniendo y sacando trapitos con la cara de enfermero novicio. El remedio abuelil era, esta vez, ciencia pura: hidratación y paciencia.",
          recuerdo: "La fiebre grande pasó sin dejarme cicatrices. Hubo trapos tibios y vigilancia."
        },
        {
          t: "Ibuprofeno: «es el mismo de siempre, este sí me conoce».",
          ef: { salud: -9, desarrollo: -3 }, fl: ["ibuprofeno"],
          nota: "La fiebre baja rápido —demasiado rápido, con ayuda química equivocada—. Nadie nota nada ese día ni el siguiente. Pero en la tabla del desarrollo quedó una línea roja pequeña: los vasos del bebé registraron el error. Algunas facturas se pagan en silencio.",
          recuerdo: "Hubo un medicamento traicionero. Mi cuerpo lo archivó aunque nadie supiera."
        },
        {
          t: "Volver a la posta aunque toque madrugada y fila: mejor preguntar.",
          req: { fl: ["comadres"] }, pista: "Requiere red de comadres: alguien vigila y acompaña",
          ef: { salud: 5, vinculo: 2 }, fl: ["posta-a-tiempo"],
          nota: "Doña Carmen la acompaña a las cinco de la mañana. Paracetamol recetado, control de los latidos —que suenan fuertes, gracias— y un dato nuevo: «Con gripe así, criatura, usted no carga baldes ni sube corriendo el cerro. Su cuerpo está construyendo un edificio».",
          recuerdo: "Cuando hubo fiebre, el barrio entero se organizó alrededor mío sin hacer ruido."
        }
      ],
      sig: "s12"
    },

    /* ── semana 12 · CONTROL + apodo ────────────────────── */
    {
      id: "s12", sem: 12, temp: "Primer trimestre",
      tipo: "control",
      lugar: "Posta · fin del primer trimestre",
      titulo: "Fin de la primera parte",
      eco: [
        "Control trimestral. La licenciada Huamán revisa la cartilla: presión bien, peso justo, latidos fuertes. Mide la panza con cinta métrica flexible y anota con letra de maestra.",
        "«Ya entró al segundo trimestre, mamá. Las náuseas se van a ir solas. Ahora viene lo bonito: pronto siente movimientos». Afuera, la garúa de octubre hace brillar las escaleras del cerro. Arriba, en el cuarto, esperan los últimos tres meses de triplay pintado de blanco.",
        "El embrión ha dejado de serlo: desde esta semana se llama oficialmente feto, palabra latina que significa hijo o cría. Ya tienes nombre técnico. Falta el otro nombre: el de la calle, el íntimo, el que se usa antes del verdadero."
      ],
      vozDesde: 15,
      voz: ["Doce semanas y ya soy oficialmente un feto. Suena a cosa de museo. Prefiero el nombre que estén a punto de elegirme."],
      opciones: [
        {
          t: "Apodarte «Semillita»: porque empezaste siendo una semilla de amapola.",
          nombres: { bebe: "Semillita" }, ef: { vinculo: 3, conciencia: 2 },
          nota: "Queda dicho en voz alta sobre la mesa de la posta y queda sellado. Semillita: lo gritará {papa} entrando del trabajo, lo susurrará {mama} a la panza antes de dormir."
        },
        {
          t: "Apodarte «Copito»: por la garúa que cayó la noche que llegaste.",
          nombres: { bebe: "Copito" }, ef: { vinculo: 3, conciencia: 2 },
          nota: "«Copito», como la nieve que Lima casi nunca tiene. Un apodo de invierno para un niño de primavera."
        },
        {
          t: "Apodarte «Chispita»: por la luz que parpadeó en la ecografía.",
          nombres: { bebe: "Chispita" }, ef: { vinculo: 3, conciencia: 3 },
          nota: "«Chispita», por aquella luciérnaga gris de la pantalla. El apodo más eléctrico del catálogo disponible."
        },
        {
          t: "Sin apodo: esperar al nombre real, sin inventar intermediarios.",
          ef: { conciencia: 1 },
          nota: "Decisión respetuosa y algo fría: el bebé será «el bebé» hasta el final. A veces el misterio también es una forma de cariño. O de pereza. El tiempo dirá."
        }
      ],
      alEntrar: function () {
        return [];
      },
      diario: {
        fecha: "octubre, control del tercer mes",
        texto: "Ya lo llaman feto. Qué fea palabra para algo tan lindo. Nos dio la fecha probable: mediados de mayo. Yo le hablo a la panza cuando nadie ve, cosas sin sentido, y juro que se me acomoda algo adentro, como si escuchara. Puede ser gas. No importa.",
        autor: "{mama}"
      },
      sig: "t2s13"
    }
  ]);
})();
