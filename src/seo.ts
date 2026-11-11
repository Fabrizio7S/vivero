// Datos SEO de cada página (título, descripción, imagen y datos estructurados).
// Se usan en dos sitios:
//  - Al compilar (vite.config.ts): se escriben en el HTML de cada página para Google.
//  - En el navegador (usePageSeo): se actualizan al navegar sin recargar.

import { catalogo } from "./data/catalogo";
import { redesSociales } from "./data/redes";
import type { Plant } from "./types/plant";

export const SITE_URL = "https://www.viveronativa.com";
export const SITE_NAME = "Vivero Nativa";

const SHARE_IMAGE = `${SITE_URL}/marca/compartir.jpg`;
const LOGO = `${SITE_URL}/marca/logo-cuadrado.png`;

export const HOME_KEYWORDS = [
  "Vivero Nativa",
  "vivero en Lurín",
  "vivero en Lima",
  "venta de plantas",
  "plantas de interior",
  "plantas a domicilio",
  "envío de plantas a todo el Perú",
  "anturios",
  "helechos",
  "calatheas",
  "monstera",
  "begonias",
].join(", ");

export interface PageSeo {
  path: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  type: "website" | "product";
  noindex?: boolean;
  jsonLd: Record<string, unknown>[];
}

const absolute = (path: string) => `${SITE_URL}${path}`;

// Corta un texto a `max` caracteres sin partir palabras.
function truncate(text: string, max = 160): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:]$/, "")}…`;
}

function priceText(prices: number[]): string {
  if (prices.length === 0) return "";
  if (prices.length === 1) return ` a S/ ${prices[0]}`;
  return ` desde S/ ${prices[0]}`;
}

const viveroId = `${SITE_URL}/#vivero`;

const vivero = {
  "@type": "GardenStore",
  "@id": viveroId,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: LOGO,
  image: SHARE_IMAGE,
  telephone: "+51994684483",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Casica - Poro Portón",
    addressLocality: "Lurín",
    addressRegion: "Lima",
    postalCode: "15823",
    addressCountry: "PE",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "08:00",
    closes: "18:00",
  },
  areaServed: { "@type": "Country", name: "Perú" },
  sameAs: redesSociales.map((red) => red.url),
};

export function homeSeo(): PageSeo {
  return {
    path: "/",
    title: "Vivero Nativa | Venta de plantas de interior en Lima",
    description:
      "Vivero en Lurín, Lima. Anturios, helechos, calatheas, monsteras, begonias y más plantas de interior con envío a todo el Perú. Pide por WhatsApp.",
    image: SHARE_IMAGE,
    imageAlt: "Plantas de interior de Vivero Nativa",
    type: "website",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        inLanguage: "es-PE",
        publisher: { "@id": viveroId },
      },
      { "@context": "https://schema.org", ...vivero },
    ],
  };
}

export function productSeo(plant: Plant): PageSeo {
  const url = absolute(`/producto/${plant.slug}`);
  const images = plant.images.map(absolute);

  const offers =
    plant.prices.length === 0
      ? undefined
      : plant.prices.length === 1
        ? {
            "@type": "Offer",
            url,
            price: plant.prices[0],
            priceCurrency: "PEN",
            availability: "https://schema.org/InStock",
            seller: { "@id": viveroId },
          }
        : {
            "@type": "AggregateOffer",
            url,
            lowPrice: plant.prices[0],
            highPrice: plant.prices[plant.prices.length - 1],
            offerCount: plant.prices.length,
            priceCurrency: "PEN",
            availability: "https://schema.org/InStock",
            seller: { "@id": viveroId },
          };

  // Google muestra unos 60 caracteres del título: si no cabe, versión corta.
  const longTitle = `${plant.name} – precio y cuidados | ${SITE_NAME}`;
  const title = longTitle.length <= 60 ? longTitle : `${plant.name} | ${SITE_NAME}`;

  return {
    path: `/producto/${plant.slug}`,
    title,
    description: truncate(
      `${plant.name}${priceText(plant.prices)}, con envío a todo el Perú. ${plant.description}`,
    ),
    image: images[0] ?? SHARE_IMAGE,
    imageAlt: plant.name,
    type: "product",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Product",
        name: plant.name,
        description: plant.description || undefined,
        image: images,
        url,
        category: plant.category,
        brand: { "@type": "Brand", name: SITE_NAME },
        offers,
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: plant.name, item: url },
        ],
      },
    ],
  };
}

