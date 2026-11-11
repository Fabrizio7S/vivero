import { bestSellers } from "../../lib/catalogo";
import { SECTION_IDS } from "../../lib/scroll";
import PlantCard from "../plant/PlantCard";

// "Las plantas más vendidas". Cuáles y en qué orden se elige en
// src/data/plantas.ts (lista `masVendidos`).
function BestSellers() {
  if (bestSellers.length === 0) return null;

  return (
    <section
      id={SECTION_IDS.masVendidos}
      aria-labelledby="mas-vendidos-title"
      className="scroll-mt-24 bg-bosque px-4 py-10 text-crema sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-salvia sm:text-[13px]">
              Top de ventas
            </p>
            <h2
              id="mas-vendidos-title"
              className="font-display mt-2 text-3xl font-medium leading-[1.05] tracking-tight sm:mt-3 sm:text-5xl"
            >
              Las plantas más vendidas
            </h2>
          </div>

          <a
            href={`#${SECTION_IDS.catalogo}`}
            className="hidden min-h-12 items-center gap-2.5 rounded-full border border-crema/30 px-5 text-[15px] font-semibold text-crema transition hover:bg-crema/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:inline-flex"
          >
            Ver todo el catálogo
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {bestSellers.map((plant, index) => (
            <PlantCard key={plant.slug} plant={plant} rank={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BestSellers;
