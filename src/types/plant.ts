// Producto del inventario (src/data/inventario.ts, generado desde el Excel).
export interface ItemInventario {
  categoria?: string;
  nombre: string;
  // Varios precios = tamaños distintos (ordenados de menor a mayor).
  precios: number[];
  nombreCientifico?: string;
  descripcion?: string;
  luz?: string;
  riego?: string;
  altura?: string;
  stock?: string;
  cuidados?: string[];
}

// Datos de una planta tal como se escriben en src/data/plantas.ts.
// Precio y textos salen del Excel; los textos de aquí se usan solo si el Excel
// todavía no los tiene para esa planta.
export interface PlantaDatos {
  slug: string;
  nombre: string;
  categoria: string;
  // Nombre(s) exactos en el Excel, si son distintos a `nombre`.
  nombresEnInventario?: string[];
  // Por defecto todas tienen envío a todo el Perú.
  envioNacional?: boolean;
  descripcion: string;
  luz: string;
  riego: string;
}

// Planta lista para mostrarse en la web (datos + precios + fotos).
// La arma src/lib/catalogo.ts; los componentes usan este tipo.
export interface Plant {
  slug: string;
  name: string;
  category: string;
  // Vacío = "Consultar precio"; varios = según tamaño (ordenados de menor a mayor).
  prices: number[];
  images: string[];
  shipsNationwide: boolean;
  scientificName?: string;
  description: string;
  light: string;
  watering: string;
  height?: string;
  careTips: string[];
}
