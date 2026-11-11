// Último paso de `npm run build`.
// Escribe el HTML con el diseño real de cada página dentro de <div id="root">:
//   dist/index.html            -> portada
//   dist/producto/<slug>.html  -> ficha de cada planta
// Así la página se ve completa al instante; luego React la "activa" (hydrate).

import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const serverDir = join(root, "dist-server");
const { render, routes } = await import(pathToFileURL(join(serverDir, "entry-server.js")).href);

const fileFor = (route) =>
  route === "/" ? join(root, "dist", "index.html") : join(root, "dist", `${route}.html`);

for (const route of routes) {
  const file = fileFor(route);
  const html = readFileSync(file, "utf8");
  const appHtml = render(route);

  const result = html
    // data-ssr: le dice al navegador para qué dirección se generó este HTML.
    .replace('<div id="root">', `<div id="root" data-ssr="${route}">`)
    .replace(/<!--app:start-->[\s\S]*?<!--app:end-->/, () => appHtml);

  if (result === html) throw new Error(`No se pudo insertar el HTML en ${file}`);
  writeFileSync(file, result);
}

// La carpeta del render en servidor ya no se necesita.
rmSync(serverDir, { recursive: true, force: true });
console.log(`Prerender: ${routes.length} páginas con el diseño completo.`);
