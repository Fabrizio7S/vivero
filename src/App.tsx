import ContactPage from "./pages/ContactPage";
import { Link, Route, Routes } from "react-router-dom";
import PlantGrid from "./components/catalog/PlantGrid";
import ProductDetailPage from "./pages/ProductDetailPage";

function Header() {
  return (
    <header className="border-b border-green-900/10 bg-[#f8f6ef] px-5 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link to="/" className="flex shrink-0 items-center">
          <img
            src="/imagenes/plantas/logo1.png"
            alt="Vivero Nativa"
            className="h-14 w-auto object-contain"
          />
        </Link>

        <nav className="flex items-center gap-5 text-sm">
          <Link to="/" className="font-medium hover:text-green-700">
            Inicio
          </Link>

          <Link to="/contacto" className="font-medium hover:text-green-700">
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  );
}

function CatalogPage() {
  return (
    <>
      {/* Banner principal */}
      <section className="relative flex min-h-[250px] items-center overflow-hidden sm:min-h-[320px] md:min-h-[380px]">
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
            Naturaleza, frescura y bienestar en cada rincón de tu hogar, oficina
            o jardín.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:py-10">
        <PlantGrid />
      </section>
    </>
  );
}

function NotFoundPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <h1 className="text-3xl font-semibold">Página no encontrada</h1>

      <p className="mt-3 text-gray-600">La página que buscas no existe.</p>

      <Link
        to="/"
        className="mt-4 inline-block font-medium text-green-800 underline"
      >
        Volver al catálogo
      </Link>
    </section>
  );
}

function App() {
  return (
    <main className="min-h-screen bg-[#f8f6ef] text-[#203b2d]">
      <Header />

      <Routes>
        {/* Catálogo con banner, buscador y productos */}
        <Route path="/" element={<CatalogPage />} />

        {/* Detalle de cada producto */}
        <Route path="/producto/:slug" element={<ProductDetailPage />} />

        {/* Página de contacto */}
        <Route path="/contacto" element={<ContactPage />} />

        {/* Página no encontrada */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <footer className="border-t border-green-900/10 px-5 py-6 text-center text-sm text-gray-500">
        Vivero Nativa · Un espacio para conectar con la naturaleza
      </footer>
    </main>
  );
}

export default App;