export function notFoundSeo(): PageSeo {
  return {
    ...homeSeo(),
    path: "/404",
    title: `Página no encontrada | ${SITE_NAME}`,
    noindex: true,
    jsonLd: [],
  };
}

export function findPlant(slug: string | undefined): Plant | undefined {
  return catalogo.find((plant) => plant.slug === slug);
}

// ---------- Solo para el HTML que se genera al compilar ----------

const escapeHtml = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// JSON seguro dentro de <script> (evita que "</script>" cierre la etiqueta).
const safeJson = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");

export function renderHead(seo: PageSeo): string {
  const url = absolute(seo.path === "/" ? "/" : seo.path);
  const lines = [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    seo.path === "/" ? `<meta name="keywords" content="${escapeHtml(HOME_KEYWORDS)}" />` : "",
    `<meta name="robots" content="${seo.noindex ? "noindex" : "index, follow, max-image-preview:large"}" />`,
    seo.noindex ? "" : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="es_PE" />`,
    `<meta property="og:type" content="${seo.type === "product" ? "product" : "website"}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${seo.image}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(seo.imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    ...seo.jsonLd.map((data) => `<script type="application/ld+json">${safeJson(data)}</script>`),
  ];
  return lines.filter(Boolean).join("\n    ");
}

// Contenido en HTML puro dentro de <div id="root">, para buscadores que no
// ejecutan JavaScript. React lo reemplaza en cuanto carga la página.
export function renderFallback(seo: PageSeo, plant?: Plant): string {
  const box = 'style="max-width:72rem;margin:0 auto;padding:2.5rem 1rem;line-height:1.6"';

  if (plant) {
    return `<main ${box}>
      <h1>${escapeHtml(plant.name)}</h1>
      <img src="${plant.images[0]}" alt="${escapeHtml(plant.name)}" width="1200" height="1200" style="max-width:320px;height:auto" />
      <p>${escapeHtml(plant.description)}</p>
      <p><strong>Iluminación:</strong> ${escapeHtml(plant.light)}</p>
      <p><strong>Riego:</strong> ${escapeHtml(plant.watering)}</p>
      <p>Envío a todo el Perú.</p>
      <p><a href="/">Ver todas las plantas de Vivero Nativa</a></p>
    </main>`;
  }

  const links = catalogo
    .map((p) => `<li><a href="/producto/${p.slug}">${escapeHtml(p.name)}</a></li>`)
    .join("");

  return `<main ${box}>
      <h1>Descubre nuestra colección de plantas</h1>
      <p>${escapeHtml(seo.description)}</p>
      <h2>Nuestras plantas</h2>
      <ul>${links}</ul>
    </main>`;
}

// Mapa del sitio. Las plantas nuevas se añaden solas: basta con agregarlas a
// src/data/catalogo.ts y poner sus fotos en public/Web. Para una página nueva
// (por ejemplo /nosotros), añádela a la lista `pages` de esta función.
export function renderSitemap(lastmod: string): string {
  const pages = [
    { loc: `${SITE_URL}/`, images: [SHARE_IMAGE] },
    ...catalogo.map((plant) => ({
      loc: absolute(`/producto/${plant.slug}`),
      images: plant.images.map(absolute),
    })),
  ];

  const urls = pages
    .map(
      (page) => `  <url>
    <loc>${page.loc}</loc>
    <lastmod>${lastmod}</lastmod>
${page.images.map((img) => `    <image:image><image:loc>${img}</image:loc></image:image>`).join("\n")}
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;
}
