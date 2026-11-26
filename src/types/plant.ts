// Producto del inventario (src/data/inventario.ts, generado desde el Excel).
export interface ItemInventario {
  categoria?: string;
  nombre: string;
  // Varios precios = tamaños distintos (ordenados de menor a mayor).
  precios: number[];
  // Nombre de cada tamaño, en el mismo orden (solo si el Excel tiene columna "Tamaño").
  tamanos?: string[];
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
  // Precios manuales: tienen prioridad sobre el Excel. Usar solo mientras se
  // corrige el Excel (al compilar se avisa si no coinciden).
  precios?: number[];
  // Por defecto todas tienen envío a todo el Perú.
  envioNacional?: boolean;
  descripcion: string;
  luz: string;
  riego: string;
}

export interface PlantSize {
  label: string;
  price: number;
}

// Planta lista para mostrarse en la web (datos + precios + fotos).
// La arma src/lib/catalogo.ts; los componentes usan este tipo.
export interface Plant {
  slug: string;
  name: string;
  category: string;
  // Vacío = "Consultar precio"; varios = según tamaño (ordenados de menor a mayor).
  prices: number[];
  // Un tamaño por precio, en el mismo orden (ej. Pequeño S/ 30, Grande S/ 80).
  sizes: PlantSize[];
  images: string[];
  shipsNationwide: boolean;
  scientificName?: string;
  description: string;
  light: string;
  watering: string;
  height?: string;
  careTips: string[];
  // Foto que no es del vivero (Wikimedia Commons) o falta de foto: se muestra
  // la etiqueta "Foto referencial" y el crédito del autor.
  referencial?: boolean;
  credito?: CreditoFoto;
  // Producto que no es planta (maceta, sustrato…): usa la foto de su categoría
  // y no muestra luz ni riego.
  esProducto?: boolean;
}

export interface CreditoFoto {
  autor: string;
  licencia: string;
  fuente: string; // página del archivo en Wikimedia Commons
}
