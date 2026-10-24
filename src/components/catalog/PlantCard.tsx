
import type { Plant } from "../../types/plant";

interface PlantCardProps {
  plant: Plant;
}

function PlantCard({ plant }: PlantCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-green-900/10 bg-white transition-shadow hover:shadow-md">
      <a
        href={`/producto/${plant.slug}`}
        className="block overflow-hidden"
        aria-label={`Ver detalles de ${plant.name}`}
      >
        <div className="flex aspect-[5/4] items-center justify-center overflow-hidden bg-[#e9e9df]">
          {plant.image ? (
            <img
              src={plant.image}
              alt={plant.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : null}
        </div>
      </a>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="text-[10px] font-medium uppercase tracking-wider text-green-700 sm:text-xs">
          {plant.category}
        </p>

        <h2 className="mt-1.5 text-base font-semibold leading-snug text-green-950 sm:text-lg">
          {plant.name}
        </h2>

        {plant.shortDescription && (
          <p className="mt-2 flex-1 text-sm leading-5 text-gray-600">
            {plant.shortDescription}
          </p>
        )}

        <a
          href={`/producto/${plant.slug}`}
          className="mt-3 inline-flex min-h-9 items-center text-sm font-semibold text-green-800 hover:text-green-950"
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
