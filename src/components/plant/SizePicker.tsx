import type { PlantSize } from "../../types/plant";

interface SizePickerProps {
  sizes: PlantSize[];
  selected: number;
  onSelect: (index: number) => void;
}

// Botones de tamaño (Pequeño / Mediano / Grande). Solo muestran el nombre;
// al elegir uno, el precio grande de arriba cambia al de ese tamaño.
function SizePicker({ sizes, selected, onSelect }: SizePickerProps) {
  return (
    <fieldset className="mt-5">
      <legend className="text-sm font-semibold text-bosque">Elige el tamaño</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {sizes.map((size, index) => {
          const isSelected = index === selected;
          return (
            <button
              key={size.label}
              type="button"
              onClick={() => onSelect(index)}
              aria-pressed={isSelected}
              className={`min-h-11 min-w-24 rounded-full border px-5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 ${
                isSelected
                  ? "border-bosque bg-bosque text-crema"
                  : "border-green-900/15 bg-white text-bosque hover:border-bosque"
              }`}
            >
              {size.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export default SizePicker;
