
import { Link, useParams } from "react-router-dom";
import { plants } from "../data/plants";
import { formatPrice, getProductWhatsAppUrl } from "../utils/product";

function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const plant = plants.find((item) => item.slug === slug);

  if (!plant) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#f8f6ef] px-6 text-center">
        <h1 className="text-2xl font-semibold text-[#203b2d]">
          Producto no encontrado
        </h1>
        <p className="mt-3 text-gray-600">
          No encontramos el producto que buscas.
        </p>
        <Link
          to="/"
          className="mt-6 font-semibold text-green-800 underline"
        >
          Volver al catálogo
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f6ef] px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center font-medium text-[#203b2d] underline-offset-4 transition-colors hover:text-green-800 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-800"
        >
          ← Volver al catálogo
        </Link>

        <article className="mt-6 grid gap-8 rounded-2xl border border-green-900/10 bg-white p-5 shadow-sm sm:p-8 md:grid-cols-2 md:gap-10 lg:p-10">
          <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-[#e9e9df]">
            {plant.image ? (
              <img
                src={plant.image}
                alt={plant.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="px-4 text-center text-sm text-gray-500">
                
              </span>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-700 sm:text-sm">
              {plant.category}
            </p>

            <h1 className="mt-3 break-words text-3xl font-semibold leading-tight tracking-tight text-[#203b2d] sm:text-4xl">
              {plant.name}
            </h1>

            <p className="mt-4 text-2xl font-semibold tracking-tight text-[#203b2d] sm:text-3xl">
              {formatPrice(plant.price)}
            </p>

            <p className="mt-5 leading-7 text-gray-600">
              {plant.description}
            </p>

            <div className="mt-8 space-y-5">
              <section>
                <h2 className="font-semibold text-[#203b2d]">
                  Iluminación
                </h2>
                <p className="mt-1 text-gray-600">{plant.light}</p>
              </section>

              <section>
                <h2 className="font-semibold text-[#203b2d]">
                  Riego
                </h2>
                <p className="mt-1 text-gray-600">{plant.watering}</p>
              </section>
            </div>

            <a
              href={getProductWhatsAppUrl(plant)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#203b2d] px-6 py-3 text-center font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#2f6b45] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-800 sm:w-fit"
            >
              Consultar por WhatsApp
              <span className="ml-2" aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
      </div>
    </main>
  );
}

export default ProductDetailPage;
