// Fila del inventario (Excel "Inventario Vivero Nativa").
export interface InventoryItem {
  id: number;
  name: string;
  slug: string;
  category: string;
  price: number;
  shortDescription: string;
  description: string;
  light: string;
  watering: string;
  image: string;
}

// Producto que se muestra en la web (solo los que tienen fotos).
export interface Plant {
  slug: string;
  name: string;
  category: string;
  // Precios del inventario. Vacío = "Consultar precio"; varios = según tamaño.
  prices: number[];
  images: string[];
  shortDescription: string;
  description: string;
  light: string;
  watering: string;
}
