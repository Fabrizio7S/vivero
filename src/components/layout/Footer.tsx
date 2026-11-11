import { Link } from "react-router-dom";
import { mapsUrl, vivero, whatsappUrl } from "../../config/vivero";
import { SECTION_IDS } from "../../lib/scroll";
import { WhatsAppIcon } from "../ui/icons";
import SocialLinks from "../ui/SocialLinks";

const currentYear = new Date().getFullYear();

const footerLink =
  "inline-flex min-h-10 items-center text-[15px] text-crema/80 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

function FooterTitle({ children }: { children: string }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-salvia">{children}</h2>
  );
}

// Pie de página: marca y redes, navegación, contacto y envíos.
// Los textos y datos de contacto se cambian en src/config/vivero.ts.
function Footer() {
  return (
    <footer className="bg-bosque px-4 pt-12 text-crema sm:px-6 sm:pt-16">
      <div className="mx-auto grid max-w-7xl gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1.2fr_1fr] lg:gap-12">
        <div>
          <Link
            to="/"
            className="inline-flex focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {/* Versión blanca y amarilla del logo, para el fondo verde. */}
            <img
              src="/marca/logo-blanco.webp"
              alt={vivero.nombre}
              width={684}
              height={128}
              loading="lazy"
              className="h-10 w-auto"
            />
          </Link>
          <p className="mt-4 max-w-xs text-[15px] leading-7 text-crema/75">{vivero.textos.lema}</p>
          <SocialLinks className="mt-6" />
        </div>

        <nav aria-label="Pie de página">
          <FooterTitle>Explora</FooterTitle>
          <ul className="mt-4 space-y-1">
            <li>
              <a href={`/#${SECTION_IDS.masVendidos}`} className={footerLink}>
                Más vendidos
              </a>
            </li>
            <li>
              <a href={`/#${SECTION_IDS.catalogo}`} className={footerLink}>
                Catálogo
              </a>
            </li>
            <li>
              <a href={`/#${SECTION_IDS.contacto}`} className={footerLink}>
                Contacto
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <FooterTitle>Contacto</FooterTitle>
          <ul className="mt-4 space-y-3 text-[15px] leading-6 text-crema/80">
            <li>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={footerLink}>
                {vivero.direccion.textoCompleto}
              </a>
            </li>
            <li>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={`${footerLink} gap-2`}>
                <WhatsAppIcon className="h-4 w-4" />
                {vivero.telefonoVisible}
              </a>
            </li>
            <li>{vivero.horario.texto}</li>
          </ul>
        </div>

        <div>
          <FooterTitle>Envíos</FooterTitle>
          <p className="mt-4 text-[15px] leading-7 text-crema/80">{vivero.textos.envios}</p>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-2 border-t border-crema/15 py-6 text-[13px] text-crema/60 sm:flex-row sm:justify-between">
        {/* El año se calcula también al compilar: si cambió desde entonces, no es un error. */}
        <p suppressHydrationWarning>
          © {currentYear} {vivero.nombre}. Todos los derechos reservados.
        </p>
        <p>
          {vivero.direccion.distrito}, {vivero.direccion.ciudad} · Perú
        </p>
      </div>
    </footer>
  );
}

export default Footer;
