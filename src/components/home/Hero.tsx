import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { whatsappUrl } from "../../config/vivero";
import { masVendidos } from "../../data/plantas";
import { findPlant } from "../../lib/catalogo";
import { formatPriceLabel } from "../../lib/formato";
import { SECTION_IDS } from "../../lib/scroll";
import type { Plant } from "../../types/plant";
import { WhatsAppIcon } from "../ui/icons";

// Plantas que pasan por la portada, en este orden. Solo van plantas cuya foto
// muestra la planta completa con su maceta sobre el fondo de estudio, y con
// hojas más oscuras que el fondo (las hojas blancas, como el caladium blanco,
// se confunden con el nombre NATIVA). Las más vendidas llevan "Más pedida".
// "foto" es opcional: elige otra foto de la planta en public/Web.
const DESTACADAS: { slug: string; foto?: string }[] = [
  { slug: "anturio-rojo", foto: "/Web/anturio-rojo-4-top.webp" },
  { slug: "caladium-rojo" },
  { slug: "monstera-adansonii" },
  { slug: "begonia-rex-fucsia" },
  { slug: "alocasia-frydek" },
  { slug: "orquidea-phalaenopsis-grande-fucsia" },
  { slug: "calathea-pavo-real" },
  { slug: "aglaonema-rosada-legacy" },
];

const DURACION = 5200; // ms que cada planta se queda en escena (igual que .barra-tiempo)

type PlantaPortada = Plant & { portada: string };

const plantas: PlantaPortada[] = DESTACADAS.flatMap(({ slug, foto }) => {
  const plant = findPlant(slug);
  return plant ? [{ ...plant, portada: foto ?? plant.images[0] }] : [];
});

