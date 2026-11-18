import { useCart } from "../../lib/carrito";
import { CartIcon } from "../ui/icons";

// Botón del encabezado: abre el carrito y muestra cuántos productos lleva.
function CartButton() {
  const { count, open } = useCart();

  return (
    <button
      type="button"
      onClick={open}
      aria-label={count > 0 ? `Abrir carrito, ${count} ${count === 1 ? "producto" : "productos"}` : "Abrir carrito"}
      className="relative flex h-11 w-11 items-center justify-center rounded-full border border-green-900/15 bg-white text-bosque transition hover:border-bosque focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-800"
    >
      <CartIcon className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-hoja px-1 text-[11px] font-bold text-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}

export default CartButton;
