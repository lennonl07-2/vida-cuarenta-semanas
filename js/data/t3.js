/* ════════════════════════════════════════════════════════════
   VIDA · tercer trimestre
   semanas 28 a 40: engordar, afinar pulmones, prepararse.
   La recta final donde cada decisión pesa el doble.
   ════════════════════════════════════════════════════════════ */
(function () {
  const V = window.VIDA.motor;

  V.registrar([

    /* ── semana 28 ──────────────────────────────────────── */
    {
      id: "t3s28", sem: 28, cp: true, temp: "Tercer trimestre",
      lugar: "Útero · semana veintiocho",
      titulo: "El crecimiento se pone serio",
      eco: [
        "Tercer trimestre. El plan cambia de prioridad: los órganos ya están formados y funcionando en versión beta; ahora todo el presupuesto va a dos cosas — grasa bajo la piel y cerebro a full.",
        "El cerebro desarrolla surcos y circunvoluciones a velocidad récord: se está doblando sobre sí mismo para meter más hardware en poco espacio. Pesa ya unos mil gramos entero, y un buen porcentaje es cabeza. Literalmente: tu cabeza es un tercio de ti.",
        "{mama} tiene hambre constante y legítima: su cuerpo fabrica un humano a razón de veinte gramos diarios. Es, técnicamente, la etapa más cara del metabolismo materno."
      ],
      opciones: [
        {
          t: "Comer bien de verdad: proteína diaria, huevos, menestras aunque aburran.",
          ef: { salud: 4, desarrollo: 4 }, fl: ["nutricion-final"],
          nota: "Huevo cocido en el desayuno, pallares en el almuerzo, leche —la de lata, hecha espesa— antes de dormir. Los kilos suben donde deben: panza sí, piernas lo justo. El edificio recibe materiales de primera.",
          recuerdo: "Veinte gramos diarios de mí. Cada uno venía de una olla ajena que cuidé."
        },
        {
          t: "Comer lo que haya: el hambre manda, la nutrición puede esperar.",
          ef: { salud: -3 }, fl: ["hambre-libre"],
          nota: "Pan con palta cuando hay; solo pan cuando no. Las ganas de dulce ganan las tardes. El bebé roba sus nutrientes igual —los fetos son acreedores implacables— pero el cuerpo materno empieza a mostrar la factura: uñas frágiles, pelo cayendo, sueño infinito.",
          recuerdo: "Comí de lo que hubo. Salí flaco pero listo, dicen los genes compensan."
        }
      ],
      sig: "t3s29"
    },

    /* ── semana 29 · glucosa ────────────────────────────── */
    {
      id: "t3s29", sem: 29, temp: "Tercer trimestre",
      lugar: "Laboratorio · prueba de tolerancia",
      titulo: "El trago dulce",
      eco: [
        "Prueba de tolerancia glucosada: ayunar doce horas, beber en cinco minutos un vaso de agua con setenta y cinco gramos de glucosa —sabe a gaseosa plana mezclada con culpa— y esperar una hora para la extracción.",
        "Resultado: 138. Límite: 139. Pasaste por UN punto. La obstetra subraya el número dos veces. «Pasó raspando, mamá. Pero raspando pasó. Ahora: menos azúcar, más caminata. Si esto sube, hablamos de diabetes gestacional y ahí la cosa cambia»."
      ],
      opciones: [
        {
          t: "Tomarlo en serio: adiós refresco, caminata diaria por el circuito del cerro.",
          ef: { salud: 5, vinculo: 1 }, fl: ["glucosa-bien"],
          nota: "El refresco de tres litros semanal muere en paz. En su lugar: agua con limón y una caminata de media hora todas las tardes bajando y subiendo escaleras con {papa}, que ahora «acompaña» porque desconfía dejarla sola en las pendientes.",
          recuerdo: "Gané por un punto. Después de eso, mi familia entera caminó el cerro como si me cobraran peaje."
        },
        {
          t: "«Raspando pasó»: seguir igual, el cuerpo sabe defenderse.",
          ef: { salud: -4 }, fl: ["glucosa-al-limite"],
          nota: "Un punto es nada; el refresco sigue; las caminatas esperan mejores tiempos. La glucosa ronda el borde sin cruzarlo, como borracho junto al precipicio. Nadie cae esta vez. El precipicio, eso sí, queda registrado en la cartilla.",
          recuerdo: "Vivimos al borde durante semanas. Por algo empezaron llamándome Chispita… o no."
        }
      ],
      sig: "t3s30"
    },

    /* ── semana 30 · luz ────────────────────────────────── */
    {
      id: "t3s30", sem: 30, temp: "Tercer trimestre",
      lugar: "Útero · semana treinta",
      titulo: "Hay luz allá afuera",
      eco: [
        "Tus párpados abiertos registran ahora algo nuevo: luz real. Cuando el sol de septiembre pega directo en la panza, tu mundo penumbroso se tiñe de rojo brillante —la luz atraviesa piel y tejido como linterna tras la mano—.",
        "Ya parpadeas ante el resplandor. Ya te giras hacia él, o lejos, según humor. Tus ojos azules-grisáceos de todos los bebés —el color definitivo tardará meses en decidirse— ensayan su futuro oficio.",
        "Afuera, septiembre trae los primeros días calurosos. La azotea comunal, esa losa de arriba donde nadie vive pero todos usan, espera con su vista al Pacífico."
      ],
      opciones: [
        {
          t: "Subir a la azotea cada tarde: sol en la panza, vista al mar, conversación.",
          ef: { salud: 3, vinculo: 4, conciencia: 2 }, fl: ["sol-tarde"],
          nota: "Cuatro de la tarde, dos sillas plásticas en la azotea, el sol castigando de frente. {mama} descubre que tú te mueves más cuando la luz da en la panza —juego nuevo—. Abajo, la ciudad gris; arriba, dos personas tomando vitamina D y aire de futuro.",
          recuerdo: "El sol entraba por la pared de mamá y yo le seguía la corriente: era nuestro juego privado de persecución."
        },
        {
          t: "Quedarse adentro: el cuarto es pequeño pero conocido.",
          ef: { conciencia: 1 },
          nota: "Las paredes de triplay filtran el sol en rectángulos pálidos que se mueven por el piso durante el día. Es tu única experiencia de sombra y claridad. Suficiente, aunque la azotea estaba ahí, gratis, esperando.",
          recuerdo: "Conocí el mundo primero como rectángulos de luz moviéndose en el piso. Todavía me gustan los pisos soleados."
        }
      ],
      vozDesde: 88,
      voz: ["Puedo distinguir la luz del no-luz. Es mi primer criterio estético. Todo lo demás vendrá después: colores, caras, la neblina. Empecé bien."],
      sig: "t3s31"
    },

    /* ── semana 31 · presión alta (CRÍTICA condicional) ─── */
    {
      id: "t3s31", sem: 31, temp: "Tercer trimestre",
      lugar: "Posta · control urgente",
      titulo: "Ciento cuarenta sobre noventa",
      eco: [
        "Control de las treinta y una. El brazalete aprieta, la aguja sube, y la licenciada Huamán frunce el ceño por segunda vez en la historia de sus controles: 140/90. Presión alta. No catastrófica, pero en semana treinta y uno, la palabra que asusta es preeclampsia, y esa palabra empieza exactamente así.",
        "«¿Dolores de cabeza? ¿Manchas al mirar? ¿Hinchazón rara en manos y cara?». {mama} repasa: un dolor leve de sien esta semana, sí. Anillos apretados, sí. El cuerpo ha estado mandando correos que ella leyó como spam."
      ],
      alEntrar: function (estado) {
        const riesgo = (estado.flags["ansiedad-medica"] ? 1 : 0) +
          (estado.flags["humo-basural"] || estado.flags["tabaco-pasivo"] ? 1 : 0) +
          (estado.flags["anemia"] ? 1 : 0);
        if (riesgo >= 2) estado.flags["preeclampsia-riesgo"] = true;
        return [];
      },
      opciones: [
        {
          t: "Protocolo estricto: reposo relativo, menos sal, control de presión dos veces por semana.",
          ef: { salud: 6 }, fl: ["presion-controlada"], sinFl: ["preeclampsia-riesgo"],
          nota: "Guerra total a la sal: adiós snack, adiós conservas, sopa desalinizada que protesta el paladar. Reposo con piernas altas mientras mira novelas. Dos semanas después: 120/80. La amenaza se retira murmurando.",
          recuerdo: "Hubo un número peligroso que mi familia bajó a fuerza de comida sosa. La sal nunca fue tan importante."
        },
        {
          t: "Internamiento breve en observación: mejor vigilar desde adentro.",
          req: { fl: ["preeclampsia-riesgo"] }, pista: "Tu cuerpo acumuló demasiadas señales: hay que observarte",
          ef: { salud: 4, vinculo: -1 }, fl: ["internada"],
          nota: "Dos días en sala de observación con monitores pitando cada hora. {papa} duerme en la banca del pasillo —nadie lo logra sacar—. La presión cede a cifras decentes y la dan de alta con tres recetas y una advertencia tallada en piedra: reposo, reposo, reposo.",
          recuerdo: "Nací de una sala donde pitaban máquinas y un hombre dormía sentado en el pasillo por mí. Lo sé. Lo sé todo."
        },
        {
          t: "Minimizar: «es el calor, siempre me sube con calor», volver en dos semanas.",
          ef: { salud: -8, desarrollo: -2 }, fl: ["preeclampsia-negada"],
          nota: "Dos semanas de «estoy bien» dichas con la convicción de quien no está bien. La presión juega en 140-150, la hinchazón avanza de pies a tobillos, y el flujo placentario —eso nadie lo ve— trabaja con la manguera medio tapada. Tu crecimiento entra en cámara lenta silenciosa.",
          recuerdo: "La manguera de mi vida estuvo medio cerrada un mes. Crecí igual. Delgado, pero crecí."
        }
      ],
      sig: "t3s32"
    },

    /* ── semana 32 · curso de preparación ───────────────── */
    {
      id: "t3s32", sem: 32, cp: true, temp: "Tercer trimestre",
      lugar: "Sala comunal de la posta · sábados",
      titulo: "Cómo se nace",
      eco: [
        "La posta organiza curso de preparación para el parto: cuatro sábados con obstetra, mate de hierbas y ocho parejas nerviosas en sillas plásticas. Temario: señales de trabajo de parto, respiración, cuándo ir al hospital, qué llevar.",
        "{papa} toma notas en una libreta de obra, con lápiz de carpintero. Es el único hombre de la sala que escribe. La obstetra lo nota y lo usa de demostración en todos los ejercicios."
      ],
      opciones: [
        {
          t: "Ir los cuatro sábados: aprender respiración, escribir un plan de parto.",
          req: { st: { vinculo: 55 } }, pista: "Requiere que vayan juntos de la mano: vínculo 55",
          ef: { salud: 3, vinculo: 5, conciencia: 2 }, fl: ["curso", "plan-de-parto"],
          nota: "Respiración de perrito y respiración de tren, practicada en el cuarto hasta que el vecino golpea la pared. Y el plan de parto escrito en papel bond doblado en cuatro: quién acompaña, contacto de emergencia, preferencia de lactancia, nombre tentativo firmado por ambos. Papel chico; poder enorme.",
          recuerdo: "Vi mi propio plan de instrucciones doblado en cuatro. Existía en papel antes que en carne. Qué honor."
        },
        {
          t: "Solo el último sábado, el importante: señales de alarma y cuándo correr.",
          ef: { salud: 2 }, fl: ["curso-corto"],
          nota: "Un sábado exprés que deja lo esencial: contracciones cada cinco minutos = ir; bolsa rota = ir YA; sangrado = correr. Lo básico sobrevive. La respiración se improvisará en vivo, como siempre se hizo.",
          recuerdo: "Mis padres sabían tres reglas y ninguna canción de respiración. Sobrevivimos igual. Los humanos somos así."
        }
      ],
      sig: "s32b"
    },

    /* ── s32b · QUIZ: señales de alarma ─────────────────── */
    {
      id: "s32b", sem: 32, temp: "Tercer trimestre",
      tipo: "quiz", flExito: "senales-alarma",
      tituloQuiz: "examen exprés · señales de alarma",
      lugar: "Sala comunal · el examen de salida",
      titulo: "¿Cuándo se corre?",
      consigna: "La obstetra hace un examen sorpresa antes de irse. Tres preguntas. Contéstenlas como si fuera de madrugada y valiera una vida — porque puede ser así.",
      notaExito: "Tres de tres. La obstetra firma la cartilla con doble subrayado: «Esta pareja va a estar bien». Saber cuándo correr es, en el parto, la mitad del camino.",
      recuerdoExito: "Las tres señales de alarma quedaron grabadas más hondo que cualquier canción.",
      eco: [
        "Antes de retirarse, la obstetra deja el cuaderno sobre la mesa con cara de examen final. La sala entera se queda quieta. Esto no va con notas: va con madrugadas."
      ],
      preguntas: [
        {
          p: "Son las 3 a.m. y {mama} siente contracciones cada 5 minutos, regulares, hace una hora. ¿Qué toca hacer?",
          opciones: [
            "Tomar agua, dormir y ver si amaneciendo pasa",
            "Ir al hospital o a la posta ahora mismo",
            "Esperar a que sean cada 15 minutos para confirmar"
          ],
          correcta: 1,
          porQue: "Contracciones regulares cada 5 minutos durante una hora = trabajo de parto probable. A esa altura, se sale de casa, no se espera el amanecer."
        },
        {
          p: "{mama} despierta mojada — un chorro claro que sigue goteando al cambiar de posición. ¿Es urgencia?",
          opciones: [
            "Sí: rotura de bolsa. Hay que ir aunque no haya contracciones",
            "No: seguro fue orina; los bebés aprietan la vejiga",
            "Solo si el líquido huele mal"
          ],
          correcta: 0,
          porQue: "Líquido claro que gotea al moverse es bolsa rota hasta que se demuestre lo contrario. Después de la rotura, el reloj corre: infección es el riesgo, no las contracciones."
        },
        {
          p: "En el tercer trimestre {mama} tiene dolor de cabeza fuerte, manchas al mirar y las manos hinchadas. ¿Qué significa?",
          opciones: [
            "Cansancio normal del final del embarazo",
            "Hambre: hay que comer algo salado",
            "Señal posible de preeclampsia: control YA"
          ],
          correcta: 2,
          porQue: "Dolor de cabeza + manchas visuales + hinchazón de cara y manos es el trío clásico de la preeclampsia. Es la emergencia silenciosa del embarazo: no duele como una caída, pero urge igual."
        }
      ],
      sig: "t3s33"
    },

    /* ── semana 33 · LA LATA (decisión económica final) ─── */
    {
      id: "t3s33", sem: 33, temp: "Tercer trimestre",
      lugar: "El cuarto · noche de cuentas",
      titulo: "Abrir la lata",
      eco: [
        "Cuentas sobre el colchón: el trabajo de mototaxi termina cuando el primo necesita su moto de vuelta. Quedan seis semanas para la fecha probable, y el fondo común suma: ciento cuarenta soles entre sobre y quincenas.",
        "Y debajo de la cama, si existe, la lata clavada desde julio del año pasado: PARA CUANDO LLEGUE. Pesada. Intocable durante ocho meses. Nadie la ha contado nunca en voz alta."
      ],
      alEntrar: function (estado) {
        return estado.flags["lata"]
          ? []
          : ["No hay lata bajo esta cama —aquella noche se decidió vivir el presente—. Solo el sobre del colchón y la matemática simple de la escasez."];
      },
      opciones: [
        {
          t: "Contar la lata: abrirlo todo, contar monedas hasta el amanecer.",
          req: { fl: ["lata"] }, pista: "",
          ef: { vinculo: 5, conciencia: 3 }, fl: ["lata-abierta"],
          nota: "Seiscientos veinte soles y ochenta céntimos. Contados dos veces, gritados una. Seiscientos veinte soles de propinas, vueltas de mercado, monedas de mototaxi guardadas con pinza durante ocho meses. Es un parto completo en una posta privada. Es dignidad metálica.",
          recuerdo: "Ochenta céntimos de más en mi lata. Mi fortuna inicial: seiscientos soles veinte y ocho. Recuérdalo cuando alguien diga que no se puede."
        },
        {
          t: "Romper el sobre del colchón y pedir adelanto en la bazar donde trabajó {mama}.",
          sinFl: ["lata-abierta"],
          ef: { salud: -1, vinculo: 2 }, fl: ["adelanto"],
          nota: "Ciento cincuenta del sobre más cien de adelanto prometido contra futuras jornadas. Justo, justo para llegar. La matemática de la escasez cierra por cuatro centímetros, como los zapatos comprados pensando en crecer.",
          recuerdo: "Llegamos con lo justo y lo justo alcanzó. Hay magia en la aritmética desesperada que funciona."
        }
      ],
      sig: "t3s34"
    },

    /* ── semana 34 · hipo ───────────────────────────────── */
    {
      id: "t3s34", sem: 34, temp: "Tercer trimestre",
      lugar: "Útero · semana treinta y cuatro",
      titulo: "Hip, hip, hip",
      eco: [
        "Nuevo fenómeno esta semana: hipo fetal. Ritmo perfecto, regular como metrónomo: hip, hip, hip, cada dos segundos, diez minutos seguidos. La panza entera salta en compás.",
        "Es el diafragma ensayando su función de respiración con líquido en vez de aire. Un entrenamiento absurdo y adorable: practicas el aire que no tienes, dentro del agua donde no te ahogas.",
        "{mama} ya distingue el hipo de las patadas. «Está con hipo otra vez», anuncia con la autoridad de quien traduce un idioma extranjero. {papa} pone la mano y confirma: hip, hip, hip. Familia completa presente en el concierto."
      ],
      opciones: [
        {
          t: "Registrarlo todo: foto de panza saltarina, video, entrada nueva en el diario.",
          ef: { vinculo: 4, conciencia: 2 }, fl: ["archivo"],
          nota: "El celular guarda tres videos de la panza bailando en ritmo de hipo. En el diario, {mama} dibuja —con mala mano— un óvalo con líneas de movimiento. Documentación completa de un fenómeno que ningún médico considera importante y toda madre considera histórica.",
          recuerdo: "Mi hipo quedó filmado. Existen pruebas audiovisuales de que yo ya era espectáculo antes de ser persona pública."
        },
        {
          t: "Disfrutarlo en directo, sin cámaras: algunos momentos son para memoria pura.",
          ef: { vinculo: 3, conciencia: 3 },
          nota: "Sin celulares esta vez: solo tres personas —dos afuera, una adentro— compartiendo un metrónomo biológico en la penumbra del cuarto. Diez minutos de hip, hip, hip y risas contenidas. Nada que mostrar; todo que sentir.",
          recuerdo: "Prefiero los recuerdos sin evidencia. Son los únicos que nadie puede robarnos."
        }
      ],
      vozDesde: 50,
      voz: ["El hipo es ridículo y magnífico. Practico respirar aire que no existe. Ustedes también hacen cosas absurdas, no me vengan con caras."],
      sig: "t3s35"
    },

    /* ── semana 35 · posición ───────────────────────────── */
    {
      id: "t3s35", sem: 35, temp: "Tercer trimestre",
      lugar: "Ecografía de presentación · viernes",
      titulo: "Sentado en la salida",
      eco: [
        "Ecografía de presentación, la que define logística: ¿de qué manera va a salir este bebé al mundo?",
        "Respuesta incómoda: transverso. Estás acostado atravesado como un durmiente en combi, con la cabecita hacia el costado izquierdo y los pies en el otro. La salida está detrás de tu espalda. Logísticamente, es como querer sacar un sofá por la ventana equivocada.",
        "Todavía hay tiempo —cinco semanas para girar—, pero el reloj ya hace ruido."
      ],
      opciones: [
        {
          t: "Ejercicios de posición: postura de gata, pelvis elevada, linterna cerca del pubis.",
          ef: { salud: 4, desarrollo: 2 }, fl: ["girado"], sinFl: ["transverso-final"],
          nota: "Cuatro veces al día: a cuatro patas balanceándose como gata vieja, caderas en alto sobre almohadas, y de noche una linterna encendida cerca del pubis —teoría popular: te giras hacia la luz—. Ciencia dudosa, resultados reales: en la próxima ecografía, cabeza abajo como mandan los manuales.",
          recuerdo: "Me sedujeron con una linterna. Funcionó. Desde entonces confío en las luces que aparecen en momentos oscuros."
        },
        {
          t: "Esperar tranquila: «los bebés giran solos, el mío no será la excepción rara».",
          ef: { salud: -2, conciencia: 1 }, fl: ["transverso-final"],
          nota: "Fe en la naturaleza, que casi siempre justifica. Pero esta vez la naturaleza llega tarde: en la semana 38, sigues atravesado, cómodo, dueño absoluto de tu orientación imposible. La palabra cesárea entra oficialmente al vocabulario familiar.",
          recuerdo: "Yo elegí mi posición y no negocié. Primera decisión autónoma de mi vida: nacer de lado, por donde me diera la gana. Bueno, por donde me dejara el médico."
        }
      ],
      vozDesde: 70,
      voz: ["Transverso. Así me llaman ahora. Suena a apellido de general. Yo solo estaba cómodo, nadie preguntó mi comodidad."],
      sig: "t3s36"
    },

    /* ── semana 36 · pulmones y miedo ───────────────────── */
    {
      id: "t3s36", sem: 36, cp: true, temp: "Tercer trimestre",
      lugar: "El cuarto · conversación de medianoche",
      titulo: "Los pulmones terminan su tarea",
      eco: [
        "Semana treinta y seis: los alvéolos pulmonares completan su maduración y el cuerpo empieza a producir surfactante a full —esa sustancia jabonosa que evita que tus pulmonitos se peguen al vaciarse—. Si nacieras hoy, tus pulmones responderían. Antes de esta semana, era ruleta.",
        "Medianoche. {mama} no duerme; {papa} tampoco. En la oscuridad del cuarto de triplay, la conversación que llevaban semanas posponiendo sale entera:",
        "«¿Y si algo sale mal?» — dice ella al techo. — «Saldrá bien». — «Pero ¿y si no?». Silencio largo. — «Entonces estoy al lado tuyo y eso no cambia». Es la respuesta correcta. Es, probablemente, la única."
      ],
      opciones: [
        {
          t: "Nombrar todos los miedos en voz alta, juntos, hasta que se achiquen.",
          ef: { vinculo: 6, conciencia: 3 }, fl: ["miedos-dichos"],
          nota: "Dos de la mañana: lista completa. El miedo al dolor, al hospital, al dinero, a no saber qué hacer con algo tan pequeño, al «¿y si soy malos padres?». Dichos todos, medidos, resultan más chicos dichos que callados. Duermen abrazados a las tres, por primera vez en semanas, sin insomnio.",
          recuerdo: "Escuché los miedos de mis padres a las dos de la mañana y los vi achicarse de a poquito. Lección vital: los monstruos menguan cuando se describen."
        },
        {
          t: "Cambiar de tema: hablar del futuro bonito, nombres, la primera navidad.",
          ef: { vinculo: 3 }, fl: ["futuro-bonito"],
          nota: "Optimismo organizado: cómo será diciembre, qué harán con el primer sueldo estable, si el bebé tendrá los ojos de uno o de otro. La conversación feliz funciona como cortina: no elimina el miedo pero lo manda a dormir. A veces basta.",
          recuerdo: "Planearon mi primera navidad antes de conocerme. Me asignaron expectativas festivas. Cumpliré."
        }
      ],
      sig: "t3s37"
    },

    /* ── semana 37 · AMENAZA DE PARTO PREMATURO ─────────── */
    {
      id: "t3s37", sem: 37, temp: "Tercer trimestre",
      lugar: "Emergencia de María Auxiliadora · madrugada del domingo",
      titulo: "Contracciones que no negocian",
      eco: [
        "Domingo a la madrugada: {mama} despierta con algo nuevo. No son los Braxton Hicks blandos de siempre —esas prácticas de ensueño—: esto duele de verdad, es regular, y viene cada siete minutos con precisión de relojero malévolo.",
        "Treinta y siete semanas: término temprano. No sería un bebé prematuro extremo, pero tampoco estaría listo: los últimos kilos, la grasa cerebral, el surfactante extra, todo falta. En emergencia, el monitor confirma: contracciones efectivas, cuello algo borroso. Amenaza de parto pretérmino.",
        "El protocolo existe y es claro: corticoides para acelerar los pulmones del bebé por si acaso, hidratación intensiva, reposo absoluto, y ver si la tormenta se calma."
      ],
      opciones: [
        {
          t: "Hospitalización 48 horas: corticoides completos, monitoreo continuo.",
          ef: { salud: 7 }, fl: ["prematuro-frenado"],
          nota: "Cuarenta y ocho horas de cama de hospital, suero en el brazo, inyecciones profundas en el músculo que arden como brasa —pero que son, literalmente, pulmones de regalo para ti—. Las contracciones se cansan antes que la paciencia y se van. Alta el martes con la orden más difícil del mundo: reposo absoluto hasta la fecha.",
          recuerdo: "Recibí dos inyecciones prestadas que maduraron mis pulmones. Deuda médica pagada por mi madre con el músculo. Gracias, ciencia."
        },
        {
          t: "Tratamiento ambulatorio: pastillas y casa, con la posta a diez minutos.",
          ef: { salud: 2 }, fl: ["prematuro-vigilado"],
          nota: "Pastilla cada seis horas, cama en casa, termómetro y libreta de horarios: anotar cada contracción como contabilidad del miedo. La mayoría de días pasan sin incidente; alguno con sustos que se calman cambiando de posición. La fecha probable se defiende con uñas.",
          recuerdo: "Mi llegada estuvo en venta de última minuto durante tres semanas. No me compraron. Aguanté."
        },
        {
          t: "«Será Braxton Hicks»: aguantar en casa y ver si pasa solo.",
          ef: { salud: -9 }, fl: ["prematuro"],
          nota: "Doce horas de «ya va a pasar» mientras las contracciones avanzan de cada siete a cada cinco minutos. Llegan al hospital cuando el cuello ya se borró del todo y el parto es irreversible a las 37 exactas. Nacerás antes de tiempo, con pulmones que corrieron la carrera sin el calentamiento completo. La UCIN espera en el guion.",
          recuerdo: "Llegué antes de la función. Los telones todavía no estaban listos. Aprendí a nacer apurado: me sirvió para toda la vida."
        }
      ],
      sig: "t3s38"
    },

    /* ── semana 38 · MALETA (minijuego) ─────────────────── */
    {
      id: "t3s38", sem: 38, temp: "Tercer trimestre",
      tipo: "maleta",
      lugar: "El cuarto · domingo de preparativos",
      titulo: "La maleta del parto",
      consigna: "La bolsa del parto espera junto a la puerta. Elijan seis objetos — los correctos pesan menos y valen más.",
      eco: [
        "Treinta y ocho semanas: término completo oficial. Podría llegar cualquier día, cualquier hora. El cuerpo de {mama} anda en modo alerta permanente; el bebé —tú— pesas cerca de tres kilos y ocupas todo el espacio disponible de tu estudio de un ambiente.",
        "Hoy toca el rito universal del octavo mes: preparar la maleta del parto. Sobre el colchón, el inventario posible de una vida. Elegir bien significa no depender de nadie a las tres de la mañana."
      ],
      objetos: [
        { t: "Documentos y cartilla prenatal", ok: true },
        { t: "Camisones abiertos al frente", ok: true },
        { t: "Pañales etapa recién nacido", ok: true },
        { t: "Manta y gorrito para el bebé", ok: true },
        { t: "Cargador de celular", ok: true },
        { t: "Toalla grande y jabón", ok: true },
        { t: "Zapatillas de taco alto", ok: false },
        { t: "Colección de novelas en DVD", ok: false },
        { t: "Bicicleta estática", ok: false }
      ],
      sig: "t3s39"
    },

    /* ── semana 39 · ROTURA EN LA COMBI ─────────────────── */
    {
      id: "t3s39", sem: 39, temp: "Tercer trimestre",
      lugar: "Combi de la línea verde · martes 5:40 a.m.",
      titulo: "La fuente se rompe en la combi",
      eco: [
        "Martes, cinco cuarenta de la madrugada. {mama} siente el chorro caliente y abundante en mitad de la combi, entre un señor que duerme y una señora con caja de pollo. No hay duda posible: es la bolsa. Cuatro semanas antes de fecha, pero las bolsas no consultan calendarios.",
        "«Mi esposa está de parto», anuncia {papa} al chofer con una autoridad que jamás tuvo en su vida. La combi entera se activa como colmena: la señora del pollo ofrece toallas sanitarias nuevas, el que duerme despierta de golpe y grita al chofer que meta primera.",
        "Problema en la Panamericana: una manifestación de transportistas cerró el carril. Buzo lleno, bocinas, humo. El hospital queda a veinte minutos; la posta de Pamplona Alta a ocho; y doña Carmen, la comadre partera, vive a tres escaleras del cuarto."
      ],
      opciones: [
        {
          t: "Hospital María Auxiliadora, aunque tarde: parto es asunto de especialistas.",
          ef: { vinculo: 2 }, fl: ["destino-hospital"],
          nota: "Cuarenta minutos entre buzones y desvíos, con las contracciones ya cada tres minutos y la combi convertida en ambulancia solidaria. Llegan con la fuente rota desde hace una hora: antibiótico preventivo por la rotura prolongada, sala de partos directa. Todo controlado, nada sencillo.",
          recuerdo: "Llegué al mundo después de un viaje en combi con toallas de solidaridad ajena. Soy hijo del transporte público peruano y de su gente."
        },
        {
          t: "Posta de Pamplona Alta: cerca, conocida, y de ahí derivan si complica.",
          ef: { salud: 2, vinculo: 2 }, fl: ["destino-posta"],
          nota: "Ocho minutos de combi, recepción conocida, la obstetra de guardia los reconoce de los controles. Rotura reciente, contracciones activas: la posta asume el parto con calma profesional y llama a María Auxiliadora por si acaso. El teléfono queda abierto toda la madrugada como cordón de seguridad.",
          recuerdo: "Nací en la posta de mi cerro, donde me hicieron los controles. Círculo cerrado, parto íntimo, barrio entero de partera."
        },
        {
          t: "Llamar a doña Carmen: mejor partera conocida que hospital desconocido.",
          req: { fl: ["comadres"] }, pista: "Requiere la confianza construida con la comadre",
          ef: { salud: -2, vinculo: 5, conciencia: 3 }, fl: ["parto-en-casa"],
          nota: "Mototaxi de vuelta al cerro —contrario a toda recomendación moderna, fiel a toda tradición ancestral—. Doña Carmen ya está despierta: «lo soñé anoche», dice, como si los sueños fueran radiotransmisores. Parto en el cuarto de triplay, velas improvisadas, agua hervida, setenta años de oficio. Funciona. Esta vez funciona.",
          recuerdo: "Nací donde fui hecho, con una anciana de pantuflas dirigiendo la orquesta. No recomiendo el método. Recomiendo la fe que lo sostuvo."
        }
      ],
      vozDesde: 0,
      voz: ["Se rompió la bolsa. Hace frío de pronto y el mundo aprieta. Ya casi, ¿no? Ya casi nos vemos. No sé tu cara y ya te quiero, testigo invisible."],
      sig: "sn39-taxi"
    },

    /* ── sn39 · ESCENA SONORA: la carrera final ─────────── */
    {
      id: "sn39-taxi", sem: 39, temp: "Tercer trimestre",
      tipo: "sonoro",
      lugar: "En movimiento · la madrugada más larga",
      titulo: "Primera, bocina, y a correr",
      consigna: "(escena sonora — el viaje que ninguna ambulancia habría contado mejor)",
      ambiente: ["calle"],
      dialogos: [
        { quien: "chofer", texto: "(a pleno pulmón, por el espejo) ¡Aguanten ahí adentro! ¡Esta combi ha llevado novios, muertos y una vez un chanchito vivo! ¡Un parto no me va a ganar!" },
        { quien: "papa", texto: "¡Respira conmigo! Como en el curso… soplá, soplá, soplá, ¡y larga! Sí. Así. Otra." },
        { quien: "mama", texto: "(entre contracción) El curso era los sábados… esto es un martes… ¡nadie avisó que los martes también cuentan!" },
        { quien: "vecina", texto: "(la señora del pollo, desde atrás) Joven, respire con la boca chica, como pajarito. Yo tuve nueve. Nueve. Esta combi huele a pollo asado pero yo veo futuro acá adentro." },
        { quien: "papa", texto: "(mirando el reloj del celular) Cuatro minutos la última… tres y medio esta… está acelerando." },
        { quien: "narrador", texto: "La madrugada pasa de largo por las ventanas: buzones cerrados, semáforos en amarillo dormido, el mar invisible a un costado. Adentro, entre olor a pollo y bocinas lejanas, alguien hace respiraciones de perrito mientras su madre cuenta en voz alta hasta que el dolor la deja." }
      ],
      golpes: [{ en: 0, sfx: "puerta" }],
      sig: "t3s40"
    },

    /* ── semana 40 · arranque del parto ─────────────────── */
    {
      id: "t3s40", sem: 40, temp: "Parto",
      lugar: "Donde sea que toque · la madrugada definitiva",
      titulo: "Cuarenta semanas",
      eco: [
        "Todo lo que vino después de aquella combi descompuesta en febrero llega ahora a este pasillo, esta madrugada, esta puerta.",
        "El trabajo de parto es una conversación entre dos cuerpos que ya no necesitan palabras: contracción, descanso, contracción, descanso. Dilatación contada en centímetros como quien cuenta kilómetros de viaje final.",
        "Y en algún momento de estas horas —nadie recordará exactamente cuál— el proceso se vuelve imparable. Ya no hay decisiones que importen más que una: acompañarse."
      ],
      vozDesde: 0,
      voz: ["Última página adentro. Escríbeme bien, ¿sí? Sea lo que venga, escríbeme bien."],
      sig: "parto-hub"
    }
  ]);
})();
