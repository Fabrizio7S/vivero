import type { Plant } from "../types/plant";

export const plants: Plant[] = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    slug: "monstera-deliciosa",
    category: "Interior",
    shortDescription: "Follaje grande y tropical para espacios luminosos.",
    description:
      "La Monstera Deliciosa es ideal para habitaciones con luz indirecta. Sus hojas grandes aportan un estilo tropical y fresco al hogar.",
    light: "Luz indirecta brillante",
    watering: "Cada 5-7 días",
    image: "",
  },
  {
    id: 2,
    name: "Suculenta Echeveria",
    slug: "suculenta-echeveria",
    category: "De bajo mantenimiento",
    shortDescription: "Compacta, decorativa y muy fácil de cuidar.",
    description:
      "La Echeveria forma rosetas muy vistosas y se adapta muy bien a ventanas soleadas y espacios pequeños.",
    light: "Luz directa o muy brillante",
    watering: "Cada 10-14 días",
    image: "",
  },
  {
    id: 3,
    name: "Helecho de Boston",
    slug: "helecho-de-boston",
    category: "Follaje",
    shortDescription: "Aporta textura suave y una sensación de frescura.",
    description:
      "Este helecho es perfecto para lugares con humedad y sombra indirecta. Realza ambientes relajados y naturales.",
    light: "Semisombra",
    watering: "2-3 veces por semana",
    image: "",
  },
];
