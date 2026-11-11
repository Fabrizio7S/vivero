// Lee las fotos de public/Web y genera src/data/fotos.ts.
// Formato esperado de cada archivo: <slug-de-la-planta>-<numero>-<vista>.webp
// Ejemplo: anturio-rojo-1-frontal.webp
// Se ejecuta solo antes de `npm run dev` y `npm run build`.

import { readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const carpetaFotos = join(root, "public", "Web");
const salida = join(root, "src", "data", "fotos.ts");

const patron = /^(.+)-(\d+)-[a-z]+\.(webp|jpe?g|png)$/i;
const fotos = {};
const ignoradas = [];

for (const archivo of readdirSync(carpetaFotos).sort()) {
  const coincidencia = archivo.match(patron);

  if (!coincidencia) {
    ignoradas.push(archivo);
    continue;
  }

  const [, slug, numero] = coincidencia;
  (fotos[slug] ??= []).push({ numero: Number(numero), url: `/Web/${archivo}` });
}

const lineas = Object.keys(fotos)
  .sort()
  .map((slug) => {
    const urls = fotos[slug]
      .sort((a, b) => a.numero - b.numero)
      .map((foto) => `    "${foto.url}",`)
      .join("\n");
    return `  "${slug}": [\n${urls}\n  ],`;
  });

writeFileSync(
  salida,
  `// Archivo generado por scripts/generar-fotos.mjs. No editar a mano.\n\n` +
    `export const fotosPorPlanta: Record<string, string[]> = {\n${lineas.join("\n")}\n};\n`,
);

console.log(`Fotos: ${Object.keys(fotos).length} plantas encontradas en public/Web.`);

if (ignoradas.length > 0) {
  console.warn(`Archivos con nombre no reconocido (ignorados): ${ignoradas.join(", ")}`);
}
