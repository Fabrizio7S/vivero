
import type { Plant } from "../../types/plant";
import { formatPrice } from "../../utils/product";

interface PlantCardProps {
  plant: Plant;
}

function PlantCard({ plant }: PlantCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-green-900/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <a
        href={`/producto/${plant.slug}`}
        className="block overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-green-800"
        aria-label={`Ver detalles de ${plant.name}`}
      >
        <div className="flex aspect-[5/4] items-center justify-center overflow-hidden bg-[#e9e9df]">
          {plant.image ? (
            <img
              src={plant.image}
              alt={plant.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : null}
        </div>
      </a>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-green-700 sm:text-xs">
          {plant.category}
        </p>

        <h2 className="mt-2 text-base font-semibold leading-snug tracking-tight text-[#203b2d] sm:text-lg">
          {plant.name}
        </h2>

        <p className="mt-3 text-lg font-semibold tracking-tight text-[#203b2d] sm:text-xl">
          {formatPrice(plant.price)}
        </p>

        {plant.shortDescription && (
          <p className="mt-2 flex-1 text-sm leading-6 text-gray-600">
            {plant.shortDescription}
          </p>
        )}

        <a
          href={`/producto/${plant.slug}`}
          className="mt-4 inline-flex min-h-10 items-center text-sm font-semibold text-green-800 transition-colors hover:text-green-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
        >
          Ver detalles
          <span className="ml-2" aria-hidden="true">
            →
          </span>
        </a>
      </div>
    </article>
  );
}

export default PlantCard;
