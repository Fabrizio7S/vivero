import type { Plant } from "../types/plant";

export const whatsappNumber = "51994684483";

const priceFormatter = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
});

// Minúsculas y sin tildes, para que "sandia" encuentre "Sandía".
export function normalize(text: string): string {
  return text
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function formatPrice(price: number): string {
  return priceFormatter.format(price);
}

// "Consultar precio", "S/ 25.00" o "Desde S/ 30.00" si hay varios tamaños.
export function formatPriceLabel(prices: number[]): string {
  if (prices.length === 0) return "Consultar precio";
  if (prices.length === 1) return formatPrice(prices[0]);
  return `Desde ${formatPrice(prices[0])}`;
}

export function getProductWhatsAppUrl(plant: Pick<Plant, "name">): string {
  const message = [
    "Hola, Vivero Nativa. Quisiera consultar sobre este producto:",
    `Producto: ${plant.name}.`,
    "¿Me pueden brindar más información para realizar la compra?",
  ].join(" ");

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
