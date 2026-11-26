// Arma el catálogo de la web juntando:
//   data/inventario.ts (Excel: precios y textos) + data/plantas.ts (qué plantas
//   se muestran y textos de respaldo) + data/fotos.ts (fotos).
// No hace falta editar este archivo para agregar o cambiar plantas.

import { fotosPorPlanta } from "../data/fotos.ts";
import { inventario } from "../data/inventario.ts";
import { masVendidos, plantas } from "../data/plantas.ts";
import { referenciales } from "../data/referenciales.ts";
import type { ItemInventario, Plant, PlantaDatos, PlantSize } from "../types/plant.ts";

const normalizar = (texto: string) =>
  texto
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();

const porNombre = new Map(inventario.map((item) => [normalizar(item.nombre), item]));

// Productos del Excel que corresponden a una planta de la web.
function itemsDelExcel(planta: PlantaDatos): ItemInventario[] {
  const nombres = planta.nombresEnInventario ?? [planta.nombre];
  return nombres
    .map((nombre) => porNombre.get(normalizar(nombre)))
    .filter((item) => item !== undefined);
}

// Plantas de data/plantas.ts que no se encontraron en el Excel (aviso al compilar).
export const sinExcel: string[] = [];
// Plantas con precio manual distinto al del Excel (aviso al compilar).
export const precioManualDistinto: string[] = [];

// Nombres de tamaño por defecto, según cuántos precios tenga la planta.
const TAMANOS: Record<number, string[]> = {
  2: ["Pequeño", "Grande"],
  3: ["Pequeño", "Mediano", "Grande"],
  4: ["Pequeño", "Mediano", "Grande", "Extra grande"],
};

function tamanos(precios: number[], nombres?: string[]): PlantSize[] {
  if (precios.length < 2) return [];
  const etiquetas =
    nombres?.length === precios.length
      ? nombres
      : (TAMANOS[precios.length] ?? precios.map((_, i) => `Tamaño ${i + 1}`));
  return precios.map((price, i) => ({ label: etiquetas[i], price }));
}

// Plantas con fotos propias del vivero, en el orden de data/plantas.ts.
const fotografiadas: Plant[] = plantas
  .map((planta): Plant => {
    const items = itemsDelExcel(planta);
    if (items.length === 0) sinExcel.push(planta.nombre);
    const excel = items[0];

    const preciosExcel = [...new Set(items.flatMap((item) => item.precios))].sort((a, b) => a - b);
    const prices = planta.precios ? [...planta.precios].sort((a, b) => a - b) : preciosExcel;
    if (planta.precios && prices.join() !== preciosExcel.join()) {
      precioManualDistinto.push(`${planta.nombre} (web ${prices.join("/")}, Excel ${preciosExcel.join("/")})`);
    }
    const nombresTamano = !planta.precios && items.length === 1 ? excel?.tamanos : undefined;

    return {
      slug: planta.slug,
      name: planta.nombre,
      category: excel?.categoria ?? planta.categoria,
      prices,
      sizes: tamanos(prices, nombresTamano),
      images: fotosPorPlanta[planta.slug] ?? [],
      shipsNationwide: planta.envioNacional ?? true,
      scientificName: excel?.nombreCientifico,
      description: excel?.descripcion ?? planta.descripcion,
      light: excel?.luz ?? planta.luz,
      watering: excel?.riego ?? planta.riego,
      height: excel?.altura,
      careTips: excel?.cuidados ?? [],
    };
  })
  .filter((plant) => plant.images.length > 0);

// Plantas del Excel que aún no tienen fotos propias (data/referenciales.ts):
// usan una foto referencial de Wikimedia Commons, o el aviso "Foto pronto".
const SIN_FOTO = "/Web/ref/sin-foto.webp";
const SIN_TEXTO = "Escríbenos por WhatsApp y te contamos cómo cuidarla.";

