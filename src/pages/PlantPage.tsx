import { useMemo, useState, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import PlantGallery from "../components/plant/PlantGallery";
import ShippingBadge from "../components/plant/ShippingBadge";
import SizePicker from "../components/plant/SizePicker";
import { CartIcon, DropIcon, SunIcon } from "../components/ui/icons";
import { vivero } from "../config/vivero";
import { usePageSeo } from "../hooks/usePageSeo";
import { useCart } from "../lib/carrito";
import { findPlant } from "../lib/catalogo";
import { formatPrice, formatPriceLabel, productWhatsAppUrl } from "../lib/formato";
import { notFoundSeo, productSeo } from "../lib/seo";
import type { Plant } from "../types/plant";

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

// Contenido de la ficha. Se monta de nuevo al cambiar de planta (key), así la
// foto y el tamaño elegidos vuelven al inicio.
function PlantDetail({ plant }: { plant: Plant }) {
  const [sizeIndex, setSizeIndex] = useState(0);
  const { add } = useCart();
  const size = plant.sizes[sizeIndex];
  const price = size ? formatPrice(size.price) : formatPriceLabel(plant.prices);

  return (
    <article className="mt-6 grid gap-8 rounded-3xl border border-green-900/10 bg-white p-5 shadow-sm sm:p-8 md:grid-cols-2 md:gap-10 lg:p-10">
      <PlantGallery images={plant.images} name={plant.name} />

      <div className="flex flex-col justify-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-700 sm:text-sm">
          {plant.category}
        </p>

        <h1 className="font-display mt-3 break-words text-3xl font-medium leading-tight tracking-tight text-bosque sm:text-4xl">
          {plant.name}
        </h1>

        {plant.scientificName && (
          <p className="mt-1 text-[15px] italic text-gray-500">{plant.scientificName}</p>
        )}

        <p className="mt-4 text-2xl font-semibold tracking-tight text-bosque sm:text-3xl" aria-live="polite">
          {price}
          {size && <span className="ml-2 text-base font-medium text-gray-500">· {size.label}</span>}
        </p>

        {plant.sizes.length > 0 && (
          <SizePicker sizes={plant.sizes} selected={sizeIndex} onSelect={setSizeIndex} />
        )}

        <p className="mt-3 text-sm font-medium text-gray-600">{vivero.textos.notaPrecio}</p>

        {plant.shipsNationwide && (
          <div className="mt-4">
            <ShippingBadge size="md" />
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={() => add(plant, size?.label)}
            className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-bosque px-6 py-3 font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-hoja hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-800"
          >
            <CartIcon className="h-5 w-5" />
            Agregar al carrito
          </button>

          <a
            href={productWhatsAppUrl(plant.name, size)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-bosque px-6 py-3 text-center font-semibold text-bosque transition duration-200 hover:bg-bosque hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-800"
          >
            Comprar por WhatsApp
            <span className="ml-2" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>

        {plant.description && <p className="mt-7 leading-7 text-gray-600">{plant.description}</p>}

        {(plant.light || plant.watering) && (
          <div className="mt-6 grid gap-3">
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

        {plant.height && (
          <p className="mt-4 text-[15px] text-gray-600">
            <span className="font-semibold text-bosque">Altura aproximada:</span> {plant.height}
          </p>
        )}

        {plant.careTips.length > 0 && (
          <section className="mt-6">
            <h2 className="font-semibold text-bosque">Cuidados recomendados</h2>
            <ul className="mt-2 space-y-1.5 text-[15px] leading-6 text-gray-600">
              {plant.careTips.map((tip) => (
                <li key={tip} className="flex gap-2.5">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-hoja" aria-hidden="true" />
                  {tip}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
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

        <PlantDetail key={plant.slug} plant={plant} />
      </div>
    </section>
  );
}

export default PlantPage;
