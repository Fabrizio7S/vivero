import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { catalogo } from "../../data/catalogo";
import { normalize } from "../../utils/product";
import PlantCard from "./PlantCard";

const ITEMS_PER_PAGE = 12;
const ALL = "Todas";

// Solo categorías que tienen productos con fotos.
const categories = [ALL, ...new Set(catalogo.map((plant) => plant.category))];

function PlantGrid() {
  // La búsqueda vive en la URL (?q=) porque el buscador está en el encabezado.
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q") ?? "";

  const [selectedCategory, setSelectedCategory] = useState(ALL);
  // La página se guarda junto a la búsqueda: si la búsqueda cambia, vuelve a la 1.
  const [pagination, setPagination] = useState({ page: 1, search });
  const currentPage = pagination.search === search ? pagination.page : 1;
  const setCurrentPage = (page: number) => setPagination({ page, search });

  const catalogTopRef = useRef<HTMLElement>(null);

  const filteredPlants = useMemo(() => {
    const normalizedSearch = normalize(search.trim());

    return catalogo.filter((plant) => {
      const matchesSearch =
        normalize(plant.name).includes(normalizedSearch) ||
        normalize(plant.category).includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === ALL || plant.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const totalPages = Math.ceil(filteredPlants.length / ITEMS_PER_PAGE);

  const paginatedPlants = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPlants.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPlants, currentPage]);

  const changePage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(totalPages, page)));

    requestAnimationFrame(() => {
      catalogTopRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const clearFilters = () => {
    setSelectedCategory(ALL);
    setCurrentPage(1);
    setSearchParams({}, { replace: true });
  };

  const chipClass = (isActive: boolean) =>
    `min-h-11 shrink-0 rounded-full px-5 text-sm font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 ${
      isActive
        ? "bg-[#203b2d] text-[#f8f6ef]"
        : "bg-[#e8e5dc] text-[#203b2d] hover:bg-[#dcd9cf]"
    }`;

  return (
    <section
      ref={catalogTopRef}
      aria-labelledby="catalogo-title"
      className="scroll-mt-28"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-5">
        <div>
          <h2
            id="catalogo-title"
            className="font-display text-[26px] font-medium leading-tight tracking-tight sm:text-4xl"
          >
            Todo el catálogo
          </h2>
          <p className="mt-1.5 text-sm text-gray-600" aria-live="polite">
            {search.trim()
              ? `${filteredPlants.length} resultados para “${search.trim()}”`
              : `${filteredPlants.length} productos`}
          </p>
        </div>

        <div
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
          aria-label="Filtrar por categoría"
        >
          {categories.map((category) => {
            const isSelected = selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                aria-pressed={isSelected}
                className={chipClass(isSelected)}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {filteredPlants.length > 0 ? (
        <>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {paginatedPlants.map((plant) => (
              <PlantCard key={plant.slug} plant={plant} />
            ))}
          </div>

          {totalPages > 1 && (
            <nav
              className="mt-10 flex flex-wrap items-center justify-center gap-2"
              aria-label="Paginación de productos"
            >
              <button
                type="button"
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
                className="min-h-11 rounded-full border border-green-900/20 px-4 text-sm font-semibold text-[#203b2d] transition hover:bg-[#e8e5dc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Anterior
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => changePage(page)}
                    aria-current={currentPage === page ? "page" : undefined}
                    className={`h-11 min-w-11 rounded-full px-3 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 ${
                      currentPage === page
                        ? "bg-[#203b2d] text-[#f8f6ef]"
                        : "bg-[#e8e5dc] text-[#203b2d] hover:bg-[#dcd9cf]"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                type="button"
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="min-h-11 rounded-full border border-green-900/20 px-4 text-sm font-semibold text-[#203b2d] transition hover:bg-[#e8e5dc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Siguiente
              </button>
            </nav>
          )}
        </>
      ) : (
        <div className="mt-8 rounded-3xl border border-green-900/10 bg-white px-5 py-14 text-center">
          <p className="font-display text-xl font-medium text-[#203b2d]">
            No encontramos productos
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Prueba con otro nombre o selecciona otra categoría.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 min-h-11 text-sm font-semibold text-green-800 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
          >
            Limpiar búsqueda
          </button>
        </div>
      )}
    </section>
  );
}

export default PlantGrid;
