import { useEffect } from "react";
import BestSellers from "../components/home/BestSellers";
import CatalogSection from "../components/home/CatalogSection";
import ContactSection from "../components/home/ContactSection";
import Hero from "../components/home/Hero";
import { usePageSeo } from "../hooks/usePageSeo";
import { scrollToCatalog } from "../lib/scroll";
import { homeSeo } from "../lib/seo";

const seo = homeSeo();

// Portada: presentación, más vendidas, catálogo completo y contacto.
function HomePage() {
  usePageSeo(seo);

  // Si se llega con una búsqueda desde otra página, ir al catálogo (solo al entrar).
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("q")) scrollToCatalog();
  }, []);

  return (
    <>
      <Hero />
      <BestSellers />
      <CatalogSection />
      <ContactSection />
    </>
  );
}

export default HomePage;
