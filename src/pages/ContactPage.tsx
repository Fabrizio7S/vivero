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
      <div className="mx-auto max-w-7xl px-5 py-10 sm:py-14">
        <div className="grid overflow-hidden rounded-2xl bg-white shadow-sm md:grid-cols-2">
          <div className="flex flex-col items-start justify-center p-6 sm:p-10 lg:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-700">
              Hablemos
            </p>

            <h2
              id="contact-title"
              className="mt-4 max-w-md text-3xl font-semibold leading-tight tracking-tight text-[#203b2d] sm:text-4xl"
            >
              ¿Tienes alguna consulta?
            </h2>

            <p className="mt-4 max-w-md text-sm leading-6 text-gray-600 sm:text-base">
              Escríbenos por WhatsApp y te ayudaremos a encontrar la planta
              ideal para tu hogar, jardín o espacio de trabajo.
            </p>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#203b2d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2f6b45]"
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

            <div className="absolute inset-0 flex items-center justify-center bg-[#203b2d]/25 p-6">
              <div className="rounded-xl border border-white/50 bg-[#f8f6ef]/90 px-7 py-5 text-center shadow-lg backdrop-blur-sm">
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

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e8e5dc] text-xl text-[#203b2d]">
              <span aria-hidden="true">⌖</span>
            </div>

            <div>
              <h3 className="font-semibold text-[#203b2d]">Visítanos</h3>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Casica%20-%20Poro%20Port%C3%B3n%2C%20Lur%C3%ADn%2015823"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm leading-6 text-gray-600 underline decoration-green-800/40 underline-offset-4 transition hover:text-green-800"
              >
                Casica - Poro Portón,
                <br />
                Lurín 15823
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e8e5dc] text-xl text-[#203b2d]">
              <span aria-hidden="true">☎</span>
            </div>

            <div>
              <h3 className="font-semibold text-[#203b2d]">Llámanos</h3>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block text-sm text-gray-600 hover:text-green-800"
              >
                +51 994 684 483
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e8e5dc] text-xl text-[#203b2d]">
              <span aria-hidden="true">◷</span>
            </div>

            <div>
              <h3 className="font-semibold text-[#203b2d]">
                Horario de atención
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Lunes a domingo
                <br />
                8:00 a. m. – 6:00 p. m.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
