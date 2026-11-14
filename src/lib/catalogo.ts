// Arma el catálogo de la web juntando:
//   data/inventario.ts (Excel: precios y textos) + data/plantas.ts (qué plantas
//   se muestran y textos de respaldo) + data/fotos.ts (fotos).
// No hace falta editar este archivo para agregar o cambiar plantas.

import { fotosPorPlanta } from "../data/fotos.ts";
import { inventario } from "../data/inventario.ts";
import { masVendidos, plantas } from "../data/plantas.ts";
import type { ItemInventario, Plant, PlantaDatos } from "../types/plant.ts";

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

// Todas las plantas con al menos una foto, en el orden de data/plantas.ts.
export const catalogo: Plant[] = plantas
  .map((planta): Plant => {
    const items = itemsDelExcel(planta);
    if (items.length === 0) sinExcel.push(planta.nombre);
    const excel = items[0];

    return {
      slug: planta.slug,
      name: planta.nombre,
      category: excel?.categoria ?? planta.categoria,
      prices: [...new Set(items.flatMap((item) => item.precios))].sort((a, b) => a - b),
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
