/* ════════════════════════════════════════════════════════════
   VIDA · prólogo
   febrero: el sol raro de Lima, un paradero, dos personas.
   ════════════════════════════════════════════════════════════ */
(function () {
  const V = window.VIDA.motor;

  V.registrar([

    /* ── p01 · el encuentro ─────────────────────────────── */
    {
      id: "p01", sem: 0, temp: "Prólogo",
      lugar: "Paradero de la Av. Los Héroes · verano",
      titulo: "El sol raro",
      eco: [
        "Febrero en Pamplona Alta. Un sol que no se acostumbra —en Lima el sol es visita— baña las escaleras del cerro y hace brillar las latas de los techos nuevos. Bajan mototaxis llenos de bolsas del mercado; sube la gente con garrafas y sillas plásticas.",
        "En el paradero de abajo, junto al óvalo, una combi vieja se recalienta y suelta humo amargo. Los pasajeros bajan murmurando. Entre ellos va {mama}, veintitrés años, una bolsa de estudio de enfermería colgada del hombro y prisa por llegar arriba antes del calor fuerte.",
        "Y está {papa}, veintiséis, que trabaja en una obra de Surco y que esta mañana cargaba cajas en la bodega de don Félix cuando decidió que el día le debía una pausa.",
        "Ninguno de los dos lo sabe todavía, pero este paradero cualquiera acaba de volverse el lugar más importante del mundo."
      ],
      opciones: [
        {
          t: "{mama} ayuda a empujar la combi mientras {papa} dirige a los demás.",
          ef: { vinculo: 4, salud: 1 }, fl: ["impulso"],
          nota: "Ella empuja metal; él grita instrucciones que nadie pide. Cuando la combi arranca, los dos quedan riéndose sin saber bien de qué.",
          recuerdo: "Una combi descompuesta fue el primer escenario. Yo nací de una carcajada."
        },
        {
          t: "Cada quien mira para otro lado. El barrio enseña a no meterse.",
          ef: { conciencia: 3 },
          nota: "Se cruzan tres veces las miradas y tres veces se apartan. La combi arranca sola, como si también tuviera prisa por dejarlos juntos en la misma acera.",
          recuerdo: "Al principio hubo distancia. Después, curiosidad. Es así como empieza casi todo."
        },
        {
          t: "{papa} ofrece cargar la caja pesada de doña Elvira; {mama} la acomoda en el asiento.",
          req: {},
          ef: { vinculo: 5 }, fl: ["gentileza"],
          nota: "Doña Elvira, que vende tamales los domingos, mira a uno, mira al otro, y dice bajito: «qué bonita pareja harían». Se pone todo el paradero rojo.",
          recuerdo: "Doña Elvira nos nombró antes de existir. Las palabras de las abuelas son profecías baratas y casi siempre aciertan."
        }
      ],
      diario: {
        fecha: "febrero, martes",
        texto: "Hoy hizo un sol de esos que obligan a perdonar el invierno. Ayudé a empujar una combi moribunda y un señor del cerro me dijo que tengo buena fuerza en los brazos. Le dije que cargo tanques de oxígeno en prácticas. Se llamó… bueno. Ya les contaré.",
        autor: "{mama}"
      },
      sig: "sn01-combi"
    },

    /* ── sn01 · ESCENA SONORA: la combi arranca ─────────── */
    {
      id: "sn01-combi", sem: 0, temp: "Prólogo",
      tipo: "sonoro",
      lugar: "El paradero · minutos después",
      titulo: "Suena el barrio",
      consigna: "(escena sonora — sube el volumen y escucha)",
      ambiente: ["calle"],
      dialogos: [
        { quien: "chofer", texto: "(golpeando el capó) ¡Ya está, ya está! Esta combi tiene más vida que un gato. ¡Suban que vamos!" },
        { quien: "papa", texto: "Oiga… disculpe. ¿Usted también baja en la subida de los Héroes? Le puedo ayudar con la bolsa." },
        { quien: "mama", texto: "(riendo bajito) La bolsa aguanta sola. Pero gracias. Eres el del empujón, ¿no? Se te veía desde acá, gritando como capataz." },
        { quien: "papa", texto: "Capataz no… vocalista. Si oye tres acordes raros algún día por el cerro, soy yo. Es mi único talento comprobado." },
        { quien: "vecina", texto: "(desde el asiento de atrás) Joven, si va a conversar, converse sentado, que esta combi baila. ¡Y ustedes dos parecen anuncio de refresco!" },
        { quien: "narrador", texto: "La combi arranca tosiendo. El barrio entero cabe en ese ruido: bocinas, vendedores, un radio con cumbia vieja. Y dos risas nuevas que todavía no saben lo que están empezando." }
      ],
      golpes: [{ en: 0, sfx: "puerta" }],
      sig: "p02"
    },

    /* ── p02 · el primer paseo ──────────────────────────── */
    {
      id: "p02", sem: 0, temp: "Prólogo",
      lugar: "Mercado y mirador del cerro · una semana después",
      titulo: "Dos helados de lúcuma",
      eco: [
        "Una semana de mensajes escritos con cuidado, releídos tres veces antes de enviar. Ahora están frente a frente en la entrada del mercado, cada uno fingiendo que casualidad los trajo.",
        "{papa} tiene dos helados de lúcuma comprados con lo que le quedó de la semana. {mama} trae apuntes de farmacología subrayados con tres colores. Arriba, el cerro espera con su vista entera: la Panamericana como una cinta gris, el mar detrás empañado."
      ],
      opciones: [
        {
          t: "Subir al mirador alto, donde apenas llega la señal del celular.",
          ef: { vinculo: 6, conciencia: 2 }, fl: ["mirador"],
          nota: "Arriba solo se oyen perros, viento y la radio lejana de alguna casa. Hablan cuatro horas. Ella le explica para qué sirve el ácido fólico; él le enseña los nombres de las naves en el cielo de la tarde.",
          recuerdo: "El mirador donde la señal no llega. Ahí conversamos mejor que nunca en la vida."
        },
        {
          t: "Quedarse abajo, comiendo helado entre cajas de mango y gente que saluda.",
          ef: { vinculo: 4 }, fl: ["barrio"],
          nota: "Cinco señoras distintas saludan a {mama} con esa pregunta peruana: «¿y este quién es?». Cada respuesta de ella es más larga que la anterior. Al final ya no son dos desconocidos: son noticia.",
          recuerdo: "Nacimos públicos. En mi barrio no hay amores secretos: hay amores comentados."
        }
      ],
      sig: "p03"
    },

    /* ── p03 · meses, planes ────────────────────────────── */
    {
      id: "p03", sem: 0, temp: "Prólogo",
      lugar: "Cuarto alquilado en Pamplona Alta · julio",
      titulo: "La lata de leche",
      eco: [
        "Cinco meses después. El cuarto alquilado es una habitación y media con vista a más cerros: paredes de triplay pintadas de blanco, un colchón grande, fotos pegadas con cinta.",
        "En la mesa, sobre un mantel de propaganda, hay una lata vacía de leche evaporada lavada y sin etiqueta. {papa} la mira con la idea dándole vueltas. {mama} entiende la mirada porque lleva semanas pensando lo mismo."
      ],
      opciones: [
        {
          t: "Clavar la lata bajo la cama: ahí van las monedas del futuro parto.",
          ef: { vinculo: 6 }, fl: ["lata"],
          nota: "Primer depósito: cinco soles con ochenta. {papa} anota en la lata, con marcador: PARA CUANDO LLEGUE. Ninguno aclara qué debe llegar. Los dos saben.",
          recuerdo: "La lata bajo la cama. Sonaba a monedas y sonaba a promesa."
        },
        {
          t: "Vivir el presente: ahorrar puede esperar a tener estabilidad.",
          ef: { vinculo: 1, conciencia: 2 }, fl: ["presente"],
          nota: "La lata termina guardada en el fondo del armario, con las de pintura. Hay meses buenos y meses de arroz con huevo. El futuro queda en manos del destino.",
          recuerdo: "No hubo lata. Hubo fe, que rinde menos pero también alimenta."
        }
      ],
      diario: {
        fecha: "julio, domingo",
        texto: "Él clavó una lata bajo la cama como si fuera alcancía de iglesia. Le pregunté para qué. Dijo: «para cuando llegue». No pregunté más. A veces este hombre dice cosas que me tiemblan el pecho.",
        autor: "{mama}"
      },
      sig: "p04"
    },

    /* ── p04 · la noche ─────────────────────────────────── */
    {
      id: "p04", sem: 0, temp: "Prólogo",
      lugar: "El cuarto · una noche de agosto",
      titulo: "La noche sin calendario",
      eco: [
        "Agosto trae garúa fina que no moja pero deja todo gris. Esa noche, sin embargo, el cuarto está tibio. Hay una guitarra prestada apoyada en la pared y un foco de 25 watts que hace sombras grandes.",
        "Hay conversaciones que terminan en silencio largo, de esos que ya no necesitan palabras. La mano de uno encuentra la mano del otro como quien encuentra algo que había perdido sin darse cuenta.",
        "Lo demás pertenece solo a ellos: al foco pequeño, al colchón en el piso, al barrio dormido con sus perros y sus radios apagadas.",
        "Y en algún momento de esa noche —sin permiso, sin aviso, con una precisión que ninguna estadística explica— ocurre lo que este juego celebra: dos células destinadas a encontrarse empiezan su viaje."
      ],
      opciones: [
        {
          t: "Antes de dormir, {papa} rasca tres acordes en la guitarra prestada.",
          ef: { vinculo: 5, conciencia: 2 }, fl: ["guitarra"],
          nota: "Tres acordes desafinados, una canción inventada con el nombre de ella dentro. Afuera sigue la garúa. Adentro, por primera vez, el cuarto parece casa y no refugio.",
          recuerdo: "Antes de existir escuché una guitarra imperfecta y perfecta a la vez."
        },
        {
          t: "Se duermen hablando de nombres que les gustaría poner algún día.",
          ef: { vinculo: 4, conciencia: 2 }, fl: ["nombres"],
          nota: "Ríen con nombres de telenovela, descartan todos, terminan sin acordar ninguno. Pero la palabra «algún día» quedó dicha dos veces, y las palabras dichas dos veces echan raíz.",
          recuerdo: "Hablaban de nombres futuros mientras yo era apenas una intención."
        }
      ],
      vozDesde: 0,
      voz: [],
      sig: "p05"
    },

    /* ── p05 · LA CARRERA (minijuego debut) ─────────────── */
    {
      id: "p05", sem: 0, temp: "Prólogo",
      tipo: "carrera",
      lugar: "Dentro de {mama} · noche de agosto, hora indocumentada",
      titulo: "La carrera",
      consigna: "Ahora eres tú. Uno entre millones. Mantén presionado para nadar hacia el óvulo — nadie te va a decir cuántos sois.",
      eco: [
        "Todo lo que conoces como «tú» cabe ahora en una punta móvil y una cola que azota. No hay pensamientos todavía, ni nombre, ni miedo. Hay una sola certeza térmica: adelante.",
        "A tu alrededor nadan otros como tú, idénticos hasta el cansancio, todos lanzados al mismo mar interior. De este ejército entero, uno hará historia. Los demás serán olvidados con honores por el propio cuerpo que los lanzó.",
        "Delante, enorme y redonda como una luna de miel, espera la puerta de entrada a toda la vida que vendrá."
      ],
      sig: "p06"
    },

    /* ── p06 · implantación + primera línea de la voz ───── */
    {
      id: "p06", sem: 1, temp: "Prólogo",
      lugar: "Trompa y útero · días 1 a 7",
      titulo: "El viaje corto y el anclaje",
      eco: [
        "Fecundación lograda. En cuestión de horas, el óvulo fecundado —que ya podría llamarse cigoto, pero prefiere llamarse comienzo— se divide en dos. Luego en cuatro. En ocho. Una mora diminuta de células idénticas descendiendo por la trompa como una burbuja por un río estrecho.",
        "Al quinto día es una pelota hueca llamada blastocisto. Al sexto llega al útero, ese músculo en forma de pera donde el endometrio espera engrosado, tibio, alfombrado de vasos. Y entonces ocurre el primer acto heroico de tu existencia: te entierras.",
        "Te entierras en la pared del útero como una semilla en tierra mojada. Duele un poco —{mama} sentirá un pinchazo leve y lo atribuirá a cualquier otra cosa—. Desde este momento, estás oficialmente dentro."
      ],
      vozDesde: 0,
      voz: [
        "Algo me observa. Lo sé desde antes de saber decirlo. Si eres quien creo que eres… bienvenido. Yo también estoy llegando."
      ],
      opciones: [
        {
          t: "Aferrarse fuerte al endometrio: venir a quedarse.",
          ef: { salud: 5, conciencia: 2 }, fl: ["agarre-fuerte"],
          nota: "Las células invasoras del blastocisto trabajan la noche entera, abriéndose paso hasta los vasos maternos. Conexión establecida. Riego asegurado. Contrato vitalicio firmado sin testigos.",
          recuerdo: "Me agarré al primer muro que encontré y juré no soltarme."
        },
        {
          t: "Fluir y confiar: el cuerpo sabe lo que hace.",
          ef: { desarrollo: 4, conciencia: 3 },
          nota: "Sin resistencia ni prisa, el blastocisto se implanta donde el útero decide. La naturaleza, que ha hecho esto cuatrocientas mil millones de veces, toma el control. Todo en orden.",
          recuerdo: "Confío. Es lo único que sé hacer bien todavía."
        }
      ],
      sig: "s01"
    }
  ]);
})();
