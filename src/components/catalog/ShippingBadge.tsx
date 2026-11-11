interface ShippingBadgeProps {
  size?: "sm" | "md";
}

// Distintivo "Envío a todo el Perú" con ícono de camión.
function ShippingBadge({ size = "sm" }: ShippingBadgeProps) {
  const isSmall = size === "sm";

  return (
    <p
      className={`inline-flex items-center gap-1.5 rounded-full bg-[#e7efe3] font-medium text-[#2f6b45] ${
        isSmall ? "px-2.5 py-1 text-xs" : "px-3.5 py-1.5 text-sm"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={isSmall ? "h-3.5 w-3.5" : "h-4 w-4"}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 6.5h11v9H3zM14 9.5h3.5L21 13v2.5h-7z"
        />
        <circle cx="7" cy="17.5" r="1.8" />
        <circle cx="17.5" cy="17.5" r="1.8" />
      </svg>
      Envío a todo el Perú
    </p>
  );
}

export default ShippingBadge;
