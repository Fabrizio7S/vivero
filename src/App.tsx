
import { Link, Route, Routes } from "react-router-dom";
import PlantGrid from "./components/catalog/PlantGrid";
import ContactPage from "./pages/ContactPage";
import ProductDetailPage from "./pages/ProductDetailPage";

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-green-900/10 bg-[#f8f6ef]/95 px-4 py-2.5 shadow-sm backdrop-blur-md sm:px-5 sm:py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link to="/" className="flex shrink-0 items-center">
          <img
            src="/imagenes/plantas/logo1.png"
            alt="Vivero Nativa"
            className="h-10 w-auto object-contain transition-transform duration-200 hover:scale-[1.02] sm:h-14"
          />
        </Link>

        <nav className="flex items-center gap-3 text-xs sm:gap-7 sm:text-sm">
          <a
            href="/#inicio"
            className="font-medium transition-colors hover:text-green-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-800"
          >
            Inicio
          </a>
          <a
            href="/#contacto"
            className="font-medium transition-colors hover:text-green-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-800"
          >
            Contacto
          </a>
        </nav>
      </div>
    </header>
  );
}

function CatalogPage() {
  return (
    <>
      <section
        id="inicio"
        className="relative flex min-h-[280px] scroll-mt-24 items-center overflow-hidden sm:min-h-[360px] md:min-h-[420px]"
      >
        <img
          src="/imagenes/plantas/home.jpg"
          alt="Plantas de Vivero Nativa"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#f8f6ef]/95 via-[#f8f6ef]/80 to-[#f8f6ef]/10" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-14 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2f6b45]">
            Plantas que dan vida a tus espacios
          </p>

          <h1 className="mt-5 max-w-xl text-4xl font-semibold leading-[1.08] tracking-tight text-[#203b2d] sm:text-5xl md:text-6xl">
            Descubre nuestra colección de plantas
          </h1>

          <p className="mt-5 max-w-md text-base leading-7 text-gray-700 sm:text-lg">
            Naturaleza, frescura y bienestar en cada rincón de tu hogar,
            oficina o jardín.
          </p>
        </div>
      </section>

      <section
        id="catalogo"
        className="mx-auto max-w-7xl scroll-mt-24 px-5 py-10 sm:py-14"
      >
        <PlantGrid />
      </section>

      <ContactPage />
    </>
  );
}

function NotFoundPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:py-28">
      <h1 className="text-3xl font-semibold tracking-tight text-[#203b2d] sm:text-4xl">Página no encontrada</h1>

      <p className="mt-4 text-gray-600">
        La página que buscas no existe.
      </p>

      <Link
        to="/"
        className="mt-6 inline-flex min-h-11 items-center font-medium text-green-800 underline underline-offset-4 transition-colors hover:text-green-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-800"
      >
        Volver al catálogo
      </Link>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#203b2d] px-5 py-8 text-white sm:py-9">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
        <a href="/#inicio" className="flex items-center gap-3">
          <img
            src="/imagenes/plantas/logo1.png"
            alt="Vivero Nativa"
            className="h-12 w-auto object-contain"
          />
        </a>

        <nav className="flex flex-wrap justify-center gap-6 text-sm text-white/90">
          <a href="/#inicio" className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            Inicio
          </a>
          <a href="/#catalogo" className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            Catálogo
          </a>
          <a href="/#contacto" className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            Contacto
          </a>
        </nav>
      </div>

      <p className="mt-5 text-center text-xs text-white/70">
       
      </p>
    </footer>
  );
}

function App() {
  return (
    <main className="min-h-screen bg-[#f8f6ef] text-[#203b2d]">
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
