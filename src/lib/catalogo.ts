// Arma el catálogo de la web juntando:
//   data/inventario.ts (Excel: precios y textos) + data/plantas.ts (qué plantas
//   se muestran y textos de respaldo) + data/fotos.ts (fotos).
// No hace falta editar este archivo para agregar o cambiar plantas.

import { fotosPorPlanta } from "../data/fotos.ts";
import { inventario } from "../data/inventario.ts";
import { masVendidos, plantas } from "../data/plantas.ts";
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

// Todas las plantas con al menos una foto, en el orden de data/plantas.ts.
export const catalogo: Plant[] = plantas
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

// Top de ventas en su orden (solo las que se muestran en la web).
export const bestSellers: Plant[] = masVendidos
  .map((slug) => catalogo.find((plant) => plant.slug === slug))
  .filter((plant) => plant !== undefined);

// Categorías que tienen al menos una planta, en orden de aparición.
export const categories: string[] = [...new Set(catalogo.map((plant) => plant.category))];

export function findPlant(slug: string | undefined): Plant | undefined {
  return catalogo.find((plant) => plant.slug === slug);
}
