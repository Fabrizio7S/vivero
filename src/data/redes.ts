// Redes sociales del vivero. Aparecen en el footer y en la sección de contacto.
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
