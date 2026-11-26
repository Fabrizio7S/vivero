import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../../lib/carrito";
import { catalogo, categories as plantCategories } from "../../lib/catalogo";
import { formatPriceLabel, normalize } from "../../lib/formato";
import { SECTION_IDS } from "../../lib/scroll";
import type { Plant } from "../../types/plant";
import PlantCard from "../plant/PlantCard";
import { PlusIcon } from "../ui/icons";

const PAGE_SIZE = 12;
const ALL = "Todas";

// Botones de filtro: "Todas" + las categorías del catálogo, en el orden de lib/catalogo.ts.
const categories = [ALL, ...plantCategories];

// Fila de la lista de precios (productos sin foto: macetas, sustratos, parantes).
function PriceListRow({ plant, showCategory }: { plant: Plant; showCategory: boolean }) {
  const { add } = useCart();
  const canQuickAdd = plant.sizes.length === 0 && plant.prices.length > 0;

  return (
    <li className="flex items-center justify-between gap-3 border-b border-green-900/10 py-3">
      <Link to={`/producto/${plant.slug}`} className="min-w-0 flex-1 hover:text-hoja">
        <span className="block font-medium leading-tight text-bosque">{plant.name}</span>
        <span className="block text-sm text-gray-600">
          {showCategory ? `${plant.category} · ` : ""}
          {formatPriceLabel(plant.prices)}
          {plant.sizes.length > 1 ? ` · ${plant.sizes.length} tamaños` : ""}
        </span>
      </Link>
      {canQuickAdd ? (
        <button
          type="button"
          onClick={() => add(plant)}
          aria-label={`Agregar ${plant.name} al carrito`}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-menta text-bosque transition hover:bg-bosque hover:text-crema focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      ) : (
        <Link
          to={`/producto/${plant.slug}`}
          className="shrink-0 text-sm font-semibold text-bosque underline underline-offset-4"
        >
          Elegir
        </Link>
      )}
    </li>
  );
}

// "Todo el catálogo": filtros por categoría, búsqueda (desde el encabezado) y "Ver más".
function CatalogSection() {
  // La búsqueda vive en la URL (?q=) porque el buscador está en el encabezado.
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q") ?? "";

  const [selectedCategory, setSelectedCategory] = useState(ALL);

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

  // Con foto: tarjetas. Sin foto (macetas, sustratos, parantes): lista de precios.
  const withPhoto = filteredPlants.filter((plant) => plant.images.length > 0);
  const priceList = filteredPlants.filter((plant) => plant.images.length === 0);

  // Paginación. Al cambiar categoría o búsqueda vuelve a la página 0.
  const filterKey = `${selectedCategory}|${search}`;
  const [pageState, setPageState] = useState({ page: 0, key: filterKey });
  const page = pageState.key === filterKey ? pageState.page : 0;
  const totalPages = Math.ceil(withPhoto.length / PAGE_SIZE);
  const visiblePlants = withPhoto.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const clearFilters = () => {
    setSelectedCategory(ALL);
    setSearchParams({}, { replace: true });
  };

  const chipClass = (isActive: boolean) =>
    `min-h-11 shrink-0 rounded-full px-5 text-sm font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 ${
      isActive
        ? "bg-bosque text-crema"
        : "bg-arena text-bosque hover:bg-arena-oscura"
    }`;

  return (
    <div
      id={SECTION_IDS.catalogo}
      className="mx-auto max-w-7xl scroll-mt-28 px-4 py-12 sm:px-6 sm:py-16"
    >
      <section
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
                  onClick={() => setSelectedCategory(category)}
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
            {withPhoto.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
                {visiblePlants.map((plant) => (
                  <PlantCard key={plant.slug} plant={plant} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <Pagination page={page} total={totalPages} onChange={(p) => { setPageState({ page: p, key: filterKey }); document.getElementById(SECTION_IDS.catalogo)?.scrollIntoView({ behavior: "smooth", block: "start" }); }} />
            )}

            {/* Macetas, sustratos, líquidos y parantes: sin foto, como lista de precios. */}
            {priceList.length > 0 && (page === totalPages - 1 || totalPages <= 1 || selectedCategory !== ALL) && (
              <div className={withPhoto.length > 0 ? "mt-14" : "mt-6 sm:mt-8"}>
                {withPhoto.length > 0 && (
                  <h3 className="font-display text-2xl font-medium text-bosque">Lista de precios</h3>
                )}
                <ul className="mt-2 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
                  {priceList.map((plant) => (
                    <PriceListRow
                      key={plant.slug}
                      plant={plant}
                      showCategory={selectedCategory === ALL}
                    />
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          <div className="mt-8 rounded-3xl border border-green-900/10 bg-white px-5 py-14 text-center">
            <p className="font-display text-xl font-medium text-bosque">
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
    </div>
  );
}

// Paginación numerada con elipsis cuando hay muchas páginas.
function Pagination({ page, total, onChange }: { page: number; total: number; onChange: (p: number) => void }) {
  // Genera los números de página que se muestran (máx. 7 botones).
  const pages: (number | "…")[] = (() => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i);
    if (page < 4) return [0, 1, 2, 3, 4, "…", total - 1];
    if (page > total - 5) return [0, "…", total - 5, total - 4, total - 3, total - 2, total - 1];
    return [0, "…", page - 1, page, page + 1, "…", total - 1];
  })();

  const btn = (label: string | number, to: number, active = false, disabled = false) => (
    <button
      key={label}
      type="button"
      disabled={disabled}
      onClick={() => !disabled && onChange(to)}
      aria-current={active ? "page" : undefined}
      className={`flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 ${
        active
          ? "bg-bosque text-crema"
          : disabled
            ? "cursor-not-allowed opacity-30 text-bosque"
            : "text-bosque hover:bg-bosque/10"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="mt-10 flex items-center justify-center gap-1">
      {btn("←", page - 1, false, page === 0)}
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`ellipsis-${i}`} className="flex h-10 w-6 items-center justify-center text-bosque/40 select-none">
            …
          </span>
        ) : (
          btn(p + 1, p, p === page)
        ),
      )}
      {btn("→", page + 1, false, page === total - 1)}
    </div>
  );
}

export default CatalogSection;
