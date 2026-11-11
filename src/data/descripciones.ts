// Descripción y cuidados de cada planta, por slug (el mismo de catalogo.ts).
// Para cambiar un texto, edítalo aquí; aparece en la ficha de la planta.

export interface DescripcionPlanta {
  description: string;
  light: string;
  watering: string;
}

// Cuidados compartidos por plantas de la misma familia.
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

export const descripciones: Record<string, DescripcionPlanta> = {
  "aglaonema-blanco": {
    description:
      "Aglaonema de hojas color crema salpicadas de verde. Es resistente, crece lento y aporta luz y frescura a cualquier ambiente interior.",
    light:
      "Luz indirecta brillante. Las aglaonemas de hojas claras necesitan buena luz para mantener su color; evita el sol directo.",
    watering: riegoAglaonema,
  },
  "aglaonema-roja-vena": {
    description:
      "Aglaonema de hojas verdes con nervaduras y bordes rojizos. Una planta de interior muy resistente y de bajo mantenimiento.",
    light: luzIndirectaBrillante,
    watering: riegoAglaonema,
  },
  "aglaonema-rosada-dud": {
    description:
      "Aglaonema de hojas rosadas salpicadas de verde. Su color intenso la convierte en protagonista de salas, escritorios y repisas.",
    light: luzIndirectaBrillante,
    watering: riegoAglaonema,
  },
  "aglaonema-rosada-legacy": {
    description:
      "Aglaonema de hojas en tonos rosados y rojizos con bordes verdes. Resistente, compacta y de crecimiento lento.",
    light: luzIndirectaBrillante,
    watering: riegoAglaonema,
  },
  "alocasia-amazonica": {
    description:
      "Hojas en forma de flecha, verde oscuro y brillantes, con nervaduras blancas muy marcadas. Una planta tropical de aspecto escultural.",
    light: luzIndirectaBrillante,
    watering:
      "Riega cuando los primeros centímetros del sustrato estén secos; no tolera el encharcamiento. En invierno riega menos: puede perder alguna hoja y volver a brotar.",
  },
  "alocasia-frydek": {
    description:
      "Alocasia de hojas aterciopeladas verde oscuro con nervaduras blanco verdoso. Elegante y llamativa, ideal para interiores luminosos.",
    light: luzIndirectaBrillante,
    watering:
      "Riega cuando los primeros centímetros del sustrato estén secos; no tolera el encharcamiento. En invierno riega menos y evita las corrientes de aire frío.",
  },
  "anturio-amarillo": {
    description:
      "Anturio de flores amarillas brillantes que duran semanas en la planta. Florece varias veces al año con los cuidados adecuados.",
    light: luzIndirectaBrillante,
    watering: riegoAnturio,
  },
  "anturio-chocolate": {
    description:
      "Anturio de flores color chocolate, un tono poco común y muy elegante. Sus flores duran semanas y se renuevan durante el año.",
    light: luzIndirectaBrillante,
    watering: riegoAnturio,
  },
  "anturio-magnifico": {
    description:
      "Anturio de follaje, con hojas grandes en forma de corazón, textura aterciopelada y nervaduras plateadas. Una pieza de colección.",
    light: luzIndirectaBrillante,
    watering:
      "Mantén el sustrato apenas húmedo y bien aireado; riega cuando la superficie esté seca. Le gusta la humedad ambiental.",
  },
  "anturio-morado": {
    description:
      "Anturio de flores moradas brillantes. Sus flores duran semanas en la planta y florece varias veces al año.",
    light: luzIndirectaBrillante,
    watering: riegoAnturio,
  },
  "anturio-rojo": {
    description:
      "El anturio clásico, de flores rojas brillantes en forma de corazón. Dura semanas en flor y es uno de nuestros más vendidos.",
    light: luzIndirectaBrillante,
    watering: riegoAnturio,
  },
  "anturio-rosado": {
    description:
      "Anturio de flores rosadas brillantes en forma de corazón. Un detalle ideal para regalar o alegrar cualquier ambiente.",
    light: luzIndirectaBrillante,
    watering: riegoAnturio,
  },
  "bambu-de-la-suerte": {
    description:
      "Tallos verdes que se cultivan en agua o en tierra y que, según la tradición, atraen buena suerte y prosperidad al hogar.",
    light: "Luz indirecta. Tolera bien los ambientes con poca luz; evita el sol directo.",
    watering:
      "En agua: mantén las raíces cubiertas y cambia el agua cada 1–2 semanas, de preferencia reposada. En tierra: sustrato ligeramente húmedo.",
  },
  "begonia-cruz-de-hierro": {
    description:
      "Begonia de hojas rugosas verde claro con un dibujo en forma de cruz color marrón oscuro. Una planta de follaje muy original.",
    light: luzIndirectaBrillante,
    watering: riegoBegonia,
  },
  "begonia-rex-fucsia": {
    description:
      "Begonia Rex de hojas en tonos fucsia con reflejos metálicos. Su follaje colorido luce como una flor todo el año.",
    light: luzIndirectaBrillante,
    watering: riegoBegonia,
  },
  "begonia-rex-roja": {
    description:
      "Begonia Rex de hojas rojizas con reflejos metálicos. Ideal para dar un toque de color intenso a mesas y repisas.",
    light: luzIndirectaBrillante,
    watering: riegoBegonia,
  },
  "begonia-rex-rosada": {
    description:
      "Begonia Rex de hojas rosadas con dibujos plateados. Compacta y muy decorativa, perfecta para espacios pequeños.",
    light: luzIndirectaBrillante,
    watering: riegoBegonia,
  },
  "boa-dorada": {
    description:
      "Boa (pothos) de hojas verdes con vetas doradas. Colgante o trepadora, es una de las plantas de interior más fáciles de cuidar.",
    light: luzIndirectaMedia,
    watering: riegoBoa,
  },
  "boa-limon": {
    description:
      "Boa de hojas verde limón brillante que iluminan cualquier rincón. Crece rápido y luce muy bien colgando de repisas.",
    light:
      "Luz indirecta brillante para mantener su color limón; con poca luz sus hojas se oscurecen.",
    watering: riegoBoa,
  },
  "boa-marble-queen": {
    description:
      "Boa de hojas jaspeadas en blanco y verde, como mármol. Colgante o trepadora, aporta un estilo fresco y elegante.",
    light:
      "Luz indirecta brillante; necesita más luz que otras boas para conservar su jaspeado blanco.",
    watering: riegoBoa,
  },
  "caladium-blanco": {
    description:
      "Caladium de hojas finas en forma de corazón, blancas con nervaduras verdes. Delicado y luminoso, uno de nuestros más vendidos.",
    light: luzIndirectaBrillante,
    watering: riegoCaladium,
  },
  "caladium-blanco-sirena": {
    description:
      "Caladium de hojas grandes y alargadas, blancas con nervaduras verde oscuro muy marcadas. Elegante y llamativo.",
    light: luzIndirectaBrillante,
    watering: riegoCaladium,
  },
  "caladium-chispeado": {
    description:
      "Caladium de hojas salpicadas de color, como pequeñas chispas sobre el verde. Alegre y diferente a cualquier otra planta.",
    light: luzIndirectaBrillante,
    watering: riegoCaladium,
  },
  "caladium-panuelo": {
    description:
      "Caladium de hojas rojas con bordes verdes y pequeñas manchas claras. Su color intenso destaca en cualquier ambiente.",
    light: luzIndirectaBrillante,
    watering: riegoCaladium,
  },
  "caladium-rojo": {
    description:
      "Caladium de hojas en forma de corazón en tonos rojos intensos. Una planta de follaje que parece una flor.",
    light: luzIndirectaBrillante,
    watering: riegoCaladium,
  },
  "calathea-medallion": {
    description:
      "Calathea de hojas redondas con dibujos verdes y reverso morado. Sus hojas se abren de día y se cierran de noche.",
    light: "Luz indirecta media. El sol directo decolora y quema sus hojas.",
    watering: riegoCalathea,
  },
  "calathea-pavo-real": {
    description:
      "Calathea de hojas finas con dibujos que recuerdan a las plumas de un pavo real. Sus hojas se mueven con la luz del día.",
    light: "Luz indirecta media. El sol directo decolora y quema sus hojas.",
    watering: riegoCalathea,
  },
  "calathea-triostar": {
    description:
      "Calathea de hojas verdes, blancas y rosadas, con reverso fucsia. Una de las calatheas más coloridas.",
    light:
      "Luz indirecta brillante para mantener su color, sin sol directo.",
    watering: riegoCalathea,
  },
  "caucho-negro": {
    description:
      "Ficus elástica de hojas grandes, gruesas y brillantes, de un verde tan oscuro que parece negro. Crece en altura y es muy resistente.",
    light:
      "Luz indirecta brillante; tolera algo de sol suave de la mañana. Con más luz, su color es más intenso.",
    watering:
      "Riega cuando la mitad superior del sustrato esté seca, aprox. cada 7–10 días. Limpia sus hojas con un paño húmedo para que brillen.",
  },
  "cinta-de-novia": {
    description:
      "Planta de hojas largas y arqueadas a rayas verdes y blancas. Muy resistente y fácil de multiplicar por sus hijuelos colgantes.",
    light:
      "Luz indirecta brillante o sol suave. Funciona en interior y en exteriores sombreados.",
    watering:
      "Riega cuando la superficie del sustrato esté seca, una o dos veces por semana. Tolera bien algún olvido.",
  },
  "cuna-de-moises-variegado": {
    description:
      "Versión variegada de la cuna de Moisés (Spathiphyllum), con hojas verdes y blancas y flores blancas. Ayuda a purificar el aire.",
    light:
      "Luz indirecta media o brillante; las variegadas necesitan algo más de luz. Evita el sol directo.",
    watering:
      "Mantén el sustrato ligeramente húmedo. Si sus hojas se caen, riégala y se levantará en pocas horas.",
  },
  dieffenbachia: {
    description:
      "Planta de hojas grandes verdes con manchas color crema. Crece rápido y llena de verde cualquier espacio interior.",
    light: luzIndirectaMedia,
    watering:
      "Riega cuando los primeros 2–3 cm del sustrato estén secos. Evita el encharcamiento.",
  },
  "ficus-tineke": {
    description:
      "Ficus elástica de hojas variegadas en verde, crema y tonos rosados. Elegante, resistente y de crecimiento vertical.",
    light:
      "Luz indirecta brillante para mantener sus colores; tolera sol suave de la mañana.",
    watering:
      "Riega cuando la mitad superior del sustrato esté seca, aprox. cada 7–10 días. No lo cambies de lugar seguido: puede soltar hojas.",
  },
  "fittonia-amarilla": {
    description:
      "Fittonia pequeña de hojas verdes con nervaduras amarillas. Ideal para terrarios, escritorios y espacios pequeños.",
    light: "Luz indirecta media. El sol directo quema sus hojas.",
    watering: riegoFittonia,
  },
  "fittonia-blanca-grande": {
    description:
      "Fittonia de hojas grandes verdes con nervaduras blancas que forman una red. Compacta y muy decorativa.",
    light: "Luz indirecta media. El sol directo quema sus hojas.",
    watering: riegoFittonia,
  },
  "fittonia-roja-mini": {
    description:
      "Fittonia mini de hojas con nervaduras rojas. Perfecta para terrarios y para dar color a espacios pequeños.",
    light: "Luz indirecta media. El sol directo quema sus hojas.",
    watering: riegoFittonia,
  },
  "fittonia-verde-mini": {
    description:
      "Fittonia mini de hojas verdes con nervaduras claras. Pequeña, fresca e ideal para terrarios y escritorios.",
    light: "Luz indirecta media. El sol directo quema sus hojas.",
    watering: riegoFittonia,
  },
  "helecho-aleman": {
    description:
      "Helecho de frondas largas y arqueadas, muy frondoso. Luce espectacular en maceteros colgantes o sobre pedestales.",
    light: "Luz indirecta media o brillante, sin sol directo.",
    watering: riegoHelecho,
  },
  "helecho-angora-variegado": {
    description:
      "Helecho de frondas en tonos verde lima y verde intenso. Frondoso y lleno de textura, aporta frescura a cualquier rincón.",
    light: "Luz indirecta brillante para mantener su color lima, sin sol directo.",
    watering: riegoHelecho,
  },
  "helecho-babilonico": {
    description:
      "Helecho frondoso de frondas largas y colgantes. Nuestro más vendido: ideal para maceteros colgantes, terrazas y balcones sombreados.",
    light: "Luz indirecta media o brillante, sin sol directo.",
    watering: riegoHelecho,
  },
  "hiedra-vinca": {
    description:
      "Planta colgante de hojas verdes con bordes color crema. Crece rápido y cae en cascada desde repisas y maceteros colgantes.",
    light:
      "Luz indirecta brillante o sol suave. Funciona en interior y en exteriores protegidos.",
    watering:
      "Riega cuando la superficie del sustrato esté seca, una o dos veces por semana.",
  },
  "llama-plata": {
    description:
      "Planta colgante de hojas pequeñas, redondeadas y texturizadas. Forma una cascada verde muy tupida, ideal para colgar.",
    light: "Luz indirecta brillante, sin sol directo fuerte.",
    watering:
      "Riega cuando la superficie del sustrato esté seca. Prefiere riegos frecuentes y ligeros antes que mucha agua de golpe.",
  },
  "monstera-adansonii": {
    description:
      "Monstera de hojas con agujeros naturales, también llamada \"queso suizo\". Trepadora o colgante, crece rápido y es muy decorativa.",
    light: luzIndirectaBrillante,
    watering:
      "Riega cuando los primeros 3 cm del sustrato estén secos. Agradece la humedad ambiental y un tutor para trepar.",
  },
  "monstera-thai-constellation": {
    description:
      "Monstera de hojas grandes salpicadas de crema, como un cielo estrellado. Una de las plantas más buscadas por coleccionistas.",
    light:
      "Luz indirecta brillante, imprescindible para mantener su variegado. Evita el sol directo.",
    watering:
      "Riega cuando los primeros 3–5 cm del sustrato estén secos. Usa sustrato aireado y con buen drenaje.",
  },
  "orquidea-phalaenopsis-grande-fucsia": {
    description:
      "Orquídea Phalaenopsis de flores fucsia en varas largas. Sus flores duran semanas y es un regalo elegante para cualquier ocasión.",
    light:
      "Luz indirecta brillante, junto a una ventana con cortina. El sol directo quema sus hojas.",
    watering:
      "Una vez por semana: sumerge la maceta en agua unos minutos y deja escurrir bien. Riega cuando las raíces se vean plateadas.",
  },
  "orquidea-phalaenopsis-mini-lila": {
    description:
      "Orquídea Phalaenopsis mini de flores lila. Compacta y delicada, perfecta para escritorios, mesas de noche y regalos.",
    light:
      "Luz indirecta brillante, junto a una ventana con cortina. El sol directo quema sus hojas.",
    watering:
      "Una vez por semana: sumerge la maceta en agua unos minutos y deja escurrir bien. Riega cuando las raíces se vean plateadas.",
  },
  "peperomia-lemon": {
    description:
      "Peperomia de hojas carnosas verde limón. Compacta, resistente y perfecta para escritorios y repisas.",
    light: "Luz indirecta media o brillante, sin sol directo.",
    watering: riegoPeperomia,
  },
  "peperomia-sandia": {
    description:
      "Peperomia de hojas redondas con rayas plateadas que recuerdan a una sandía. Pequeña, original y fácil de cuidar.",
    light: "Luz indirecta media o brillante, sin sol directo.",
    watering: riegoPeperomia,
  },
  "peperomia-verde": {
    description:
      "Peperomia de hojas carnosas verde brillante. Muy resistente y de bajo mantenimiento, ideal para empezar con plantas.",
    light: "Luz indirecta media o brillante, sin sol directo.",
    watering: riegoPeperomia,
  },
  "philodendron-moonlight": {
    description:
      "Philodendron de hojas verde lima brillante; las hojas nuevas nacen casi amarillas. Compacto, alegre y muy fácil de cuidar.",
    light:
      "Luz indirecta brillante para mantener su color lima, sin sol directo.",
    watering:
      "Riega cuando los primeros 2–3 cm del sustrato estén secos, aprox. una vez por semana.",
  },
  syngonium: {
    description:
      "Planta de hojas en forma de flecha que cambian de forma al crecer. Fácil de cuidar, puede crecer compacta, colgante o trepadora.",
    light: luzIndirectaMedia,
    watering:
      "Mantén el sustrato ligeramente húmedo; riega cuando la superficie esté seca, una o dos veces por semana.",
  },
  tradescantia: {
    description:
      "Planta colgante de crecimiento rápido con hojas de colores. Muy fácil de cuidar y de multiplicar por esquejes.",
    light:
      "Luz indirecta brillante para que sus colores sean intensos; con poca luz se alarga y pierde color.",
    watering:
      "Riega cuando la superficie del sustrato esté seca. Evita mojar el centro de la planta.",
  },
  "zamioculca-negra": {
    description:
      "Zamioculca de hojas negras y brillantes, de estilo moderno. Casi indestructible: aguanta poca luz y largos periodos sin riego.",
    light: "Desde luz indirecta brillante hasta rincones con poca luz. Evita el sol directo.",
    watering: riegoZamioculca,
  },
  "zamioculca-verde": {
    description:
      "Zamioculca de hojas verdes, brillantes y carnosas. Ideal para oficinas y para quienes empiezan con plantas: necesita muy poco cuidado.",
    light: "Desde luz indirecta brillante hasta rincones con poca luz. Evita el sol directo.",
    watering: riegoZamioculca,
  },
};
