import type { ReactNode } from "react";
import { mapsUrl, vivero, whatsappUrl } from "../../config/vivero";
import { SECTION_IDS } from "../../lib/scroll";
import { MapPinIcon, WhatsAppIcon } from "../ui/icons";
import SocialLinks from "../ui/SocialLinks";

// Dato de contacto con ícono redondo (ubicación, WhatsApp).
function ContactItem({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3.5">
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-crema/10 text-salvia"
        aria-hidden="true"
      >
        {icon}
      </span>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

// Bloque verde de contacto al final de la portada.
// Dirección, teléfono y redes se cambian en src/config/vivero.ts.
function ContactSection() {
  return (
    <section
      id={SECTION_IDS.contacto}
      className="mx-auto max-w-7xl scroll-mt-28 px-4 pb-12 sm:px-6 sm:pb-20"
      aria-labelledby="contact-title"
    >
      <div className="overflow-hidden rounded-3xl bg-bosque text-crema sm:rounded-[32px] lg:grid lg:grid-cols-[1.15fr_1fr]">
        <div className="px-6 py-10 sm:px-12 sm:py-14 lg:px-14 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-salvia sm:text-[13px]">
            Hagamos realidad tu espacio
          </p>
          <h2
            id="contact-title"
            className="font-display mt-4 max-w-xl text-3xl font-medium leading-[1.08] tracking-tight sm:mt-5 sm:text-[44px]"
          >
            Tu próximo espacio verde empieza con una conversación
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-7 text-crema/80 sm:text-base">
            Cuéntanos qué buscas. Te ayudamos a encontrar las plantas ideales para tu hogar, jardín
            u oficina.
          </p>

          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-crema px-7 text-base font-semibold text-bosque transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Conversemos por WhatsApp
          </a>

          <div className="mt-10 grid gap-6 border-t border-crema/15 pt-7 sm:grid-cols-2">
            <ContactItem icon={<MapPinIcon className="h-5 w-5" strokeWidth={1.7} />}>
              <p className="text-[15px] font-semibold">
                Estamos en {vivero.direccion.distrito}, {vivero.direccion.ciudad}
              </p>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-sm text-crema/75 underline decoration-crema/30 underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {vivero.direccion.textoCompleto}
              </a>
            </ContactItem>

            <ContactItem icon={<WhatsAppIcon className="h-5 w-5" strokeWidth={1.7} />}>
              <p className="text-[15px] font-semibold">WhatsApp</p>
              <p className="mt-1 text-sm text-crema/75">{vivero.telefonoVisible}</p>
            </ContactItem>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <p className="text-[15px] font-semibold">Síguenos</p>
            <SocialLinks />
          </div>
        </div>

        <div className="relative h-64 sm:h-80 lg:h-auto">
          <img
            src="/Web/helecho-babilonico-3-close.webp"
            alt="Hojas de Helecho Babilónico"
            width={1200}
            height={1200}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
