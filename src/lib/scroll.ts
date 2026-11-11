// Ids de las secciones de la portada (se usan en los enlaces "/#catalogo", etc.).
export const SECTION_IDS = {
  inicio: "inicio",
  masVendidos: "mas-vendidos",
  catalogo: "catalogo",
  contacto: "contacto",
} as const;

// Desplaza la página suavemente hasta el catálogo.
export function scrollToCatalog() {
  requestAnimationFrame(() => {
    document.getElementById(SECTION_IDS.catalogo)?.scrollIntoView({ behavior: "smooth" });
  });
}
