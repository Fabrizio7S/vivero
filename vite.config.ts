import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { catalogo } from "./src/data/catalogo";
import {
  homeSeo,
  productSeo,
  renderFallback,
  renderHead,
  renderSitemap,
  type PageSeo,
} from "./src/seo";
import type { Plant } from "./src/types/plant";

function fillPage(html: string, seo: PageSeo, plant?: Plant): string {
  return html
    .replace(
      /<!--seo:start-->[\s\S]*?<!--seo:end-->/,
      `<!--seo:start-->${renderHead(seo)}<!--seo:end-->`,
    )
    .replace(
      /<!--app:start-->[\s\S]*?<!--app:end-->/,
      `<!--app:start-->${renderFallback(seo, plant)}<!--app:end-->`,
    );
}

// SEO al compilar:
// - Portada: título, descripción, Open Graph y datos estructurados en index.html.
// - Una página HTML por planta (dist/producto/<slug>.html) con sus propios datos,
//   para que Google vea cada planta aunque no ejecute JavaScript.
// - sitemap.xml con todas las páginas.
function seoPlugin(): Plugin {
  let outDir = "dist";
  let isBuild = false;

  return {
    name: "vivero-seo",
    configResolved(config) {
      outDir = join(config.root, config.build.outDir);
      isBuild = config.command === "build";
    },
    transformIndexHtml(html) {
      return fillPage(html, homeSeo());
    },
    closeBundle() {
      if (!isBuild) return;

      const template = readFileSync(join(outDir, "index.html"), "utf8");
      mkdirSync(join(outDir, "producto"), { recursive: true });

      for (const plant of catalogo) {
        writeFileSync(
          join(outDir, "producto", `${plant.slug}.html`),
          fillPage(template, productSeo(plant), plant),
        );
      }

      const today = new Date().toISOString().slice(0, 10);
      writeFileSync(join(outDir, "sitemap.xml"), renderSitemap(today));

      console.log(`SEO: ${catalogo.length} páginas de plantas y sitemap.xml generados.`);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoPlugin()],
});
