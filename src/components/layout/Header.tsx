import { Link } from "react-router-dom";
import { vivero, whatsappUrl } from "../../config/vivero";
import { SECTION_IDS } from "../../lib/scroll";
import { WhatsAppIcon } from "../ui/icons";
import SearchBar from "./SearchBar";

const navLink =
  "hidden py-2.5 transition-colors hover:text-hoja focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-800 sm:inline";

// Encabezado fijo: logo, buscador, enlaces y botón de WhatsApp.
function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-green-900/10 bg-crema/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center" aria-label={`${vivero.nombre}, ir al inicio`}>
          <img
            src="/marca/logo-color.webp"
            alt={vivero.nombre}
            width={684}
            height={128}
            fetchPriority="high"
            className="h-9 w-auto sm:h-11"
          />
        </Link>

        {/* En celular el buscador baja a su propia fila. */}
        <div className="order-last w-full md:order-none md:w-auto md:max-w-md md:flex-1">
          <SearchBar />
        </div>

        <nav aria-label="Principal" className="flex items-center gap-5 text-[15px] font-medium sm:gap-7">
          <a href={`/#${SECTION_IDS.catalogo}`} className={navLink}>
            Catálogo
          </a>
          <a href={`/#${SECTION_IDS.contacto}`} className={navLink}>
            Contacto
          </a>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escríbenos por WhatsApp"
            className="inline-flex h-11 min-w-11 items-center justify-center gap-2.5 rounded-full bg-bosque text-sm font-semibold text-crema transition hover:-translate-y-0.5 hover:bg-hoja focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-800 sm:px-5"
          >
            <WhatsAppIcon />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
