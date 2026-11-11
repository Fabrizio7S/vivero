import { useEffect } from "react";
import { SITE_URL, type PageSeo } from "../seo";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

// Actualiza título, descripción y canonical al navegar dentro de la web.
// (Al cargar la página, Google ya recibe estos datos en el HTML generado al compilar.)
export function usePageSeo(seo: PageSeo) {
  useEffect(() => {
    const url = `${SITE_URL}${seo.path}`;

    document.title = seo.title;
    setMeta("name", "description", seo.description);
    setMeta("name", "robots", seo.noindex ? "noindex" : "index, follow, max-image-preview:large");
    setMeta("property", "og:title", seo.title);
    setMeta("property", "og:description", seo.description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", seo.image);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (seo.noindex) {
      canonical?.remove();
    } else {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = url;
    }
  }, [seo]);
}
