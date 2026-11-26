import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { catalogo, precioManualDistinto, sinExcel } from "./src/lib/catalogo.ts";
import { creditsSeo, homeSeo, productSeo, renderHead, renderSitemap, type PageSeo } from "./src/lib/seo.ts";

// Escribe título, descripción, Open Graph y datos estructurados en el <head>.
function fillHead(html: string, seo: PageSeo): string {
  return html.replace(
    /<!--seo:start-->[\s\S]*?<!--seo:end-->/,
    `<!--seo:start-->${renderHead(seo)}<!--seo:end-->`,
  );
}

// SEO al compilar (`npm run build`):
// - Portada: datos SEO en index.html.
// - Una página HTML por planta (dist/producto/<slug>.html) con sus propios datos SEO.
// - sitemap.xml con todas las páginas.
// Después, scripts/prerender.mjs pone dentro de cada página el diseño completo.
function seoPlugin(): Plugin {
  let outDir = "dist";
  let isClientBuild = false;

  return {
    name: "vivero-seo",
    configResolved(config) {
      outDir = join(config.root, config.build.outDir);
      isClientBuild = config.command === "build" && !config.build.ssr;
    },
    transformIndexHtml(html) {
      return fillHead(html, homeSeo());
    },
    closeBundle() {
      if (!isClientBuild) return;

      const template = readFileSync(join(outDir, "index.html"), "utf8");
      mkdirSync(join(outDir, "producto"), { recursive: true });

      for (const plant of catalogo) {
        writeFileSync(
          join(outDir, "producto", `${plant.slug}.html`),
          fillHead(template, productSeo(plant)),
        );
      }
      writeFileSync(join(outDir, "creditos.html"), fillHead(template, creditsSeo()));

      const today = new Date().toISOString().slice(0, 10);
      writeFileSync(join(outDir, "sitemap.xml"), renderSitemap(today));

      console.log(`SEO: ${catalogo.length} páginas de plantas y sitemap.xml generados.`);

      // Avisos para revisar el Excel.
      if (sinExcel.length) console.warn(`No están en el Excel: ${sinExcel.join(", ")}`);
      if (precioManualDistinto.length)
        console.warn(`Precio manual distinto al Excel: ${precioManualDistinto.join("; ")}`);
      const sinPrecio = catalogo.filter((plant) => plant.prices.length === 0);
      if (sinPrecio.length) console.warn(`Sin precio: ${sinPrecio.map((p) => p.name).join(", ")}`);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoPlugin()],
});
