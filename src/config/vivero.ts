// ============================================================================
//  DATOS DEL VIVERO
//  Cambia aquí el teléfono, la dirección, el horario, las redes o los textos
//  generales: se actualizan en toda la web (encabezado, contacto, footer y SEO).
// ============================================================================

export const vivero = {
  nombre: "Vivero Nativa",
  dominio: "https://www.viveronativa.com",

  // WhatsApp: número con código de país (51), sin espacios ni "+".
  whatsapp: "51994684483",
  telefonoVisible: "+51 994 684 483",
  mensajeWhatsApp: "Hola, Vivero Nativa. Quisiera consultar sobre sus productos.",

  direccion: {
    calle: "Casica - Poro Portón",
    distrito: "Lurín",
    ciudad: "Lima",
    codigoPostal: "15823",
    pais: "PE",
    // Texto que se muestra en la web.
    textoCompleto: "Casica - Poro Portón, Lurín 15823",
  },

  horario: {
    texto: "Lunes a domingo, 8:00 a. m. – 6:00 p. m.",
    // Para Google (formato 24 h).
    abre: "08:00",
    cierra: "18:00",
  },

  textos: {
    // Frase bajo el logo en el footer.
    lema: "Tu vivero en Lurín. Te ayudamos a elegir la planta ideal para cada espacio y te la enviamos a cualquier lugar del Perú.",
    envios:
      "Enviamos nuestras plantas a todo el Perú, bien embaladas para que lleguen sanas a tu casa.",
    // Aviso bajo el precio en la ficha de cada planta.
    notaPrecio: "Precio no incluye maceta.",
  },

  // Cómo aparece la portada en Google.
  // Reglas: palabra clave principal al inicio, texto natural (nunca listas de
  // palabras sueltas) y solo cosas ciertas.
  seo: {
    // Máximo 60 caracteres (Google corta el resto).
    titulo: "Vivero Nativa Lurín | Venta de plantas en Lima",
    // Máximo 160 caracteres.
    descripcion:
      "Vivero Nativa, tu vivero en Lurín, Lima: plantas de interior y exterior como anturios, helechos, calatheas y monsteras. Envío a todo el Perú. Pide por WhatsApp.",
    // Otros nombres reales con los que buscan el negocio.
    nombresAlternativos: ["Vivero Nativa Lurín"],
    // Descripción del negocio para la ficha de Google (datos estructurados).
    descripcionNegocio:
      "Vivero en Lurín, Lima. Venta de plantas de interior y de exterior con envío a todo el Perú y pedidos por WhatsApp.",
  },
} as const;

// Redes sociales: aparecen en la portada, en contacto y en el footer.
// El ícono se elige por el nombre (Instagram, Facebook o TikTok).
export const redesSociales = [
  {
    nombre: "Instagram",
    usuario: "@viveronativaoficial",
    url: "https://www.instagram.com/viveronativaoficial/",
  },
  {
    nombre: "Facebook",
    usuario: "ViveroNativaoficial",
    url: "https://www.facebook.com/ViveroNativaoficial",
  },
  {
    nombre: "TikTok",
    usuario: "@vivero.gutierrez",
    url: "https://www.tiktok.com/@vivero.gutierrez",
  },
] as const;

export type RedSocial = (typeof redesSociales)[number]["nombre"];

// Enlaces calculados a partir de los datos de arriba (no hace falta tocarlos).
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  vivero.direccion.textoCompleto,
)}`;

export function whatsappUrl(mensaje: string = vivero.mensajeWhatsApp): string {
  return `https://wa.me/${vivero.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}
