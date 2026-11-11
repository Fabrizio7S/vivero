import { SECTION_IDS } from "../../lib/scroll";
import { ArrowDownIcon } from "../ui/icons";
import SocialLinks from "../ui/SocialLinks";

// Portada: foto de fondo a todo el ancho con el texto encima.
// Para cambiar la foto, reemplaza public/imagenes/portada.webp (1920×729).
function Hero() {
  return (
    <section
      id={SECTION_IDS.inicio}
      className="relative flex min-h-[340px] scroll-mt-28 items-center overflow-hidden sm:min-h-[400px] md:min-h-[460px]"
    >
      <img
        src="/imagenes/portada.webp"
        alt="Plantas de interior en macetas de Vivero Nativa: monstera, filodendros y helechos"
        width={1920}
        height={729}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-right"
      />

      {/* Degradado claro a la izquierda para que el texto se lea sobre la foto. */}
      <div className="absolute inset-0 bg-gradient-to-r from-crema/95 via-crema/80 to-crema/10" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-hoja">
          Plantas que dan vida a tus espacios
        </p>

        <h1 className="mt-5 max-w-xl text-4xl font-semibold leading-[1.08] tracking-tight text-bosque sm:text-5xl md:text-6xl">
          Descubre nuestra colección de plantas
        </h1>

        <p className="mt-5 max-w-md text-base leading-7 text-gray-700 sm:text-lg">
          Naturaleza, frescura y bienestar en cada rincón de tu hogar, oficina o jardín.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={`#${SECTION_IDS.masVendidos}`}
            className="inline-flex min-h-[52px] items-center gap-3 rounded-full bg-bosque px-6 text-[15px] font-semibold text-crema shadow-[0_14px_30px_-14px_rgba(32,59,45,0.7)] transition hover:-translate-y-0.5 hover:bg-hoja focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-800 sm:px-7 sm:text-base"
          >
            Ver las más vendidas
            <ArrowDownIcon />
          </a>

          <SocialLinks variant="light" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
