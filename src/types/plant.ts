// Fila del inventario (src/data/inventario.ts, copia del Excel).
export interface ItemInventario {
  categoria: string;
  nombre: string;
  precio: number;
}

// Datos de una planta tal como se escriben en src/data/plantas.ts.
export interface PlantaDatos {
  slug: string;
  nombre: string;
  categoria: string;
  // Nombre(s) en el inventario de los que se toma el precio.
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
  description: string;
  light: string;
  watering: string;
}
