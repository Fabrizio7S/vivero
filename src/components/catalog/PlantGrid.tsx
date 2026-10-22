import { useMemo, useState } from "react";
import { plants } from "../../data/plants";
import PlantCard from "./PlantCard";

const categories = [
  "Todas",
  "Interior",
  "Aromáticas",
  "Flores y exterior",
  "Frutales",
  "Otros",
  "Macetas",
  "Sustratos y abonos",
  "Líquidos",
  "Parantes",
];

function PlantGrid() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  const filteredPlants = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("es");

    return plants.filter((plant) => {
      const matchesSearch =
        plant.name.toLocaleLowerCase("es").includes(normalizedSearch) ||
        plant.category.toLocaleLowerCase("es").includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === "Todas" ||
        plant.category.toLocaleLowerCase("es") ===
          selectedCategory.toLocaleLowerCase("es");

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <section aria-label="Catálogo de plantas">
      <div className="mx-auto mb-5 max-w-xl">
        <label htmlFor="plant-search" className="sr-only">
          Buscar productos
        </label>

        <div className="flex items-center gap-3 rounded-full border border-green-900/10 bg-white px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-green-800">
          <span aria-hidden="true">⌕</span>

          <input
            id="plant-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar planta o producto..."
            className="w-full min-w-0 bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      <div
        className="mb-8 flex gap-2 overflow-x-auto pb-2"
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
              className={`shrink-0 rounded-full px-4 py-2 text-sm transition-colors ${
                isSelected
                  ? "bg-[#203b2d] text-white"
                  : "bg-[#e8e5dc] text-[#203b2d] hover:bg-[#dcd9cf]"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <p className="mb-4 text-sm text-gray-600" aria-live="polite">
        {filteredPlants.length} productos encontrados
      </p>

      {filteredPlants.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPlants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-white px-5 py-12 text-center">
          <p className="font-medium text-[#203b2d]">
            No encontramos productos
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Prueba con otro nombre o selecciona otra categoría.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSelectedCategory("Todas");
            }}
            className="mt-4 text-sm font-semibold text-green-800 underline"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </section>
  );
}

export default PlantGrid;