import { useEffect } from "react";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import BestSellers from "./components/catalog/BestSellers";
import PlantGrid from "./components/catalog/PlantGrid";
import SocialLinks from "./components/SocialLinks";
import ContactPage, { mapsUrl } from "./pages/ContactPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import { whatsappNumber } from "./utils/product";

const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  "Hola, Vivero Nativa. Quisiera consultar sobre sus productos.",
)}`;

function WhatsAppIcon({ className = "h-[18px] w-[18px]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 0 1-13.5 7.8L3 21l1.2-4.5A9 9 0 1 1 21 12Z" />
    </svg>
  );
}

function scrollToCatalog() {
  requestAnimationFrame(() => {
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
  });
}

// Buscador del encabezado: guarda el texto en la URL (?q=) para el catálogo.
function HeaderSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const search = searchParams.get("q") ?? "";

  const updateSearch = (value: string) => {
    const params: Record<string, string> = value ? { q: value } : {};

    if (pathname === "/") {
      setSearchParams(params, { replace: true });
    } else {
      navigate({ pathname: "/", search: value ? `?q=${encodeURIComponent(value)}` : "" });
    }
  };

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        scrollToCatalog();
      }}
      className="flex min-h-12 w-full items-center gap-2.5 rounded-full border border-green-900/15 bg-white px-4 transition-shadow focus-within:ring-2 focus-within:ring-green-800 sm:px-5"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        className="h-[18px] w-[18px] shrink-0 text-gray-600"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <label htmlFor="plant-search" className="sr-only">
        Buscar planta
      </label>
      <input
        id="plant-search"
        type="search"
        value={search}
        onChange={(event) => updateSearch(event.target.value)}
        placeholder="Buscar planta…"
        className="w-full min-w-0 bg-transparent text-[15px] text-[#203b2d] outline-none placeholder:text-gray-500"
      />
    </form>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-green-900/10 bg-[#f8f6ef]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center">
          <img
            src="/imagenes/plantas/logo1.png"
            alt="Vivero Nativa"
            className="h-11 w-auto object-contain sm:h-[52px]"
          />
        </Link>

        <div className="order-last w-full md:order-none md:w-auto md:max-w-md md:flex-1">
          <HeaderSearch />
        </div>

        <nav
          aria-label="Principal"
          className="flex items-center gap-5 text-[15px] font-medium sm:gap-7"
        >
          <a
            href="/#catalogo"
            className="hidden py-2.5 transition-colors hover:text-[#2f6b45] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-800 sm:inline"
          >
            Catálogo
          </a>
          <a
            href="/#contacto"
            className="hidden py-2.5 transition-colors hover:text-[#2f6b45] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-800 sm:inline"
          >
            Contacto
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escríbenos por WhatsApp"
            className="inline-flex h-11 min-w-11 items-center justify-center gap-2.5 rounded-full bg-[#203b2d] text-sm font-semibold text-[#f8f6ef] transition hover:-translate-y-0.5 hover:bg-[#2f6b45] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-800 sm:px-5"
          >
            <WhatsAppIcon />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    // Portada original: foto de fondo a todo el ancho con el texto encima.
    <section
      id="inicio"
      className="relative flex min-h-[340px] scroll-mt-28 items-center overflow-hidden sm:min-h-[400px] md:min-h-[460px]"
    >
      <img
        src="/imagenes/plantas/home.jpg"
        alt="Plantas de Vivero Nativa"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#f8f6ef]/95 via-[#f8f6ef]/80 to-[#f8f6ef]/10" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2f6b45]">
          Plantas que dan vida a tus espacios
        </p>

        <h1 className="mt-5 max-w-xl text-4xl font-semibold leading-[1.08] tracking-tight text-[#203b2d] sm:text-5xl md:text-6xl">
          Descubre nuestra colección de plantas
        </h1>

        <p className="mt-5 max-w-md text-base leading-7 text-gray-700 sm:text-lg">
          Naturaleza, frescura y bienestar en cada rincón de tu hogar, oficina o
          jardín.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
        <a
          href="#mas-vendidos"
          className="inline-flex min-h-[52px] items-center gap-3 rounded-full bg-[#203b2d] px-6 text-[15px] font-semibold text-[#f8f6ef] shadow-[0_14px_30px_-14px_rgba(32,59,45,0.7)] transition hover:-translate-y-0.5 hover:bg-[#2f6b45] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-800 sm:px-7 sm:text-base"
        >
          Ver las más vendidas
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-[18px] w-[18px]"
            aria-hidden="true"
          >
            <path d="M12 5v14M6 13l6 6 6-6" />
          </svg>
        </a>

        <SocialLinks variant="light" />
        </div>
      </div>
    </section>
  );
}

function CatalogPage() {
  // Si se llega con una búsqueda desde otra página, ir al catálogo (solo al entrar).
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("q")) scrollToCatalog();
  }, []);

  return (
    <>
      <Hero />
      <BestSellers />

      <div
        id="catalogo"
        className="mx-auto max-w-7xl scroll-mt-28 px-4 py-12 sm:px-6 sm:py-16"
      >
        <PlantGrid />
      </div>

      <ContactPage />
    </>
  );
}

function NotFoundPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
      <h1 className="font-display text-3xl font-medium tracking-tight text-[#203b2d] sm:text-4xl">
        Página no encontrada
      </h1>

      <p className="mt-4 text-gray-600">La página que buscas no existe.</p>

      <Link
        to="/"
        className="mt-6 inline-flex min-h-11 items-center font-medium text-green-800 underline underline-offset-4 transition-colors hover:text-green-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-800"
      >
        Volver al catálogo
      </Link>
    </section>
  );
}

const currentYear = new Date().getFullYear();

const footerLink =
  "inline-flex min-h-10 items-center text-[15px] text-[#f8f6ef]/80 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

function FooterTitle({ children }: { children: string }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d7dfc9]">
      {children}
    </h2>
  );
}

function Footer() {
  return (
    <footer className="bg-[#203b2d] px-4 pt-12 text-[#f8f6ef] sm:px-6 sm:pt-16">
      <div className="mx-auto grid max-w-7xl gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1.2fr_1fr] lg:gap-12">
        <div>
          <Link to="/" className="inline-flex focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            {/* El logo es verde oscuro: se muestra en blanco sobre el fondo verde. */}
            <img
              src="/imagenes/plantas/logo1.png"
              alt="Vivero Nativa"
              className="h-11 w-auto object-contain brightness-0 invert"
            />
          </Link>
          <p className="mt-4 max-w-xs text-[15px] leading-7 text-[#f8f6ef]/75">
            Tu vivero en Lurín. Te ayudamos a elegir la planta ideal para cada
            espacio y te la enviamos a cualquier lugar del Perú.
          </p>
          <SocialLinks className="mt-6" />
        </div>

        <nav aria-label="Pie de página">
          <FooterTitle>Explora</FooterTitle>
          <ul className="mt-4 space-y-1">
            <li><a href="/#mas-vendidos" className={footerLink}>Más vendidos</a></li>
            <li><a href="/#catalogo" className={footerLink}>Catálogo</a></li>
            <li><a href="/#contacto" className={footerLink}>Contacto</a></li>
          </ul>
        </nav>

        <div>
          <FooterTitle>Contacto</FooterTitle>
          <ul className="mt-4 space-y-3 text-[15px] leading-6 text-[#f8f6ef]/80">
            <li>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={footerLink}>
                Casica - Poro Portón, Lurín 15823
              </a>
            </li>
            <li>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={`${footerLink} gap-2`}>
                <WhatsAppIcon className="h-4 w-4" />
                +51 994 684 483
              </a>
            </li>
            <li>Lunes a domingo, 8:00 a. m. – 6:00 p. m.</li>
          </ul>
        </div>

        <div>
          <FooterTitle>Envíos</FooterTitle>
          <p className="mt-4 text-[15px] leading-7 text-[#f8f6ef]/80">
            Enviamos nuestras plantas a todo el Perú, bien embaladas para que
            lleguen sanas a tu casa.
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-2 border-t border-[#f8f6ef]/15 py-6 text-[13px] text-[#f8f6ef]/60 sm:flex-row sm:justify-between">
        <p>© {currentYear} Vivero Nativa. Todos los derechos reservados.</p>
        <p>Lurín, Lima · Perú</p>
      </div>
    </footer>
  );
}

// Al abrir un producto, empezar desde arriba de la página.
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <main className="min-h-screen bg-[#f8f6ef] text-[#203b2d]">
      <ScrollToTop />
      <Header />

      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/producto/:slug" element={<ProductDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </main>
  );
}

export default App;
