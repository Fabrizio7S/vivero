import { Link } from "react-router-dom";
import { usePageSeo } from "../hooks/usePageSeo";
import { notFoundSeo } from "../lib/seo";

const seo = notFoundSeo();

// Página para direcciones que no existen (Google no la indexa: noindex).
function NotFoundPage() {
  usePageSeo(seo);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
      <h1 className="font-display text-3xl font-medium tracking-tight text-bosque sm:text-4xl">
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

export default NotFoundPage;
