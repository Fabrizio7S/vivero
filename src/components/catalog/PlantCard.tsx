import { Link } from "react-router-dom";
import type { Plant } from "../../types/plant";
import { formatPriceLabel, getProductWhatsAppUrl } from "../../utils/product";
import ShippingBadge from "./ShippingBadge";

interface PlantCardProps {
  plant: Plant;
  // Puesto en el top de ventas; muestra el número y el botón "Pedir".
  rank?: number;
}

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5 shrink-0"
      aria-hidden="true"
    >
      <path d="M3 6.5h11v9H3zM14 9.5h3.5L21 13v2.5h-7z" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17.5" cy="17.5" r="1.8" />
    </svg>
  );
}

function PlantCard({ plant, rank }: PlantCardProps) {
  const [mainImage, hoverImage] = plant.images;
  const detailUrl = `/producto/${plant.slug}`;
  const isBestSeller = rank !== undefined;

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-20px_rgba(32,59,45,0.45)] sm:rounded-3xl ${
        isBestSeller
          ? "bg-[#f8f6ef] text-[#203b2d]"
          : "border border-green-900/10 bg-white"
      }`}
    >
      <Link
        to={detailUrl}
        className="block overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-green-800"
        aria-label={`Ver detalles de ${plant.name}`}
      >
        <div className="relative aspect-square overflow-hidden bg-[#e8e5dc]">
          <img
            src={mainImage}
            alt={plant.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          {hoverImage && (
            <img
              src={hoverImage}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
            />
          )}

          {/* En celular el envío va como franja sobre la foto (no cabe como pastilla). */}
          {plant.shipsNationwide && (
            <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1 bg-white/90 py-1 text-[11px] font-semibold text-[#2f6b45] sm:hidden">
              <TruckIcon />
              Envío a todo el Perú
            </span>
          )}

          {isBestSeller && (
            <span className="font-display absolute left-2.5 top-2.5 flex h-8 min-w-8 items-center justify-center rounded-full bg-[#203b2d] px-2.5 text-sm font-semibold text-[#f8f6ef] sm:left-3.5 sm:top-3.5 sm:h-11 sm:min-w-11 sm:px-3 sm:text-lg">
              #{rank}
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <h3 className="font-display text-base font-medium leading-tight sm:text-[22px]">
          <Link
            to={detailUrl}
            className="transition-colors hover:text-[#2f6b45] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
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
                ? "text-sm text-[#203b2d] sm:text-lg"
                : "text-xs text-[#2f6b45] sm:text-base"
            }`}
          >
            {formatPriceLabel(plant.prices)}
          </p>

          {isBestSeller ? (
            <a
              href={getProductWhatsAppUrl(plant)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Pedir ${plant.name} por WhatsApp`}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[#203b2d] px-3.5 text-sm font-semibold text-[#f8f6ef] transition hover:-translate-y-0.5 hover:bg-[#2f6b45] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 sm:min-h-11 sm:px-4"
            >
              Pedir
              <ArrowIcon />
            </a>
          ) : (
            <Link
              to={detailUrl}
              aria-label={`Ver detalles de ${plant.name}`}
              className="hidden h-10 w-10 shrink-0 items-center sm:flex justify-center rounded-full bg-[#e7efe3] text-[#203b2d] transition hover:bg-[#203b2d] hover:text-[#f8f6ef] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 sm:h-11 sm:w-11"
            >
              <ArrowIcon className="h-[18px] w-[18px]" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export default PlantCard;
