import { TruckIcon } from "../ui/icons";

interface ShippingBadgeProps {
  size?: "sm" | "md";
}

// Distintivo "Envío a todo el Perú" con ícono de camión.
// Se muestra en las plantas con envioNacional (por defecto, todas).
function ShippingBadge({ size = "sm" }: ShippingBadgeProps) {
  const isSmall = size === "sm";

  return (
    <p
      className={`inline-flex items-center gap-1.5 rounded-full bg-menta font-medium text-hoja ${
        isSmall ? "px-2.5 py-1 text-xs" : "px-3.5 py-1.5 text-sm"
      }`}
    >
      <TruckIcon className={isSmall ? "h-3.5 w-3.5" : "h-4 w-4"} />
      Envío a todo el Perú
    </p>
  );
}

export default ShippingBadge;
