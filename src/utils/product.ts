import type { Plant } from "../types/plant";

const whatsappNumber = "51994684483";

const priceFormatter = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
});

export function formatPrice(price: number): string {
  return priceFormatter.format(price);
}

export function getProductWhatsAppUrl(plant: Pick<Plant, "name" | "price">): string {
  const message = [
    "Hola, Vivero Nativa. Quisiera consultar sobre este producto:",
    `Producto: ${plant.name}.`,
    "¿Me pueden brindar más información para realizar la compra?",
  ].join(" ");

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
