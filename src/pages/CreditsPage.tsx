import { Link } from "react-router-dom";
import { usePageSeo } from "../hooks/usePageSeo";
import { catalogo } from "../lib/catalogo";
import { creditsSeo } from "../lib/seo";

const seo = creditsSeo();
const conCredito = catalogo.filter((plant) => plant.credito);

// /creditos — autores y licencias de las fotos que no son del vivero.
// Las licencias Creative Commons piden nombrar al autor y enlazar la fuente.
function CreditsPage() {
  usePageSeo(seo);

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <Link
        to="/"
        className="inline-flex min-h-11 items-center font-medium text-bosque underline-offset-4 hover:text-green-800 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-800"
      >
        ← Volver al inicio
      </Link>

      <h1 className="font-display mt-4 text-4xl font-medium tracking-tight text-bosque sm:text-5xl">
        Créditos de fotos
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-gray-600">
        Las fotos de las plantas fotografiadas en el vivero son de Vivero Nativa. Las plantas marcadas
        como &ldquo;Foto referencial&rdquo; muestran cómo luce la especie; algunas usan fotos de
        Wikimedia Commons, publicadas por sus autores con licencias libres. Gracias a cada uno de ellos.
      </p>

      {conCredito.length > 0 && (
        <ul className="mt-10 divide-y divide-green-900/10 border-y border-green-900/10">
          {conCredito.map((plant) => (
            <li
              key={plant.slug}
              className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3"
            >
              <Link to={`/producto/${plant.slug}`} className="font-medium text-bosque hover:text-hoja">
                {plant.name}
              </Link>
              <span className="text-sm text-gray-600">
                <a
                  href={plant.credito!.fuente}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  {plant.credito!.autor || "Autor en Wikimedia Commons"}
                </a>
                , {plant.credito!.licencia}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default CreditsPage;
