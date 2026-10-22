import type { Plant } from "../../types/plant";

interface PlantCardProps {
  plant: Plant;
}

function PlantCard({ plant }: PlantCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-green-900/10 bg-white transition-shadow hover:shadow-md">
      <a
        href={`/producto/${plant.slug}`}
        className="block overflow-hidden"
        aria-label={`Ver detalles de ${plant.name}`}
      >
        <div className="flex aspect-square items-center justify-center bg-[#e9e9df]">
          {plant.image ? (
            <img
              src={plant.image}
              alt={plant.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <span className="px-4 text-center text-sm text-gray-500">
              
            </span>
          )}
        </div>
      </a>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-green-700">
          {plant.category}
        </p>

        <h2 className="mt-2 text-lg font-semibold text-green-950">
          {plant.name}
        </h2>

        <p className="mt-2 flex-1 text-sm leading-6 text-gray-600">
          {plant.shortDescription}
        </p>

        <a
          href={`/producto/${plant.slug}`}
          className="mt-4 inline-flex min-h-11 items-center font-semibold text-green-800 hover:text-green-950"
        >
          Ver detalles <span className="ml-2" aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}

export default PlantCard;