const deReferencia: Plant[] = referenciales.flatMap((r): Plant[] => {
  const excel = porNombre.get(normalizar(r.nombre));
  if (!excel) return [];
  const prices = [...excel.precios].sort((a, b) => a - b);
  const propias = r.fotosDe ? fotosPorPlanta[r.fotosDe] : undefined;
  return [
    {
      slug: r.slug,
      name: r.nombre,
      category: excel.categoria ?? "Otros",
      prices,
      sizes: tamanos(prices, excel.tamanos),
      images: propias ?? [r.foto ?? SIN_FOTO],
      shipsNationwide: true,
      scientificName: excel.nombreCientifico,
      description: excel.descripcion ?? SIN_TEXTO,
      light: excel.luz ?? SIN_TEXTO,
      watering: excel.riego ?? SIN_TEXTO,
      height: excel.altura,
      careTips: excel.cuidados ?? [],
      referencial: !propias,
      credito: propias ? undefined : r.credito,
    },
  ];
});

// Todo lo demás del Excel (macetas, sustratos, líquidos, parantes…): usa la foto
// de su categoría (public/categorias/<categoria>.webp).
const yaIncluidos = new Set([...fotografiadas, ...deReferencia].flatMap((p) => [normalizar(p.name)]));
for (const planta of plantas) for (const nombre of planta.nombresEnInventario ?? []) yaIncluidos.add(normalizar(nombre));
const slugDe = (t: string) => normalizar(t).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const NO_PLANTAS = ["Macetas", "Sustratos y abonos", "Líquidos", "Parantes"];
// Categorías que por ahora van sin foto (lista con precios). Para darles foto,
// quítalas de aquí y pon public/categorias/<categoria>.webp o fotos propias.
export const CATEGORIAS_SIN_FOTO = ["Macetas", "Sustratos y abonos", "Líquidos", "Parantes"];

const productos: Plant[] = inventario
  .filter((i) => !yaIncluidos.has(normalizar(i.nombre)))
  .map((i): Plant => {
    const categoria = i.categoria ?? "Otros";
    const prices = [...i.precios].sort((a, b) => a - b);
    return {
      slug: slugDe(i.nombre),
      name: i.nombre,
      category: categoria,
      prices,
      sizes: tamanos(prices, i.tamanos),
      images: CATEGORIAS_SIN_FOTO.includes(categoria) ? [] : [`/categorias/${slugDe(categoria)}.webp`],
      shipsNationwide: true,
      scientificName: i.nombreCientifico,
      description: i.descripcion ?? "Pregúntanos por WhatsApp por medidas, colores y disponibilidad.",
      light: i.luz ?? "",
      watering: i.riego ?? "",
      height: i.altura,
      careTips: i.cuidados ?? [],
      esProducto: NO_PLANTAS.includes(categoria) || !i.luz,
    };
  });

// Todo el catálogo: primero las fotografiadas en el vivero, luego las de foto
// referencial y al final los demás productos.
export const catalogo: Plant[] = [...fotografiadas, ...deReferencia, ...productos];

// Top de ventas en su orden (solo las que se muestran en la web).
export const bestSellers: Plant[] = masVendidos
  .map((slug) => catalogo.find((plant) => plant.slug === slug))
  .filter((plant) => plant !== undefined);

// Categorías con al menos un producto, en este orden (las nuevas del Excel van al final).
const ORDEN_CATEGORIAS = ["Interior", "Flores y exterior", "Palmeras", "Frutales", "Aromáticas", "Macetas", "Sustratos y abonos", "Líquidos", "Parantes", "Otros"];
export const categories: string[] = [...new Set(catalogo.map((plant) => plant.category))].sort(
  (a, b) => (ORDEN_CATEGORIAS.indexOf(a) + 1 || 99) - (ORDEN_CATEGORIAS.indexOf(b) + 1 || 99),
);

export function findPlant(slug: string | undefined): Plant | undefined {
  return catalogo.find((plant) => plant.slug === slug);
}
