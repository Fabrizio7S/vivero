import PlantGrid from "./components/catalog/PlantGrid";

function App() {
  return (
    <main className="min-h-screen bg-[#f8f6ef] text-[#203b2d]">
      <header className="border-b border-green-900/10 bg-[#f8f6ef] px-5 py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="/" className="flex shrink-0 items-center">
            <img
              src="/imagenes/plantas/logo1.png"
              alt="Vivero Nativa"
              className="h-14 w-auto object-contain"
            />
          </a>

          <nav className="flex items-center gap-5 text-sm">
            <a href="/" className="font-medium hover:text-green-700">
              Inicio
            </a>
            <a href="/contacto" className="font-medium hover:text-green-700">
              Contacto
            </a>
          </nav>
        </div>
      </header>

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

      <footer className="border-t border-green-900/10 px-5 py-6 text-center text-sm text-gray-500">
        Vivero Nativa · Un espacio para conectar con la naturaleza
      </footer>
    </main>
  );
}

export default App;
