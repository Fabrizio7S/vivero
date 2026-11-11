// Arma el catálogo de la web juntando:
//   data/plantas.ts (textos) + data/inventario.ts (precios) + data/fotos.ts (fotos).
// No hace falta editar este archivo para agregar o cambiar plantas.

import { fotosPorPlanta } from "../data/fotos.ts";
import { inventario } from "../data/inventario.ts";
import { masVendidos, plantas } from "../data/plantas.ts";
import type { Plant } from "../types/plant.ts";

function preciosDelInventario(nombres: string[] = []): number[] {
  const precios = inventario
    .filter((item) => nombres.includes(item.nombre))
    .map((item) => item.precio);

  return [...new Set(precios)].sort((a, b) => a - b);
}

// Todas las plantas con al menos una foto, en el orden de data/plantas.ts.
export const catalogo: Plant[] = plantas
  .map((planta) => ({
    slug: planta.slug,
    name: planta.nombre,
    category: planta.categoria,
    prices: preciosDelInventario(planta.nombresEnInventario),
    images: fotosPorPlanta[planta.slug] ?? [],
    shipsNationwide: planta.envioNacional ?? true,
    description: planta.descripcion,
    light: planta.luz,
    watering: planta.riego,
  }))
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
