import { useMemo, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import PlantGallery from "../components/plant/PlantGallery";
import ShippingBadge from "../components/plant/ShippingBadge";
import { DropIcon, SunIcon } from "../components/ui/icons";
import { usePageSeo } from "../hooks/usePageSeo";
import { findPlant } from "../lib/catalogo";
import { formatPrice, formatPriceLabel, productWhatsAppUrl } from "../lib/formato";
import { notFoundSeo, productSeo } from "../lib/seo";

// Recuadro de cuidados (Iluminación / Riego).
function CareTip({ title, icon, children }: { title: string; icon: ReactNode; children: string }) {
  return (
    <section className="flex gap-3.5 rounded-2xl bg-lino p-4">
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-hoja"
        aria-hidden="true"
      >
        {icon}
      </span>
      <div>
        <h2 className="font-semibold text-bosque">{title}</h2>
        <p className="mt-1 text-[15px] leading-6 text-gray-600">{children}</p>
      </div>
    </section>
  );
}

// Ficha de una planta: /producto/<slug>
function PlantPage() {
  const { slug } = useParams<{ slug: string }>();

  const plant = findPlant(slug);
  const seo = useMemo(() => (plant ? productSeo(plant) : notFoundSeo()), [plant]);
  usePageSeo(seo);

  if (!plant) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl font-semibold text-bosque">Producto no encontrado</h1>
        <p className="mt-3 text-gray-600">No encontramos el producto que buscas.</p>
        <Link to="/" className="mt-6 font-semibold text-green-800 underline">
          Volver al catálogo
        </Link>
      </section>
    );
  }

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center font-medium text-bosque underline-offset-4 transition-colors hover:text-green-800 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-800"
        >
          ← Volver al catálogo
        </Link>

        <article className="mt-6 grid gap-8 rounded-3xl border border-green-900/10 bg-white p-5 shadow-sm sm:p-8 md:grid-cols-2 md:gap-10 lg:p-10">
          {/* key: reinicia la foto elegida al cambiar de planta */}
          <PlantGallery key={plant.slug} images={plant.images} name={plant.name} />

          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-700 sm:text-sm">
              {plant.category}
            </p>

            <h1 className="font-display mt-3 break-words text-3xl font-medium leading-tight tracking-tight text-bosque sm:text-4xl">
              {plant.name}
            </h1>

            <p className="mt-4 text-2xl font-semibold tracking-tight text-bosque sm:text-3xl">
              {formatPriceLabel(plant.prices)}
            </p>

            {plant.prices.length > 1 && (
              <p className="mt-2 text-sm text-gray-600">
                Precio según tamaño: {plant.prices.map(formatPrice).join(" · ")}
              </p>
            )}

            {plant.shipsNationwide && (
              <div className="mt-4">
                <ShippingBadge size="md" />
              </div>
            )}

            {plant.description && <p className="mt-5 leading-7 text-gray-600">{plant.description}</p>}

            {(plant.light || plant.watering) && (
              <div className="mt-7 grid gap-3">
                {plant.light && (
                  <CareTip title="Iluminación" icon={<SunIcon className="h-5 w-5" />}>
                    {plant.light}
                  </CareTip>
                )}
                {plant.watering && (
                  <CareTip title="Riego" icon={<DropIcon className="h-5 w-5" />}>
                    {plant.watering}
                  </CareTip>
                )}
              </div>
            )}

            <a
              href={productWhatsAppUrl(plant.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-bosque px-6 py-3 text-center font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-hoja hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-800 sm:w-fit"
            >
              Consultar por WhatsApp
              <span className="ml-2" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}

export default PlantPage;
