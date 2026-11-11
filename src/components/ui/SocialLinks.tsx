import type { ReactNode } from "react";
import { redesSociales, type RedSocial } from "../../config/vivero";

// Logos simplificados de cada red (usan el color del texto).
const iconos: Record<RedSocial, ReactNode> = {
  Instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="h-5 w-5" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M13.5 22v-7.5h2.6l.4-3h-3V9.6c0-.9.3-1.5 1.6-1.5h1.6V5.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.6V22h2.9Z" />
    </svg>
  ),
  TikTok: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M16.6 2h-3.3v13.4a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9.2a6.2 6.2 0 1 0 5.3 6.2V8.6a7.9 7.9 0 0 0 4.6 1.5V6.8a4.6 4.6 0 0 1-4.6-4.6V2Z" />
    </svg>
  ),
};

interface SocialLinksProps {
  // "dark": íconos claros sobre fondo verde oscuro; "light": sobre fondo claro.
  variant?: "dark" | "light";
  className?: string;
}

function SocialLinks({ variant = "dark", className = "" }: SocialLinksProps) {
  const buttonColors =
    variant === "dark"
      ? "bg-crema/10 text-crema hover:bg-crema hover:text-bosque focus-visible:outline-white"
      : "bg-bosque/[0.07] text-bosque hover:bg-bosque hover:text-crema focus-visible:outline-green-800";

  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {redesSociales.map((red) => (
        <li key={red.nombre}>
          <a
            href={red.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${red.nombre} de Vivero Nativa (${red.usuario})`}
            title={red.nombre}
            className={`flex h-11 w-11 items-center justify-center rounded-full transition duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 ${buttonColors}`}
          >
            {iconos[red.nombre]}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default SocialLinks;
