import type { Plant } from "../types/plant";
import { descripciones } from "./descripciones";
import { fotosPorPlanta } from "./fotos";
import { plants as inventario } from "./plants";

// Plantas que se pueden mostrar en la web.
// - `slug` debe coincidir con el inicio del nombre de sus fotos en public/Web
//   (ej. "anturio-rojo" -> anturio-rojo-1-frontal.webp).
// - `inventario` son los nombres exactos del Excel de los que se toma el precio.
//   Si no hay ninguno, la web muestra "Consultar precio".
// - `envioNacional`: todas tienen envío a todo el Perú; poner `false` si alguna no.
// - Una planta solo aparece si tiene al menos una foto.
interface EntradaCatalogo {
  slug: string;
  name: string;
  category: string;
  inventario?: string[];
  envioNacional?: boolean;
  shortDescription?: string;
  description?: string;
  light?: string;
  watering?: string;
}

const entradas: EntradaCatalogo[] = [
  { slug: "aglaonema-blanco", name: "Aglaonema Blanco", category: "Interior" },
  { slug: "aglaonema-roja-vena", name: "Aglaonema Roja Vena", category: "Interior", inventario: ["Aglaonema Roja y Rosada Tallo"] },
  { slug: "aglaonema-rosada-dud", name: "Aglaonema Rosada Dud", category: "Interior", inventario: ["Aglaonema Rosada"] },
  { slug: "aglaonema-rosada-legacy", name: "Aglaonema Rosada Legacy", category: "Interior", inventario: ["Aglaonema Rosada"] },
  { slug: "alocasia-amazonica", name: "Alocasia Amazónica", category: "Interior", inventario: ["Alocasia Amazónica"] },
  { slug: "alocasia-frydek", name: "Alocasia Frydek", category: "Interior", inventario: ["Alocasia Frydek"] },
  { slug: "anturio-amarillo", name: "Anturio Amarillo", category: "Interior", inventario: ["Anturio"] },
  { slug: "anturio-chocolate", name: "Anturio Chocolate", category: "Interior", inventario: ["Anturio"] },
  { slug: "anturio-magnifico", name: "Anturio Magnífico", category: "Interior", inventario: ["Anturio"] },
  { slug: "anturio-morado", name: "Anturio Morado", category: "Interior", inventario: ["Anturio"] },
  { slug: "anturio-rojo", name: "Anturio Rojo", category: "Interior", inventario: ["Anturio"] },
  { slug: "anturio-rosado", name: "Anturio Rosado", category: "Interior", inventario: ["Anturio"] },
  { slug: "bambu-de-la-suerte", name: "Bambú de la Suerte", category: "Interior" },
  { slug: "begonia-cruz-de-hierro", name: "Begonia Cruz de Hierro", category: "Interior", inventario: ["Begonias"] },
  { slug: "begonia-rex-fucsia", name: "Begonia Rex Fucsia", category: "Interior", inventario: ["Begonias"] },
  { slug: "begonia-rex-roja", name: "Begonia Rex Roja", category: "Interior", inventario: ["Begonias"] },
  { slug: "begonia-rex-rosada", name: "Begonia Rex Rosada", category: "Interior", inventario: ["Begonias"] },
  { slug: "boa-dorada", name: "Boa Dorada", category: "Interior" },
  { slug: "boa-limon", name: "Boa Limón", category: "Interior" },
  { slug: "boa-marble-queen", name: "Boa Marble Queen", category: "Interior", inventario: ["Boa Marble Queen"] },
  { slug: "caladium-blanco", name: "Caladium Blanco", category: "Interior" },
  { slug: "caladium-blanco-sirena", name: "Caladium Blanco Sirena", category: "Interior" },
  { slug: "caladium-chispeado", name: "Caladium Chispeado", category: "Interior" },
  { slug: "caladium-panuelo", name: "Caladium Pañuelo", category: "Interior" },
  { slug: "caladium-rojo", name: "Caladium Rojo", category: "Interior" },
  { slug: "calathea-medallion", name: "Calathea Medallion", category: "Interior" },
  { slug: "calathea-pavo-real", name: "Calathea Pavo Real", category: "Interior", inventario: ["Calathea Pavo Real"] },
  { slug: "calathea-triostar", name: "Calathea Trio Star", category: "Interior", inventario: ["Calathea Trio Star"] },
  { slug: "caucho-negro", name: "Caucho Negro", category: "Interior" },
  { slug: "cinta-de-novia", name: "Cinta de Novia", category: "Flores y exterior", inventario: ["Cinta de Novia"] },
  { slug: "cuna-de-moises-variegado", name: "Cuna de Moisés Variegado", category: "Interior" },
  { slug: "dieffenbachia", name: "Dieffenbachia", category: "Interior" },
  { slug: "ficus-tineke", name: "Ficus Tineke", category: "Interior" },
  { slug: "fittonia-amarilla", name: "Fittonia Amarilla", category: "Interior" },
  { slug: "fittonia-blanca-grande", name: "Fittonia Blanca Grande", category: "Interior" },
  { slug: "fittonia-roja-mini", name: "Fittonia Roja Mini", category: "Interior" },
  { slug: "fittonia-verde-mini", name: "Fittonia Verde Mini", category: "Interior" },
  { slug: "helecho-aleman", name: "Helecho Alemán", category: "Interior" },
  { slug: "helecho-angora-variegado", name: "Helecho Angora Variegado", category: "Interior" },
  { slug: "helecho-babilonico", name: "Helecho Babilónico", category: "Interior", inventario: ["Helecho Babilónico"] },
  { slug: "hiedra-vinca", name: "Hiedra Vinca", category: "Interior", inventario: ["Hiedra Vincas"] },
  { slug: "llama-plata", name: "Llama Plata", category: "Interior" },
  { slug: "monstera-adansonii", name: "Monstera Adansonii", category: "Interior" },
  { slug: "monstera-thai-constellation", name: "Monstera Thai Constellation", category: "Interior", inventario: ["Monstera Thai Constellation"] },
  { slug: "orquidea-phalaenopsis-grande-fucsia", name: "Orquídea Phalaenopsis Grande Fucsia", category: "Interior", inventario: ["Orquídea"] },
  { slug: "orquidea-phalaenopsis-mini-lila", name: "Orquídea Phalaenopsis Mini Lila", category: "Interior", inventario: ["Orquídea"] },
  { slug: "peperomia-lemon", name: "Peperomia Lemon", category: "Interior", inventario: ["Peperomia Lemon"] },
  { slug: "peperomia-sandia", name: "Peperomia Sandía", category: "Interior", inventario: ["Peperomia Sandía"] },
  { slug: "peperomia-verde", name: "Peperomia Verde", category: "Interior", inventario: ["Peperomia Verde"] },
  { slug: "philodendron-moonlight", name: "Philodendron Moonlight", category: "Interior", inventario: ["Filodendro Lemon"] },
  { slug: "syngonium", name: "Syngonium", category: "Interior", inventario: ["Syngonium Pink", "Syngonium Variegado", "Syngonium Confeti", "Syngonium Milk Confeti", "Syngonium Pink Robusta"] },
  { slug: "tradescantia", name: "Tradescantia", category: "Interior", inventario: ["Tradescantia"] },
  { slug: "zamioculca-negra", name: "Zamioculca Negra", category: "Interior" },
  { slug: "zamioculca-verde", name: "Zamioculca Verde", category: "Interior" },
];

// Top de ventas, en orden. Es lo primero que ve el cliente en el catálogo.
export const masVendidos: string[] = [
  "helecho-babilonico",
  "hiedra-vinca",
  "anturio-rojo",
  "caladium-blanco",
];

function preciosDelInventario(nombres: string[] = []): number[] {
  const precios = inventario
    .filter((item) => nombres.includes(item.name))
    .map((item) => item.price);

  return [...new Set(precios)].sort((a, b) => a - b);
}

export const catalogo: Plant[] = entradas
  .map((entrada) => ({
    slug: entrada.slug,
    name: entrada.name,
    category: entrada.category,
    prices: preciosDelInventario(entrada.inventario),
    images: fotosPorPlanta[entrada.slug] ?? [],
    shipsNationwide: entrada.envioNacional ?? true,
    shortDescription: entrada.shortDescription ?? "",
    description: entrada.description ?? descripciones[entrada.slug]?.description ?? "",
    light: entrada.light ?? descripciones[entrada.slug]?.light ?? "",
    watering: entrada.watering ?? descripciones[entrada.slug]?.watering ?? "",
  }))
  .filter((planta) => planta.images.length > 0);