// Portada: el nombre NATIVA gigante detrás y las plantas que crecen una tras otra.
function Hero() {
  const [actual, setActual] = useState(-1); // -1: aún no entra la primera
  const [pausa, setPausa] = useState(false);
  const [quieto, setQuieto] = useState(false); // prefers-reduced-motion

  // Entrada de la primera planta (y preferencia de "menos movimiento").
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- preferencia del sistema
    setQuieto(reduce);
    const t = setTimeout(() => setActual(0), reduce ? 0 : 150);
    return () => clearTimeout(t);
  }, []);

  // Cambio automático.
  useEffect(() => {
    if (actual < 0 || pausa || quieto) return;
    const t = setTimeout(
      () => setActual((i) => (i + 1) % plantas.length),
      DURACION + (actual === 0 ? 900 : 0),
    );
    return () => clearTimeout(t);
  }, [actual, pausa, quieto]);

  // Pausa cuando la pestaña no está visible.
  useEffect(() => {
    const vis = () => setPausa(document.hidden);
    document.addEventListener("visibilitychange", vis);
    return () => document.removeEventListener("visibilitychange", vis);
  }, []);

  const planta = plantas[Math.max(actual, 0)];

  return (
    <section
      id={SECTION_IDS.inicio}
      className="relative isolate scroll-mt-28 overflow-hidden bg-estudio xl:min-h-[calc(88svh-4.5rem)]"
    >
      {/* Escena: nombre detrás, planta delante */}
      <div
        className="relative h-[60svh] min-h-[400px] xl:absolute xl:inset-0 xl:h-auto"
        onMouseEnter={() => setPausa(true)}
        onMouseLeave={() => setPausa(false)}
      >
        <div className="absolute bottom-0 left-1/2 aspect-square h-[88%] -translate-x-1/2 sm:h-[92%] xl:left-[52%] xl:h-[min(78svh,50vw)] 2xl:left-1/2">
          {plantas.map((p, i) => (
            <img
              key={p.slug}
              src={p.portada}
              alt={i === actual ? `${p.name} en maceta` : ""}
              aria-hidden={i !== actual}
              width={1200}
              height={1200}
              className={`escena-planta absolute inset-0 h-full w-full ${i === actual ? "activa" : ""}`}
              fetchPriority={i === 0 ? "high" : "low"}
              loading={i < 2 ? "eager" : "lazy"}
            />
          ))}
        </div>

        <p
          aria-hidden="true"
          className="nombre-fondo pointer-events-none absolute inset-x-0 top-[17%] z-10 select-none text-center text-[33vw] xl:top-[10svh] xl:text-[25vw]"
        >
          NATIVA
        </p>

        {/* Ficha de la planta en escena (celular y tablet) */}
        <div className="absolute inset-x-0 bottom-3 z-20 flex items-end justify-between gap-3 px-4 sm:px-6 xl:hidden">
          <InfoPlanta planta={planta} clave={actual} />
        </div>
      </div>

      {/* Indicador: una miniatura por planta, con barra de tiempo */}
      <Miniaturas
        actual={actual}
        pausa={pausa || quieto}
        onElegir={setActual}
        className="relative z-20 px-4 pt-4 sm:px-6 xl:hidden"
      />

      {/* Texto */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 xl:pointer-events-none xl:flex xl:min-h-[calc(88svh-4.5rem)] xl:items-end xl:pb-12 xl:pt-16">
        <div className="grid w-full gap-8 xl:grid-cols-[1fr_auto] xl:items-end">
          <div className="xl:pointer-events-auto xl:max-w-md 2xl:max-w-xl">
            <h1 className="tras-crecer font-display text-[2.6rem] font-medium leading-[0.98] tracking-tight text-bosque sm:text-6xl 2xl:text-7xl">
              Plantas de vivero, directo a tu casa.
            </h1>
            <p
              className="tras-crecer mt-4 max-w-md text-lg leading-snug text-bosque/80"
              style={{ ["--i" as string]: 1 }}
            >
              Somos un vivero en Lurín. Elige tu planta, escríbenos por WhatsApp y te la enviamos a
              cualquier lugar del Perú.
            </p>
            <div className="tras-crecer mt-6 flex flex-wrap gap-3" style={{ ["--i" as string]: 2 }}>
              <a
                href={`/#${SECTION_IDS.catalogo}`}
                className="inline-flex min-h-12 items-center rounded-full bg-bosque px-6 font-semibold text-crema transition hover:-translate-y-0.5 hover:bg-hoja focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-800"
              >
                Ver catálogo
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-crema px-6 font-semibold text-bosque ring-1 ring-bosque/15 transition hover:ring-bosque/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-800"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Pedir por WhatsApp
              </a>
            </div>
          </div>

          {/* Escritorio: ficha y miniaturas a la derecha */}
          <div
            className="tras-crecer pointer-events-auto hidden w-[24rem] xl:block"
            style={{ ["--i" as string]: 3 }}
          >
            <div className="rounded-3xl bg-crema/80 p-5 shadow-[0_20px_50px_-24px_rgb(32_59_45/0.45)] backdrop-blur-md">
              <InfoPlanta planta={planta} clave={actual} grande />
              <Miniaturas actual={actual} pausa={pausa || quieto} onElegir={setActual} className="mt-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Nombre, precio y "Ver planta" de la planta que está en escena.
function InfoPlanta({
  planta,
  clave,
  grande = false,
}: {
  planta: Plant | undefined;
  clave: number;
  grande?: boolean;
}) {
  if (!planta) return null;
  return (
    <div
      className={`flex w-full items-end justify-between gap-4 ${
        grande ? "" : "rounded-2xl bg-crema/80 p-3 pl-4 backdrop-blur-md"
      }`}
    >
      <div key={clave} className="cambio-texto min-w-0" aria-live="polite">
        {masVendidos.includes(planta.slug) ? (
          <p className="inline-block rounded-full bg-sol px-2 py-0.5 text-xs font-semibold text-bosque">
            Más pedida
          </p>
        ) : (
          <p className="text-sm text-bosque/60">En el vivero hoy</p>
        )}
        <p
          className={`font-display truncate font-medium leading-tight text-bosque ${
            grande ? "text-2xl" : "text-xl"
          }`}
        >
          {planta.name}
        </p>
        <p className="text-bosque/75">{formatPriceLabel(planta.prices)}</p>
      </div>
      <Link
        to={`/producto/${planta.slug}`}
        className="shrink-0 rounded-full bg-bosque px-4 py-2.5 text-sm font-semibold text-crema transition hover:bg-hoja focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
      >
        Ver planta
      </Link>
    </div>
  );
}

// Una miniatura por planta; la activa lleva la barra de tiempo.
function Miniaturas({
  actual,
  pausa,
  onElegir,
  className = "",
}: {
  actual: number;
  pausa: boolean;
  onElegir: (i: number) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex justify-between gap-1.5" role="tablist" aria-label="Plantas de la portada">
        {plantas.map((p, i) => (
          <button
            key={p.slug}
            type="button"
            role="tab"
            aria-selected={i === actual}
            aria-label={p.name}
            onClick={() => onElegir(i)}
            className="group flex flex-1 flex-col items-center gap-2"
          >
            <img
              src={p.portada}
              alt=""
              width={1200}
              height={1200}
              loading="lazy"
              className={`aspect-square w-full max-w-11 rounded-full object-cover ring-2 transition ${
                i === actual ? "ring-bosque" : "opacity-70 ring-transparent group-hover:opacity-100"
              }`}
            />
            <span className="block h-[3px] w-full overflow-hidden rounded-full bg-bosque/10">
              {i === actual && (
                <span
                  key={actual}
                  className="barra-tiempo block h-full bg-bosque"
                  style={{ animationPlayState: pausa ? "paused" : "running" }}
                />
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Hero;
