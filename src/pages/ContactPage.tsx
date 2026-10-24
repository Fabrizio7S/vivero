const whatsappNumber = "51994684483";
const whatsappMessage = encodeURIComponent(
  "Hola, Vivero Nativa. Quisiera consultar sobre sus productos.",
);

function ContactPage() {
  return (
    <section
      id="contacto"
      className="scroll-mt-24 border-t border-green-900/10 bg-[#f8f6ef]"
      aria-labelledby="contact-title"
    >
      <div className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
        <div className="grid overflow-hidden rounded-2xl border border-green-900/10 bg-white shadow-sm md:grid-cols-2">
          <div className="flex flex-col items-start justify-center p-7 sm:p-10 lg:p-14">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-green-700">
              Hablemos
            </p>

            <h2 className="mt-4 max-w-md text-3xl font-semibold leading-[1.1] tracking-tight text-[#203b2d] sm:text-4xl">
              ¿Tienes alguna consulta?
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-gray-600 sm:text-base">
              Escríbenos por WhatsApp y te ayudaremos a encontrar la planta
              ideal para tu hogar, jardín o espacio de trabajo.
            </p>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#203b2d] px-6 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#2f6b45] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-800"
            >
              <span aria-hidden="true">◉</span>
              Contactar por WhatsApp
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="relative min-h-[260px] overflow-hidden sm:min-h-[320px]">
            <img
              src="/imagenes/plantas/inicio.jpg"
              alt="Plantas de Vivero Nativa"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-[#203b2d]/30 p-6">
              <div className="rounded-xl border border-white/60 bg-[#f8f6ef]/90 px-7 py-5 text-center shadow-lg backdrop-blur-sm">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-green-800">
                  Bienvenido a
                </p>
                <p className="mt-1 text-3xl font-semibold tracking-tight text-[#203b2d]">
                  Vivero Nativa
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  Naturaleza para tus espacios
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-green-900/10 bg-white shadow-sm sm:mt-16 lg:grid lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative isolate flex flex-col items-start justify-center overflow-hidden bg-[#203b2d] px-7 py-10 text-white sm:px-10 sm:py-14 lg:px-14 lg:py-16">
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-24 -z-10 h-64 w-64 rounded-full border border-white/10"
            />
            <div
              aria-hidden="true"
              className="absolute -right-10 -top-14 -z-10 h-44 w-44 rounded-full border border-white/10"
            />
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d7dfc9]">
              Hagamos realidad tu espacio
            </p>
            <h2
              id="contact-title"
              className="mt-5 max-w-lg text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-[2.75rem]"
            >
              Tu próximo espacio verde empieza con una conversación.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/75 sm:text-base">
              Cuéntanos qué buscas. Te ayudamos a encontrar las plantas ideales
              para darle vida a tu hogar, jardín o espacio de trabajo.
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#f8f6ef] px-6 py-3 text-sm font-semibold text-[#203b2d] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Conversemos por WhatsApp
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="flex flex-col justify-center gap-8 px-7 py-9 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            <div className="flex items-start gap-4 border-b border-green-900/10 pb-7">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e8e5dc] text-[#203b2d]" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-700">
                  Visítanos
                </p>
                <h3 className="mt-2 text-base font-semibold text-[#203b2d] sm:text-lg">
                  Estamos en Lurín, Lima
                </h3>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Casica%20-%20Poro%20Port%C3%B3n%2C%20Lur%C3%ADn%2015823"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex min-h-9 flex-wrap items-center gap-1 text-sm leading-6 text-gray-600 underline decoration-green-800/40 underline-offset-4 transition-colors hover:text-green-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-800"
                >
                  Casica - Poro Portón, Lurín 15823
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            <div className="grid gap-7 sm:grid-cols-2 sm:gap-5">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e8e5dc] text-[#203b2d]" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 5.5A1.5 1.5 0 0 1 5.5 4h2.2a1.5 1.5 0 0 1 1.46 1.15l.55 2.2a1.5 1.5 0 0 1-.75 1.68l-1.5.86a12 12 0 0 0 6.65 6.65l.86-1.5a1.5 1.5 0 0 1 1.68-.75l2.2.55A1.5 1.5 0 0 1 20 16.3v2.2a1.5 1.5 0 0 1-1.5 1.5H18C10.27 20 4 13.73 4 6v-.5Z" />
                  </svg>
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-700">
                    Llámanos
                  </p>
                  <a
                    href={`tel:+${whatsappNumber}`}
                    className="mt-2 inline-flex min-h-9 items-center text-sm font-medium text-[#203b2d] transition-colors hover:text-green-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-800"
                  >
                    +51 994 684 483
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e8e5dc] text-[#203b2d]" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.6">
                    <circle cx="12" cy="12" r="8.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
                  </svg>
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-700">
                    Horario
                  </p>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Lunes a domingo
                    <br />
                    8:00 a. m. – 6:00 p. m.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
