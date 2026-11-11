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
import ContactPage from "./pages/ContactPage";
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
    <section
      id="inicio"
      className="mx-auto flex max-w-7xl scroll-mt-28 flex-col-reverse gap-6 px-4 pb-8 pt-6 sm:px-6 md:flex-row md:items-center md:gap-10 md:pb-12 md:pt-10"
    >
      <div className="min-w-0 md:flex-1">
        <h1 className="font-display text-[34px] font-medium leading-[1.04] tracking-tight text-[#203b2d] sm:text-5xl lg:text-6xl">
          Plantas que dan vida a{" "}
          <em className="italic text-[#2f6b45]">tus espacios</em>
        </h1>
        <p className="mt-3 max-w-md text-base leading-7 text-gray-700 sm:mt-4 sm:text-lg">
          Cultivadas en nuestro vivero de Lurín y listas para tu hogar, oficina o
          jardín.
        </p>
        <a
          href="#mas-vendidos"
          className="mt-6 inline-flex min-h-[52px] items-center gap-3 rounded-full bg-[#203b2d] px-6 text-[15px] font-semibold text-[#f8f6ef] shadow-[0_14px_30px_-14px_rgba(32,59,45,0.7)] transition hover:-translate-y-0.5 hover:bg-[#2f6b45] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-800 sm:mt-7 sm:px-7 sm:text-base"
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
      </div>

      <div className="h-52 overflow-hidden rounded-3xl bg-[#e8e5dc] sm:h-72 md:h-[360px] md:flex-[1.15] md:rounded-[28px]">
        <img
          src="/imagenes/plantas/home.jpg"
          alt="Plantas de Vivero Nativa"
          className="h-full w-full object-cover"
        />
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

function Footer() {
  return (
    <footer className="bg-[#203b2d] px-4 py-8 text-[#f8f6ef] sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
        <a href="/#inicio" className="flex items-center">
          <img
            src="/imagenes/plantas/logo1.png"
            alt="Vivero Nativa"
            className="h-12 w-auto object-contain"
          />
        </a>

        <nav className="flex flex-wrap justify-center gap-x-6 text-sm text-[#f8f6ef]/90">
          <a href="/#mas-vendidos" className="py-2.5 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            Más vendidos
          </a>
          <a href="/#catalogo" className="py-2.5 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            Catálogo
          </a>
          <a href="/#contacto" className="py-2.5 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            Contacto
          </a>
        </nav>

        <p className="text-[13px] text-[#f8f6ef]/70">
          © {currentYear} Vivero Nativa · Lurín, Lima
        </p>
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
