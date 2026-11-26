import { useState } from "react";

interface PlantGalleryProps {
  images: string[];
  name: string;
}

// Galería de fotos de la ficha: foto grande con flechas y miniaturas debajo.
function PlantGallery({ images, name }: PlantGalleryProps) {
  const [selected, setSelected] = useState(0);
  const total = images.length;

  const go = (index: number) => setSelected((index + total) % total);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-piedra">
        {total > 0 ? (
          <img
            src={images[selected]}
            alt={`${name}, foto ${selected + 1} de ${total}`}
            width={1200}
            height={1200}
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
        ) : (
          // Productos sin foto (macetas, sustratos, parantes): hoja de la marca.
          <img
            src="/marca/icono-192.png"
            alt=""
            width={192}
            height={192}
            className="absolute left-1/2 top-1/2 w-1/4 -translate-x-1/2 -translate-y-1/2 opacity-30 grayscale"
          />
        )}

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(selected - 1)}
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg text-bosque shadow-sm transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
            >
              <span aria-hidden="true">‹</span>
            </button>
            <button
              type="button"
              onClick={() => go(selected + 1)}
              aria-label="Foto siguiente"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg text-bosque shadow-sm transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
            >
              <span aria-hidden="true">›</span>
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-bosque shadow-sm">
              {selected + 1} / {total}
            </span>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setSelected(index)}
              aria-label={`Ver foto ${index + 1}`}
              aria-current={index === selected ? "true" : undefined}
              className={`aspect-square overflow-hidden rounded-lg bg-piedra transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 ${
                index === selected
                  ? "ring-2 ring-bosque ring-offset-2"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={image}
                alt=""
                width={1200}
                height={1200}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default PlantGallery;
