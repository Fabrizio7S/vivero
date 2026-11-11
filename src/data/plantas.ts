// ============================================================================
//  PLANTAS QUE SE MUESTRAN EN LA WEB
//
//  Para agregar una planta:
//   1. Sube sus fotos a public/Web con el nombre  <slug>-<número>-<vista>.webp
//      (ej. anturio-rojo-1-frontal.webp, anturio-rojo-2-picado.webp).
//   2. Copia un bloque { ... } de abajo y cambia sus datos. El "slug" debe ser
//      igual al inicio del nombre de sus fotos.
//
//  - nombresEnInventario: nombre(s) exactos del producto en inventario.ts (el
//    Excel), de donde se toma el precio. Si no se pone, sale "Consultar precio".
//    Si hay varios precios, la web muestra "Desde S/ ..." y la lista por tamaño.
//  - envioNacional: false  -> oculta "Envío a todo el Perú" para esa planta.
//  - Una planta sin fotos no aparece en la web (aunque esté en esta lista).
// ============================================================================

import type { PlantaDatos } from "../types/plant";

// Plantas destacadas en "Las plantas más vendidas", en este orden (por slug).
export const masVendidos: string[] = [
  "helecho-babilonico",
  "hiedra-vinca",
  "anturio-rojo",
  "caladium-blanco",
];

// Textos de cuidados que comparten varias plantas.
const luzIndirectaBrillante =
  "Luz indirecta brillante, cerca de una ventana pero sin sol directo, que quema sus hojas.";
const luzIndirectaMedia =
  "Luz indirecta media o brillante. Tolera rincones con menos luz, pero crece más lento.";
const riegoAglaonema =
  "Riega cuando los primeros 2–3 cm de sustrato estén secos, más o menos una vez por semana. No dejes agua acumulada en el plato.";
const riegoAnturio =
  "Una o dos veces por semana, cuando la superficie del sustrato esté seca. Necesita buen drenaje; el exceso de agua pudre sus raíces.";
const riegoBegonia =
  "Mantén el sustrato apenas húmedo y riega cuando la superficie se seque. Evita mojar las hojas para prevenir hongos.";
const riegoBoa =
  "Riega cuando la mitad superior del sustrato esté seca, aprox. una vez por semana. Si sus hojas caen, es señal de que necesita agua.";
const riegoCaladium =
  "Mantén el sustrato húmedo, sin encharcar, mientras tenga hojas. En invierno puede descansar y perderlas: riega poco hasta que rebrote en primavera.";
const riegoCalathea =
  "Sustrato siempre ligeramente húmedo, nunca encharcado. Agradece agua reposada y humedad en el ambiente; rocía sus hojas en días secos.";
const riegoFittonia =
  "Mantén el sustrato húmedo de forma constante. Si se deja secar se desmaya, pero se recupera en pocas horas después de regarla.";
const riegoHelecho =
  "Sustrato siempre húmedo, sin encharcar, y ambiente húmedo. Rocía sus frondas con frecuencia, sobre todo en verano.";
const riegoPeperomia =
  "Riega solo cuando el sustrato esté seco, cada 7–10 días. Sus hojas guardan agua, por eso es mejor quedarse corto que pasarse.";
const riegoZamioculca =
  "Cada 2 o 3 semanas, solo cuando el sustrato esté completamente seco. Guarda agua en sus raíces y no tolera el exceso.";

