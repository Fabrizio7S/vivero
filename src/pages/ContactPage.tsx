import { whatsappNumber } from "../utils/product";

const whatsappMessage = encodeURIComponent(
  "Hola, Vivero Nativa. Quisiera consultar sobre sus productos.",
);

const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Casica%20-%20Poro%20Port%C3%B3n%2C%20Lur%C3%ADn%2015823";

function ContactPage() {
  return (
    <section
      id="contacto"
      className="mx-auto max-w-7xl scroll-mt-28 px-4 pb-12 sm:px-6 sm:pb-20"
      aria-labelledby="contact-title"
    >
      <div className="overflow-hidden rounded-3xl bg-[#203b2d] text-[#f8f6ef] sm:rounded-[32px] lg:grid lg:grid-cols-[1.15fr_1fr]">
        <div className="px-6 py-10 sm:px-12 sm:py-14 lg:px-14 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d7dfc9] sm:text-[13px]">
            Hagamos realidad tu espacio
          </p>
          <h2
            id="contact-title"
            className="font-display mt-4 max-w-xl text-3xl font-medium leading-[1.08] tracking-tight sm:mt-5 sm:text-[44px]"
          >
            Tu próximo espacio verde empieza con una conversación
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-7 text-[#f8f6ef]/80 sm:text-base">
            Cuéntanos qué buscas. Te ayudamos a encontrar las plantas ideales
            para tu hogar, jardín u oficina.
          </p>

          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#f8f6ef] px-7 text-base font-semibold text-[#203b2d] transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
              <path d="M21 12a9 9 0 0 1-13.5 7.8L3 21l1.2-4.5A9 9 0 1 1 21 12Z" />
            </svg>
            Conversemos por WhatsApp
          </a>

          <div className="mt-10 grid gap-6 border-t border-[#f8f6ef]/15 pt-7 sm:grid-cols-2">
            <div className="flex items-start gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f8f6ef]/10" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#d7dfc9" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </span>
              <div className="min-w-0">
                <p className="text-[15px] font-semibold">Estamos en Lurín, Lima</p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm text-[#f8f6ef]/75 underline decoration-[#f8f6ef]/30 underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Casica - Poro Portón, Lurín 15823
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f8f6ef]/10" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#d7dfc9" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M21 12a9 9 0 0 1-13.5 7.8L3 21l1.2-4.5A9 9 0 1 1 21 12Z" />
                </svg>
              </span>
              <div>
                <p className="text-[15px] font-semibold">WhatsApp</p>
                <p className="mt-1 text-sm text-[#f8f6ef]/75">+51 994 684 483</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-64 sm:h-80 lg:h-auto">
          <img
            src="/Web/helecho-babilonico-3-close.webp"
            alt="Hojas de Helecho Babilónico"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
