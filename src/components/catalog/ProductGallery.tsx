import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

function ProductGallery({ images, name }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0);
  const total = images.length;

  const go = (index: number) => setSelected((index + total) % total);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-[#e9e9df]">
        <img
          src={images[selected]}
          alt={`${name}, foto ${selected + 1} de ${total}`}
          className="h-full w-full object-cover"
        />

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(selected - 1)}
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg text-[#203b2d] shadow-sm transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
            >
              <span aria-hidden="true">‹</span>
            </button>
            <button
              type="button"
              onClick={() => go(selected + 1)}
              aria-label="Foto siguiente"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg text-[#203b2d] shadow-sm transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
            >
              <span aria-hidden="true">›</span>
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-[#203b2d] shadow-sm">
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
              className={`aspect-square overflow-hidden rounded-lg bg-[#e9e9df] transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 ${
                index === selected
                  ? "ring-2 ring-[#203b2d] ring-offset-2"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={image}
                alt=""
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

export default ProductGallery;
