import { Link } from "react-router-dom";
import type { Plant } from "../../types/plant";
import { formatPriceLabel } from "../../utils/product";
import ShippingBadge from "./ShippingBadge";

interface PlantCardProps {
  plant: Plant;
}

function PlantCard({ plant }: PlantCardProps) {
  const [mainImage, hoverImage] = plant.images;
  const detailUrl = `/producto/${plant.slug}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-green-900/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link
        to={detailUrl}
        className="block overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-green-800"
        aria-label={`Ver detalles de ${plant.name}`}
      >
        <div className="relative aspect-[5/4] overflow-hidden bg-[#e9e9df]">
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

          {plant.images.length > 1 && (
            <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-[#203b2d] shadow-sm">
              {plant.images.length} fotos
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-green-700 sm:text-xs">
          {plant.category}
        </p>

        <h2 className="mt-2 text-base font-semibold leading-snug tracking-tight text-[#203b2d] sm:text-lg">
          {plant.name}
        </h2>

        <p
          className={`mt-3 font-semibold tracking-tight ${
            plant.prices.length > 0
              ? "text-lg text-[#203b2d] sm:text-xl"
              : "text-base text-green-800"
          }`}
        >
          {formatPriceLabel(plant.prices)}
        </p>

        {plant.shipsNationwide && (
          <div className="mt-3">
            <ShippingBadge />
          </div>
        )}

        {plant.shortDescription && (
          <p className="mt-2 text-sm leading-6 text-gray-600">
            {plant.shortDescription}
          </p>
        )}

        <Link
          to={detailUrl}
          className="mt-auto inline-flex min-h-10 items-center pt-4 text-sm font-semibold text-green-800 transition-colors hover:text-green-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
        >
          Ver detalles
          <span className="ml-2" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}

export default PlantCard;
