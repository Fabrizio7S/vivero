
import { Link, Route, Routes } from "react-router-dom";
import PlantGrid from "./components/catalog/PlantGrid";
import ContactPage from "./pages/ContactPage";
import ProductDetailPage from "./pages/ProductDetailPage";

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-green-900/10 bg-[#f8f6ef]/95 px-5 py-3 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link to="/" className="flex shrink-0 items-center">
          <img
            src="/imagenes/plantas/logo1.png"
            alt="Vivero Nativa"
            className="h-14 w-auto object-contain"
          />
        </Link>

        <nav className="flex items-center gap-5 text-sm">
          <a
            href="/#inicio"
            className="font-medium hover:text-green-700"
          >
            Inicio
          </a>
          <a
            href="/#contacto"
            className="font-medium hover:text-green-700"
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
        className="relative flex min-h-[250px] scroll-mt-24 items-center overflow-hidden sm:min-h-[320px] md:min-h-[380px]"
      >
        <img
          src="/imagenes/plantas/home.jpg"
          alt="Plantas de Vivero Nativa"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#f8f6ef]/95 via-[#f8f6ef]/75 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-12 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2f6b45]">
            Plantas que dan vida a tus espacios
          </p>

          <h1 className="mt-4 max-w-xl text-3xl font-semibold leading-tight tracking-tight text-[#203b2d] sm:text-4xl md:text-5xl">
            Descubre nuestra colección de plantas
          </h1>

          <p className="mt-4 max-w-md text-sm leading-6 text-gray-700 sm:text-base">
            Naturaleza, frescura y bienestar en cada rincón de tu hogar,
            oficina o jardín.
          </p>
        </div>
      </section>

      <section
        id="catalogo"
        className="mx-auto max-w-7xl scroll-mt-24 px-5 py-8 sm:py-10"
      >
        <PlantGrid />
      </section>

      <ContactPage />
    </>
  );
}

function NotFoundPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <h1 className="text-3xl font-semibold">Página no encontrada</h1>

      <p className="mt-3 text-gray-600">
        La página que buscas no existe.
      </p>

      <Link
        to="/"
        className="mt-4 inline-block font-medium text-green-800 underline"
      >
        Volver al catálogo
      </Link>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#203b2d] px-5 py-6 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
        <a href="/#inicio" className="flex items-center gap-3">
          <img
            src="/imagenes/plantas/logo1.png"
            alt="Vivero Nativa"
            className="h-12 w-auto object-contain"
          />
        </a>

        <nav className="flex flex-wrap justify-center gap-6 text-sm text-white/90">
          <a href="/#inicio" className="hover:text-white">
            Inicio
          </a>
          <a href="/#catalogo" className="hover:text-white">
            Catálogo
          </a>
          <a href="/#contacto" className="hover:text-white">
            Contacto
          </a>
        </nav>
      </div>

      <p className="mt-5 text-center text-xs text-white/70">
        © {new Date().getFullYear()} Vivero Nativa. Todos los derechos reservados.
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
