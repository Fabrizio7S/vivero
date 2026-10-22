
import { Link } from "react-router-dom";

const whatsappNumber = "51994684483";
const whatsappMessage = encodeURIComponent(
  "Hola, Vivero Nativa. Quisiera consultar sobre sus productos.",
);

function ContactPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:py-16">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-700">
            Vivero Nativa
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#203b2d] sm:text-5xl">
            Estamos aquí para ayudarte
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-gray-600">
            ¿Buscas una planta para tu hogar o jardín? Escríbenos y te
            ayudaremos a encontrar lo que necesitas.
          </p>

          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#203b2d] px-6 py-3 font-semibold text-white transition hover:bg-[#2f6b45]"
          >
            Consultar por WhatsApp
          </a>

          <Link
            to="/"
            className="ml-4 inline-flex min-h-12 items-center font-medium text-[#203b2d] hover:underline"
          >
            Volver al catálogo
          </Link>
        </div>

        <div className="rounded-3xl border border-green-900/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="space-y-7">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e9e9df] text-[#203b2d]">
                <span aria-hidden="true">W</span>
              </div>
              <div>
                <h2 className="font-semibold text-[#203b2d]">WhatsApp</h2>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block text-gray-600 hover:text-green-800"
                >
                  +51 994 684 483
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e9e9df] text-[#203b2d]">
                <span aria-hidden="true">⌖</span>
              </div>
              <div>
                <h2 className="font-semibold text-[#203b2d]">Ubicación</h2>
                <p className="mt-1 leading-6 text-gray-600">
                  Av. Manuel Valle, paradero Portón – Pachacámac
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e9e9df] text-[#203b2d]">
                <span aria-hidden="true">◷</span>
              </div>
              <div>
                <h2 className="font-semibold text-[#203b2d]">
                  Horario de atención
                </h2>
                <p className="mt-1 leading-6 text-gray-600">
                  Lunes a domingo
                  <br />
                  8:00 a. m. – 6:00 p. m.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
