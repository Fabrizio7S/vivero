
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

          <Link
            to="/contacto"
            className="font-medium hover:text-green-700"
          >
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  );
}

function CatalogPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-10">
      <div className="mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-green-700">
          Vivero Nativa
        </p>

        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Catálogo de plantas
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 md:text-base">
          Explora nuestra variedad de plantas para tu hogar, oficina o jardín.
        </p>
      </div>

      <PlantGrid />
    </section>
  );
}

function NotFoundPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <h1 className="text-3xl font-semibold">
        Página no encontrada
      </h1>

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

function App() {
  return (
    <main className="min-h-screen bg-[#f8f6ef] text-[#203b2d]">
      <Header />

      <Routes>
        <Route path="/" element={<CatalogPage />} />

        <Route
          path="/producto/:slug"
          element={<ProductDetailPage />}
        />

        <Route
          path="/contacto"
          element={<ContactPage />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <footer className="border-t border-green-900/10 px-5 py-6 text-center text-sm text-gray-500">
        Vivero Nativa · Un espacio para conectar con la naturaleza
      </footer>
    </main>
  );
}

export default App;
