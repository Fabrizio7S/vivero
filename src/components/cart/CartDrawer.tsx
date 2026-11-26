import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { vivero } from "../../config/vivero";
import { useCart } from "../../lib/carrito";
import { formatPrice } from "../../lib/formato";
import { CloseIcon, MinusIcon, PlusIcon, TrashIcon, WhatsAppIcon } from "../ui/icons";

const iconButton =
  "flex h-9 w-9 items-center justify-center rounded-full transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800";

// Panel lateral del carrito: productos, cantidades, total y envío del pedido por WhatsApp.
function CartDrawer() {
  const { lines, count, total, hasUnpricedItems, isOpen, close, setQty, remove, clear, whatsappOrderUrl } =
    useCart();
  const panelRef = useRef<HTMLDivElement>(null);

  // Al abrir: foco en el panel, sin scroll de fondo y Escape para cerrar.
  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        aria-label="Cerrar carrito"
        onClick={close}
        className="absolute inset-0 h-full w-full cursor-default bg-black/40"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        tabIndex={-1}
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-crema shadow-2xl outline-none"
      >
        <div className="flex items-center justify-between border-b border-green-900/10 px-5 py-4">
          <h2 id="cart-title" className="font-display text-2xl font-medium text-bosque">
            Tu carrito {count > 0 && <span className="text-base text-gray-500">({count})</span>}
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar carrito"
            className={`${iconButton} text-bosque hover:bg-arena`}
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <p className="font-display text-xl font-medium text-bosque">Tu carrito está vacío</p>
            <p className="mt-2 text-sm text-gray-600">Agrega plantas desde el catálogo.</p>
            <button
              type="button"
              onClick={close}
              className="mt-6 min-h-11 rounded-full bg-bosque px-6 text-sm font-semibold text-crema transition hover:bg-hoja focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
            >
              Seguir viendo plantas
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-green-900/10 overflow-y-auto px-5">
              {lines.map((line) => (
                <li key={line.key} className="flex gap-3.5 py-4">
                  <Link
                    to={`/producto/${line.plant.slug}`}
                    onClick={close}
                    className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-arena"
                  >
                    {/* Sin foto (macetas, sustratos…): hoja de la marca. */}
                    <img
                      src={line.plant.images[0] ?? "/marca/icono-192.png"}
                      alt={line.plant.name}
                      width={1200}
                      height={1200}
                      loading="lazy"
                      className={
                        line.plant.images[0]
                          ? "h-full w-full object-cover"
                          : "m-auto h-1/2 w-1/2 translate-y-1/2 opacity-30 grayscale"
                      }
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-semibold leading-tight text-bosque">{line.plant.name}</p>
                        {line.size && <p className="mt-0.5 text-sm text-gray-600">Tamaño: {line.size}</p>}
                        <p className="mt-0.5 text-sm text-gray-600">
                          {line.unitPrice ? formatPrice(line.unitPrice) : "Precio a consultar"}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(line.key)}
                        aria-label={`Quitar ${line.plant.name} del carrito`}
                        className={`${iconButton} shrink-0 text-gray-500 hover:bg-arena hover:text-bosque`}
                      >
                        <TrashIcon className="h-[18px] w-[18px]" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-full border border-green-900/15 bg-white">
                        <button
                          type="button"
                          onClick={() => setQty(line.key, line.qty - 1)}
                          aria-label={`Quitar una unidad de ${line.plant.name}`}
                          className={`${iconButton} text-bosque hover:bg-arena`}
                        >
                          <MinusIcon className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold" aria-live="polite">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(line.key, line.qty + 1)}
                          aria-label={`Agregar una unidad de ${line.plant.name}`}
                          className={`${iconButton} text-bosque hover:bg-arena`}
                        >
                          <PlusIcon className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="font-semibold text-bosque">
                        {line.unitPrice ? formatPrice(line.subtotal) : "—"}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-green-900/10 bg-white px-5 py-5">
              <div className="flex items-baseline justify-between">
                <span className="font-semibold text-bosque">Total</span>
                <span className="font-display text-2xl font-medium text-bosque">{formatPrice(total)}</span>
              </div>
              {hasUnpricedItems && (
                <p className="mt-1 text-sm text-gray-600">Más los productos con precio a consultar.</p>
              )}
              <p className="mt-1 text-sm text-gray-600">
                {vivero.textos.notaPrecio} El costo de envío se confirma por WhatsApp.
              </p>

              <a
                href={whatsappOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-bosque px-6 font-semibold text-crema transition hover:bg-hoja focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-800"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Enviar pedido por WhatsApp
              </a>
              <button
                type="button"
                onClick={clear}
                className="mt-3 w-full text-center text-sm font-medium text-gray-600 underline-offset-4 hover:text-bosque hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
              >
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartDrawer;