export const plantas: PlantaDatos[] = [
  {
    slug: "aglaonema-blanco",
    nombre: "Aglaonema Blanco",
    categoria: "Interior",
    descripcion: "Aglaonema de hojas color crema salpicadas de verde. Es resistente, crece lento y aporta luz y frescura a cualquier ambiente interior.",
    luz: "Luz indirecta brillante. Las aglaonemas de hojas claras necesitan buena luz para mantener su color; evita el sol directo.",
    riego: riegoAglaonema,
  },
  {
    slug: "aglaonema-roja-vena",
    nombre: "Aglaonema Roja Vena",
    categoria: "Interior",
    nombresEnInventario: ["Aglaonema Roja y Rosada Tallo"],
    descripcion: "Aglaonema de hojas verdes con nervaduras y bordes rojizos. Una planta de interior muy resistente y de bajo mantenimiento.",
    luz: luzIndirectaBrillante,
    riego: riegoAglaonema,
  },
  {
    slug: "aglaonema-rosada-dud",
    nombre: "Aglaonema Rosada Dud",
    categoria: "Interior",
    nombresEnInventario: ["Aglaonema Rosada"],
    descripcion: "Aglaonema de hojas rosadas salpicadas de verde. Su color intenso la convierte en protagonista de salas, escritorios y repisas.",
    luz: luzIndirectaBrillante,
    riego: riegoAglaonema,
  },
  {
    slug: "aglaonema-rosada-legacy",
    nombre: "Aglaonema Rosada Legacy",
    categoria: "Interior",
    nombresEnInventario: ["Aglaonema Rosada"],
    descripcion: "Aglaonema de hojas en tonos rosados y rojizos con bordes verdes. Resistente, compacta y de crecimiento lento.",
    luz: luzIndirectaBrillante,
    riego: riegoAglaonema,
  },
  {
    slug: "alocasia-amazonica",
    nombre: "Alocasia Amazónica",
    categoria: "Interior",
    nombresEnInventario: ["Alocasia Amazónica"],
    descripcion: "Hojas en forma de flecha, verde oscuro y brillantes, con nervaduras blancas muy marcadas. Una planta tropical de aspecto escultural.",
    luz: luzIndirectaBrillante,
    riego: "Riega cuando los primeros centímetros del sustrato estén secos; no tolera el encharcamiento. En invierno riega menos: puede perder alguna hoja y volver a brotar.",
  },
  {
    slug: "alocasia-frydek",
    nombre: "Alocasia Frydek",
    categoria: "Interior",
    nombresEnInventario: ["Alocasia Frydek"],
    descripcion: "Alocasia de hojas aterciopeladas verde oscuro con nervaduras blanco verdoso. Elegante y llamativa, ideal para interiores luminosos.",
    luz: luzIndirectaBrillante,
    riego: "Riega cuando los primeros centímetros del sustrato estén secos; no tolera el encharcamiento. En invierno riega menos y evita las corrientes de aire frío.",
  },
  {
    slug: "anturio-amarillo",
    nombre: "Anturio Amarillo",
    categoria: "Interior",
    nombresEnInventario: ["Anturio"],
    descripcion: "Anturio de flores amarillas brillantes que duran semanas en la planta. Florece varias veces al año con los cuidados adecuados.",
    luz: luzIndirectaBrillante,
    riego: riegoAnturio,
  },
  {
    slug: "anturio-chocolate",
    nombre: "Anturio Chocolate",
    categoria: "Interior",
    nombresEnInventario: ["Anturio"],
    descripcion: "Anturio de flores color chocolate, un tono poco común y muy elegante. Sus flores duran semanas y se renuevan durante el año.",
    luz: luzIndirectaBrillante,
    riego: riegoAnturio,
  },
  {
    slug: "anturio-magnifico",
    nombre: "Anturio Magnífico",
    categoria: "Interior",
    nombresEnInventario: ["Anturio"],
    descripcion: "Anturio de follaje, con hojas grandes en forma de corazón, textura aterciopelada y nervaduras plateadas. Una pieza de colección.",
    luz: luzIndirectaBrillante,
    riego: "Mantén el sustrato apenas húmedo y bien aireado; riega cuando la superficie esté seca. Le gusta la humedad ambiental.",
  },
  {
    slug: "anturio-morado",
    nombre: "Anturio Morado",
    categoria: "Interior",
    nombresEnInventario: ["Anturio"],
    descripcion: "Anturio de flores moradas brillantes. Sus flores duran semanas en la planta y florece varias veces al año.",
    luz: luzIndirectaBrillante,
    riego: riegoAnturio,
  },
  {
    slug: "anturio-rojo",
    nombre: "Anturio Rojo",
    categoria: "Interior",
    nombresEnInventario: ["Anturio"],
    descripcion: "El anturio clásico, de flores rojas brillantes en forma de corazón. Dura semanas en flor y es uno de nuestros más vendidos.",
    luz: luzIndirectaBrillante,
    riego: riegoAnturio,
  },
  {
    slug: "anturio-rosado",
    nombre: "Anturio Rosado",
    categoria: "Interior",
    nombresEnInventario: ["Anturio"],
    descripcion: "Anturio de flores rosadas brillantes en forma de corazón. Un detalle ideal para regalar o alegrar cualquier ambiente.",
    luz: luzIndirectaBrillante,
    riego: riegoAnturio,
  },
  {
    slug: "bambu-de-la-suerte",
    nombre: "Bambú de la Suerte",
    categoria: "Interior",
    descripcion: "Tallos verdes que se cultivan en agua o en tierra y que, según la tradición, atraen buena suerte y prosperidad al hogar.",
    luz: "Luz indirecta. Tolera bien los ambientes con poca luz; evita el sol directo.",
    riego: "En agua: mantén las raíces cubiertas y cambia el agua cada 1–2 semanas, de preferencia reposada. En tierra: sustrato ligeramente húmedo.",
  },
  {
    slug: "begonia-cruz-de-hierro",
    nombre: "Begonia Cruz de Hierro",
    categoria: "Interior",
    nombresEnInventario: ["Begonias"],
    descripcion: "Begonia de hojas rugosas verde claro con un dibujo en forma de cruz color marrón oscuro. Una planta de follaje muy original.",
    luz: luzIndirectaBrillante,
    riego: riegoBegonia,
  },
  {
    slug: "begonia-rex-fucsia",
    nombre: "Begonia Rex Fucsia",
    categoria: "Interior",
    nombresEnInventario: ["Begonias"],
    descripcion: "Begonia Rex de hojas en tonos fucsia con reflejos metálicos. Su follaje colorido luce como una flor todo el año.",
    luz: luzIndirectaBrillante,
    riego: riegoBegonia,
  },
  {
    slug: "begonia-rex-roja",
    nombre: "Begonia Rex Roja",
    categoria: "Interior",
    nombresEnInventario: ["Begonias"],
    descripcion: "Begonia Rex de hojas rojizas con reflejos metálicos. Ideal para dar un toque de color intenso a mesas y repisas.",
    luz: luzIndirectaBrillante,
    riego: riegoBegonia,
  },
  {
    slug: "begonia-rex-rosada",
    nombre: "Begonia Rex Rosada",
    categoria: "Interior",
    nombresEnInventario: ["Begonias"],
    descripcion: "Begonia Rex de hojas rosadas con dibujos plateados. Compacta y muy decorativa, perfecta para espacios pequeños.",
    luz: luzIndirectaBrillante,
    riego: riegoBegonia,
  },
  {
    slug: "boa-dorada",
    nombre: "Boa Dorada",
    categoria: "Interior",
    descripcion: "Boa (pothos) de hojas verdes con vetas doradas. Colgante o trepadora, es una de las plantas de interior más fáciles de cuidar.",
    luz: luzIndirectaMedia,
    riego: riegoBoa,
  },
  {
    slug: "boa-limon",
    nombre: "Boa Limón",
    categoria: "Interior",
    descripcion: "Boa de hojas verde limón brillante que iluminan cualquier rincón. Crece rápido y luce muy bien colgando de repisas.",
    luz: "Luz indirecta brillante para mantener su color limón; con poca luz sus hojas se oscurecen.",
    riego: riegoBoa,
  },
  {
    slug: "boa-marble-queen",
    nombre: "Boa Marble Queen",
    categoria: "Interior",
    nombresEnInventario: ["Boa Marble Queen"],
    descripcion: "Boa de hojas jaspeadas en blanco y verde, como mármol. Colgante o trepadora, aporta un estilo fresco y elegante.",
    luz: "Luz indirecta brillante; necesita más luz que otras boas para conservar su jaspeado blanco.",
    riego: riegoBoa,
  },
  {
    slug: "caladium-blanco",
    nombre: "Caladium Blanco",
    categoria: "Interior",
    descripcion: "Caladium de hojas finas en forma de corazón, blancas con nervaduras verdes. Delicado y luminoso, uno de nuestros más vendidos.",
    luz: luzIndirectaBrillante,
    riego: riegoCaladium,
  },
  {
    slug: "caladium-blanco-sirena",
    nombre: "Caladium Blanco Sirena",
    categoria: "Interior",
    descripcion: "Caladium de hojas grandes y alargadas, blancas con nervaduras verde oscuro muy marcadas. Elegante y llamativo.",
    luz: luzIndirectaBrillante,
    riego: riegoCaladium,
  },
  {
    slug: "caladium-chispeado",
    nombre: "Caladium Chispeado",
    categoria: "Interior",
    descripcion: "Caladium de hojas salpicadas de color, como pequeñas chispas sobre el verde. Alegre y diferente a cualquier otra planta.",
    luz: luzIndirectaBrillante,
    riego: riegoCaladium,
  },
  {
    slug: "caladium-panuelo",
    nombre: "Caladium Pañuelo",
    categoria: "Interior",
    descripcion: "Caladium de hojas rojas con bordes verdes y pequeñas manchas claras. Su color intenso destaca en cualquier ambiente.",
    luz: luzIndirectaBrillante,
    riego: riegoCaladium,
  },
  {
    slug: "caladium-rojo",
    nombre: "Caladium Rojo",
    categoria: "Interior",
    descripcion: "Caladium de hojas en forma de corazón en tonos rojos intensos. Una planta de follaje que parece una flor.",
    luz: luzIndirectaBrillante,
    riego: riegoCaladium,
  },
  {
    slug: "calathea-medallion",
    nombre: "Calathea Medallion",
    categoria: "Interior",
    descripcion: "Calathea de hojas redondas con dibujos verdes y reverso morado. Sus hojas se abren de día y se cierran de noche.",
    luz: "Luz indirecta media. El sol directo decolora y quema sus hojas.",
    riego: riegoCalathea,
  },
  {
    slug: "calathea-pavo-real",
    nombre: "Calathea Pavo Real",
    categoria: "Interior",
    nombresEnInventario: ["Calathea Pavo Real"],
    descripcion: "Calathea de hojas finas con dibujos que recuerdan a las plumas de un pavo real. Sus hojas se mueven con la luz del día.",
    luz: "Luz indirecta media. El sol directo decolora y quema sus hojas.",
    riego: riegoCalathea,
  },
  {
    slug: "calathea-triostar",
    nombre: "Calathea Trio Star",
    categoria: "Interior",
    nombresEnInventario: ["Calathea Trio Star"],
    descripcion: "Calathea de hojas verdes, blancas y rosadas, con reverso fucsia. Una de las calatheas más coloridas.",
    luz: "Luz indirecta brillante para mantener su color, sin sol directo.",
    riego: riegoCalathea,
  },
  {
    slug: "caucho-negro",
    nombre: "Caucho Negro",
    categoria: "Interior",
    descripcion: "Ficus elástica de hojas grandes, gruesas y brillantes, de un verde tan oscuro que parece negro. Crece en altura y es muy resistente.",
    luz: "Luz indirecta brillante; tolera algo de sol suave de la mañana. Con más luz, su color es más intenso.",
    riego: "Riega cuando la mitad superior del sustrato esté seca, aprox. cada 7–10 días. Limpia sus hojas con un paño húmedo para que brillen.",
  },
  {
    slug: "cinta-de-novia",
    nombre: "Cinta de Novia",
    categoria: "Flores y exterior",
    nombresEnInventario: ["Cinta de Novia"],
    descripcion: "Planta de hojas largas y arqueadas a rayas verdes y blancas. Muy resistente y fácil de multiplicar por sus hijuelos colgantes.",
    luz: "Luz indirecta brillante o sol suave. Funciona en interior y en exteriores sombreados.",
    riego: "Riega cuando la superficie del sustrato esté seca, una o dos veces por semana. Tolera bien algún olvido.",
  },
  {
    slug: "cuna-de-moises-variegado",
    nombre: "Cuna de Moisés Variegado",
    categoria: "Interior",
    descripcion: "Versión variegada de la cuna de Moisés (Spathiphyllum), con hojas verdes y blancas y flores blancas. Ayuda a purificar el aire.",
    luz: "Luz indirecta media o brillante; las variegadas necesitan algo más de luz. Evita el sol directo.",
    riego: "Mantén el sustrato ligeramente húmedo. Si sus hojas se caen, riégala y se levantará en pocas horas.",
  },
  {
    slug: "dieffenbachia",
    nombre: "Dieffenbachia",
    categoria: "Interior",
    descripcion: "Planta de hojas grandes verdes con manchas color crema. Crece rápido y llena de verde cualquier espacio interior.",
    luz: luzIndirectaMedia,
    riego: "Riega cuando los primeros 2–3 cm del sustrato estén secos. Evita el encharcamiento.",
  },
  {
    slug: "ficus-tineke",
    nombre: "Ficus Tineke",
    categoria: "Interior",
    descripcion: "Ficus elástica de hojas variegadas en verde, crema y tonos rosados. Elegante, resistente y de crecimiento vertical.",
    luz: "Luz indirecta brillante para mantener sus colores; tolera sol suave de la mañana.",
    riego: "Riega cuando la mitad superior del sustrato esté seca, aprox. cada 7–10 días. No lo cambies de lugar seguido: puede soltar hojas.",
  },
  {
    slug: "fittonia-amarilla",
    nombre: "Fittonia Amarilla",
    categoria: "Interior",
    descripcion: "Fittonia pequeña de hojas verdes con nervaduras amarillas. Ideal para terrarios, escritorios y espacios pequeños.",
    luz: "Luz indirecta media. El sol directo quema sus hojas.",
    riego: riegoFittonia,
  },
  {
    slug: "fittonia-blanca-grande",
    nombre: "Fittonia Blanca Grande",
    categoria: "Interior",
    descripcion: "Fittonia de hojas grandes verdes con nervaduras blancas que forman una red. Compacta y muy decorativa.",
    luz: "Luz indirecta media. El sol directo quema sus hojas.",
    riego: riegoFittonia,
  },
  {
    slug: "fittonia-roja-mini",
    nombre: "Fittonia Roja Mini",
    categoria: "Interior",
    descripcion: "Fittonia mini de hojas con nervaduras rojas. Perfecta para terrarios y para dar color a espacios pequeños.",
    luz: "Luz indirecta media. El sol directo quema sus hojas.",
    riego: riegoFittonia,
  },
  {
    slug: "fittonia-verde-mini",
    nombre: "Fittonia Verde Mini",
    categoria: "Interior",
    descripcion: "Fittonia mini de hojas verdes con nervaduras claras. Pequeña, fresca e ideal para terrarios y escritorios.",
    luz: "Luz indirecta media. El sol directo quema sus hojas.",
    riego: riegoFittonia,
  },
  {
    slug: "helecho-aleman",
    nombre: "Helecho Alemán",
    categoria: "Interior",
    descripcion: "Helecho de frondas largas y arqueadas, muy frondoso. Luce espectacular en maceteros colgantes o sobre pedestales.",
    luz: "Luz indirecta media o brillante, sin sol directo.",
    riego: riegoHelecho,
  },
  {
    slug: "helecho-angora-variegado",
    nombre: "Helecho Angora Variegado",
    categoria: "Interior",
    descripcion: "Helecho de frondas en tonos verde lima y verde intenso. Frondoso y lleno de textura, aporta frescura a cualquier rincón.",
    luz: "Luz indirecta brillante para mantener su color lima, sin sol directo.",
    riego: riegoHelecho,
  },
  {
    slug: "helecho-babilonico",
    nombre: "Helecho Babilónico",
    categoria: "Interior",
    nombresEnInventario: ["Helecho Babilónico"],
    descripcion: "Helecho frondoso de frondas largas y colgantes. Nuestro más vendido: ideal para maceteros colgantes, terrazas y balcones sombreados.",
    luz: "Luz indirecta media o brillante, sin sol directo.",
    riego: riegoHelecho,
  },
  {
    slug: "hiedra-vinca",
    nombre: "Hiedra Vinca",
    categoria: "Interior",
    nombresEnInventario: ["Hiedra Vincas"],
    descripcion: "Planta colgante de hojas verdes con bordes color crema. Crece rápido y cae en cascada desde repisas y maceteros colgantes.",
    luz: "Luz indirecta brillante o sol suave. Funciona en interior y en exteriores protegidos.",
    riego: "Riega cuando la superficie del sustrato esté seca, una o dos veces por semana.",
  },
  {
    slug: "llama-plata",
    nombre: "Llama Plata",
    categoria: "Interior",
    descripcion: "Planta colgante de hojas pequeñas, redondeadas y texturizadas. Forma una cascada verde muy tupida, ideal para colgar.",
    luz: "Luz indirecta brillante, sin sol directo fuerte.",
    riego: "Riega cuando la superficie del sustrato esté seca. Prefiere riegos frecuentes y ligeros antes que mucha agua de golpe.",
  },
  {
    slug: "monstera-adansonii",
    nombre: "Monstera Adansonii",
    categoria: "Interior",
    descripcion: "Monstera de hojas con agujeros naturales, también llamada \"queso suizo\". Trepadora o colgante, crece rápido y es muy decorativa.",
    luz: luzIndirectaBrillante,
    riego: "Riega cuando los primeros 3 cm del sustrato estén secos. Agradece la humedad ambiental y un tutor para trepar.",
  },
  {
    slug: "monstera-thai-constellation",
    nombre: "Monstera Thai Constellation",
    categoria: "Interior",
    nombresEnInventario: ["Monstera Thai Constellation"],
    descripcion: "Monstera de hojas grandes salpicadas de crema, como un cielo estrellado. Una de las plantas más buscadas por coleccionistas.",
    luz: "Luz indirecta brillante, imprescindible para mantener su variegado. Evita el sol directo.",
    riego: "Riega cuando los primeros 3–5 cm del sustrato estén secos. Usa sustrato aireado y con buen drenaje.",
  },
  {
    slug: "orquidea-phalaenopsis-grande-fucsia",
    nombre: "Orquídea Phalaenopsis Grande Fucsia",
    categoria: "Interior",
    nombresEnInventario: ["Orquídea"],
    descripcion: "Orquídea Phalaenopsis de flores fucsia en varas largas. Sus flores duran semanas y es un regalo elegante para cualquier ocasión.",
    luz: "Luz indirecta brillante, junto a una ventana con cortina. El sol directo quema sus hojas.",
    riego: "Una vez por semana: sumerge la maceta en agua unos minutos y deja escurrir bien. Riega cuando las raíces se vean plateadas.",
  },
  {
    slug: "orquidea-phalaenopsis-mini-lila",
    nombre: "Orquídea Phalaenopsis Mini Lila",
    categoria: "Interior",
    nombresEnInventario: ["Orquídea"],
    descripcion: "Orquídea Phalaenopsis mini de flores lila. Compacta y delicada, perfecta para escritorios, mesas de noche y regalos.",
    luz: "Luz indirecta brillante, junto a una ventana con cortina. El sol directo quema sus hojas.",
    riego: "Una vez por semana: sumerge la maceta en agua unos minutos y deja escurrir bien. Riega cuando las raíces se vean plateadas.",
  },
  {
    slug: "peperomia-lemon",
    nombre: "Peperomia Lemon",
    categoria: "Interior",
    nombresEnInventario: ["Peperomia Lemon"],
    descripcion: "Peperomia de hojas carnosas verde limón. Compacta, resistente y perfecta para escritorios y repisas.",
    luz: "Luz indirecta media o brillante, sin sol directo.",
    riego: riegoPeperomia,
  },
  {
    slug: "peperomia-sandia",
    nombre: "Peperomia Sandía",
    categoria: "Interior",
    nombresEnInventario: ["Peperomia Sandía"],
    descripcion: "Peperomia de hojas redondas con rayas plateadas que recuerdan a una sandía. Pequeña, original y fácil de cuidar.",
    luz: "Luz indirecta media o brillante, sin sol directo.",
    riego: riegoPeperomia,
  },
  {
    slug: "peperomia-verde",
    nombre: "Peperomia Verde",
    categoria: "Interior",
    nombresEnInventario: ["Peperomia Verde"],
    descripcion: "Peperomia de hojas carnosas verde brillante. Muy resistente y de bajo mantenimiento, ideal para empezar con plantas.",
    luz: "Luz indirecta media o brillante, sin sol directo.",
    riego: riegoPeperomia,
  },
  {
    slug: "philodendron-moonlight",
    nombre: "Philodendron Moonlight",
    categoria: "Interior",
    nombresEnInventario: ["Filodendro Lemon"],
    descripcion: "Philodendron de hojas verde lima brillante; las hojas nuevas nacen casi amarillas. Compacto, alegre y muy fácil de cuidar.",
    luz: "Luz indirecta brillante para mantener su color lima, sin sol directo.",
    riego: "Riega cuando los primeros 2–3 cm del sustrato estén secos, aprox. una vez por semana.",
  },
  {
    slug: "syngonium",
    nombre: "Syngonium",
    categoria: "Interior",
    nombresEnInventario: ["Syngonium Pink", "Syngonium Variegado", "Syngonium Confeti", "Syngonium Milk Confeti", "Syngonium Pink Robusta"],
    descripcion: "Planta de hojas en forma de flecha que cambian de forma al crecer. Fácil de cuidar, puede crecer compacta, colgante o trepadora.",
    luz: luzIndirectaMedia,
    riego: "Mantén el sustrato ligeramente húmedo; riega cuando la superficie esté seca, una o dos veces por semana.",
  },
  {
    slug: "tradescantia",
    nombre: "Tradescantia",
    categoria: "Interior",
    nombresEnInventario: ["Tradescantia"],
    descripcion: "Planta colgante de crecimiento rápido con hojas de colores. Muy fácil de cuidar y de multiplicar por esquejes.",
    luz: "Luz indirecta brillante para que sus colores sean intensos; con poca luz se alarga y pierde color.",
    riego: "Riega cuando la superficie del sustrato esté seca. Evita mojar el centro de la planta.",
  },
  {
    slug: "zamioculca-negra",
    nombre: "Zamioculca Negra",
    categoria: "Interior",
    descripcion: "Zamioculca de hojas negras y brillantes, de estilo moderno. Casi indestructible: aguanta poca luz y largos periodos sin riego.",
    luz: "Desde luz indirecta brillante hasta rincones con poca luz. Evita el sol directo.",
    riego: riegoZamioculca,
  },
  {
    slug: "zamioculca-verde",
    nombre: "Zamioculca Verde",
    categoria: "Interior",
    descripcion: "Zamioculca de hojas verdes, brillantes y carnosas. Ideal para oficinas y para quienes empiezan con plantas: necesita muy poco cuidado.",
    luz: "Desde luz indirecta brillante hasta rincones con poca luz. Evita el sol directo.",
    riego: riegoZamioculca,
  },
];
