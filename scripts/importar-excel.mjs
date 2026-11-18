// Importa el Excel "Catálogo Vivero Nativa (web)" y genera src/data/inventario.ts.
//
// Cómo actualizar precios y textos:
//   1. En Google Sheets: Archivo → Descargar → Valores separados por comas (.csv)
//   2. Guarda el archivo como recursos/catalogo-excel.csv (reemplaza el anterior)
//   3. Ejecuta:  npm run excel
//
// También acepta otra ruta:  npm run excel -- C:\ruta\al\archivo.csv

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const csvPath = process.argv[2] ?? join(root, "recursos", "catalogo-excel.csv");
const salida = join(root, "src", "data", "inventario.ts");

// Lector de CSV que respeta comillas y saltos de línea dentro de una celda.
function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') {
        quoted = false;
      } else {
        cell += ch;
      }
    } else if (ch === '"') {
      quoted = true;
    } else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += ch;
    }
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim()));
}

const [header, ...lines] = parseCsv(readFileSync(csvPath, "utf8").replace(/^\uFEFF/, ""));
const findCol = (name) =>
  header.findIndex((h) => h.trim().toLowerCase() === name.toLowerCase());
const col = (name) => {
  const index = findCol(name);
  if (index === -1) throw new Error(`Falta la columna "${name}" en ${csvPath}`);
  return index;
};
// Columna opcional "Tamaño" (ej. Pequeño / Mediano / Grande). Si no existe,
// la web nombra los tamaños por precio.
const colTamano = findCol("Tamaño");

const C = {
  categoria: col("Categoría"),
  producto: col("Producto"),
  precio: col("Precio lista"),
  stock: col("Stock"),
  cientifico: col("Nombre científico"),
  descripcion: col("Descripción"),
  luz: col("Luz"),
  riego: col("Riego"),
  altura: col("Altura aproximada"),
  cuidados: col("Cuidados recomendados"),
};

const texto = (value) => (value ?? "").trim() || undefined;

// Un producto por nombre; si se repite con varios precios, son tamaños distintos.
const productos = new Map();
const sinPrecio = [];

for (const line of lines) {
  const nombre = texto(line[C.producto]);
  if (!nombre) continue;

  const precio = Number(String(line[C.precio]).replace(",", ".").replace(/[^\d.]/g, ""));
  if (!precio) sinPrecio.push(nombre);

  const item = productos.get(nombre) ?? {
    categoria: texto(line[C.categoria]),
    nombre,
    precios: [],
    tamanos: [],
  };
  if (precio && !item.precios.includes(precio)) {
    item.precios.push(precio);
    item.tamanos.push(colTamano === -1 ? "" : (texto(line[colTamano]) ?? ""));
  }

  // Los textos se toman de la primera fila del producto que los tenga.
  const cientifico = texto(line[C.cientifico]);
  // Los nombres marcados "por verificar" no se muestran en la web.
  if (cientifico && !/verificar/i.test(cientifico)) item.nombreCientifico ??= cientifico;
  item.descripcion ??= texto(line[C.descripcion]);
  item.luz ??= texto(line[C.luz]);
  item.riego ??= texto(line[C.riego]);
  item.altura ??= texto(line[C.altura]);
  item.stock ??= texto(line[C.stock]);

  const cuidados = (line[C.cuidados] ?? "")
    .split(/\n|•/)
    .map((c) => c.trim())
    .filter(Boolean);
  if (cuidados.length && !item.cuidados) item.cuidados = cuidados;

  productos.set(nombre, item);
}

// Precios de menor a mayor, con su tamaño al lado.
for (const item of productos.values()) {
  const pares = item.precios
    .map((precio, i) => ({ precio, tamano: item.tamanos[i] }))
    .sort((a, b) => a.precio - b.precio);
  item.precios = pares.map((p) => p.precio);
  // Solo se guardan los tamaños si el Excel los escribió todos.
  item.tamanos = pares.every((p) => p.tamano) ? pares.map((p) => p.tamano) : undefined;
}

const lista = [...productos.values()].map((item) =>
  // Sin campos vacíos, para que el archivo sea más fácil de leer.
  Object.fromEntries(Object.entries(item).filter(([, v]) => v !== undefined)),
);

writeFileSync(
  salida,
  `// ============================================================================
//  INVENTARIO — generado desde el Excel "Catálogo Vivero Nativa (web)".
//  NO EDITAR A MANO: cambia el Excel y ejecuta  npm run excel
//  (pasos en scripts/importar-excel.mjs). De aquí salen precios y textos.
// ============================================================================

import type { ItemInventario } from "../types/plant.ts";

export const inventario: ItemInventario[] = ${JSON.stringify(lista, null, 2)};
`,
);

console.log(`Excel: ${lista.length} productos importados a src/data/inventario.ts.`);
if (sinPrecio.length) console.warn(`Sin precio en el Excel: ${sinPrecio.join(", ")}`);
