import { whatsappUrl } from "../config/vivero";

const priceFormatter = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
});

// "S/ 25.00"
export function formatPrice(price: number): string {
  return priceFormatter.format(price);
}

// "Consultar precio", "S/ 25.00" o "Desde S/ 30.00" si hay varios tamaños.
export function formatPriceLabel(prices: number[]): string {
  if (prices.length === 0) return "Consultar precio";
  if (prices.length === 1) return formatPrice(prices[0]);
  return `Desde ${formatPrice(prices[0])}`;
}

// Minúsculas y sin tildes, para que "sandia" encuentre "Sandía".
export function normalize(text: string): string {
  return text
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

// Enlace de WhatsApp con el mensaje para consultar por una planta.
export function productWhatsAppUrl(plantName: string): string {
  return whatsappUrl(
    [
      "Hola, Vivero Nativa. Quisiera consultar sobre este producto:",
      `Producto: ${plantName}.`,
      "¿Me pueden brindar más información para realizar la compra?",
    ].join(" "),
  );
}
