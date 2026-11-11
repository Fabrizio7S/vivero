import { Link } from "react-router-dom";
import { formatPriceLabel, productWhatsAppUrl } from "../../lib/formato";
import type { Plant } from "../../types/plant";
import { ArrowRightIcon, TruckIcon } from "../ui/icons";
import ShippingBadge from "./ShippingBadge";

interface PlantCardProps {
  plant: Plant;
  // Puesto en el top de ventas; muestra el número y el botón "Pedir".
  rank?: number;
}

// Tarjeta de una planta (catálogo y más vendidas).
function PlantCard({ plant, rank }: PlantCardProps) {
  const [mainImage, hoverImage] = plant.images;
  const detailUrl = `/producto/${plant.slug}`;
  const isBestSeller = rank !== undefined;

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-20px_rgba(32,59,45,0.45)] sm:rounded-3xl ${
        isBestSeller
          ? "bg-crema text-bosque"
          : "border border-green-900/10 bg-white"
      }`}
    >
      <Link
        to={detailUrl}
        className="block overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-green-800"
        aria-label={`Ver detalles de ${plant.name}`}
      >
        <div className="relative aspect-square overflow-hidden bg-arena">
          <img
            src={mainImage}
            alt={`${plant.name} en maceta, planta de ${plant.category.toLowerCase()}`}
            width={1200}
            height={1200}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          {hoverImage && (
            <img
              src={hoverImage}
              alt=""
              aria-hidden="true"
              width={1200}
              height={1200}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
            />
          )}

          {/* En celular el envío va como franja sobre la foto (no cabe como pastilla). */}
          {plant.shipsNationwide && (
            <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1 bg-white/90 py-1 text-[11px] font-semibold text-hoja sm:hidden">
              <TruckIcon className="h-3.5 w-3.5 shrink-0" />
              Envío a todo el Perú
            </span>
          )}

          {isBestSeller && (
            <span className="font-display absolute left-2.5 top-2.5 flex h-8 min-w-8 items-center justify-center rounded-full bg-bosque px-2.5 text-sm font-semibold text-crema sm:left-3.5 sm:top-3.5 sm:h-11 sm:min-w-11 sm:px-3 sm:text-lg">
              #{rank}
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <h3 className="font-display text-base font-medium leading-tight sm:text-[22px]">
          <Link
            to={detailUrl}
            className="transition-colors hover:text-hoja focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
          >
            {plant.name}
          </Link>
        </h3>

        {plant.shipsNationwide && (
          <div className="mt-2 hidden sm:block">
            <ShippingBadge />
          </div>
        )}

        <div
          className={`mt-auto flex justify-between gap-2 pt-2.5 sm:flex-row sm:items-center sm:pt-4 ${
            isBestSeller ? "flex-col" : "items-center"
          }`}
        >
          <p
            className={`font-bold ${
              plant.prices.length > 0
                ? "text-sm text-bosque sm:text-lg"
                : "text-xs text-hoja sm:text-base"
            }`}
          >
            {formatPriceLabel(plant.prices)}
          </p>

          {isBestSeller ? (
            <a
              href={productWhatsAppUrl(plant.name)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Pedir ${plant.name} por WhatsApp`}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-bosque px-3.5 text-sm font-semibold text-crema transition hover:-translate-y-0.5 hover:bg-hoja focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 sm:min-h-11 sm:px-4"
            >
              Pedir
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          ) : (
            <Link
              to={detailUrl}
              aria-label={`Ver detalles de ${plant.name}`}
              className="hidden h-10 w-10 shrink-0 items-center sm:flex justify-center rounded-full bg-menta text-bosque transition hover:bg-bosque hover:text-crema focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 sm:h-11 sm:w-11"
            >
              <ArrowRightIcon />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export default PlantCard;
