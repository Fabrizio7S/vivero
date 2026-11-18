// Carrito de compras. Vive solo en el navegador del cliente (localStorage):
// no hay servidor ni base de datos. El pedido se envía por WhatsApp.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { vivero, whatsappUrl } from "../config/vivero";
import type { Plant } from "../types/plant";
import { findPlant } from "./catalogo";
import { formatPrice } from "./formato";

const STORAGE_KEY = "vivero-nativa-carrito";
const MAX_QTY = 99;

// Lo que se guarda: qué planta, qué tamaño y cuántas. El precio no se guarda:
// se toma siempre del catálogo actual, así nunca queda un precio viejo.
interface SavedItem {
  slug: string;
  size?: string;
  qty: number;
}

export interface CartLine {
  key: string;
  plant: Plant;
  size?: string;
  qty: number;
  unitPrice: number; // 0 = precio a consultar
  subtotal: number;
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  total: number;
  hasUnpricedItems: boolean;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (plant: Plant, size?: string, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  whatsappOrderUrl: string;
}

const CartContext = createContext<CartContextValue | null>(null);

const lineKey = (slug: string, size?: string) => (size ? `${slug}|${size}` : slug);

function readStorage(): SavedItem[] {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(data)
      ? data.filter((i) => typeof i?.slug === "string" && Number.isInteger(i?.qty) && i.qty > 0)
      : [];
  } catch {
    return [];
  }
}

function writeStorage(items: SavedItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Navegador sin almacenamiento (modo privado estricto): el carrito funciona igual
    // mientras la página esté abierta.
  }
}

// Precio de una planta en un tamaño; si no tiene tamaños, su único precio.
function priceOf(plant: Plant, size?: string): number | undefined {
  if (plant.sizes.length > 0) return plant.sizes.find((s) => s.label === size)?.price;
  return plant.prices[0] ?? 0;
}

// Mensaje de WhatsApp con todo el pedido.
function orderMessage(lines: CartLine[], total: number, hasUnpriced: boolean): string {
  const items = lines.map((line) => {
    const name = line.size ? `${line.plant.name} (${line.size})` : line.plant.name;
    const price = line.unitPrice ? formatPrice(line.subtotal) : "precio a consultar";
    return `• ${line.qty} × ${name} — ${price}`;
  });

  return [
    `Hola, ${vivero.nombre}. Quiero hacer este pedido:`,
    "",
    ...items,
    "",
    `Total: ${formatPrice(total)}${hasUnpriced ? " (más los productos a consultar)" : ""}`,
    vivero.textos.notaPrecio,
    "",
    "¿Me confirman disponibilidad y el costo de envío?",
  ].join("\n");
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<SavedItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Se lee después de mostrar la página, para que el HTML generado al compilar
  // (carrito vacío) coincida con el primer dibujo en el navegador.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sincroniza con localStorage
    setItems(readStorage());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) writeStorage(items);
  }, [items, loaded]);

  // Otra pestaña cambió el carrito: mantenerlo igual en todas.
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) setItems(readStorage());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const lines = useMemo<CartLine[]>(
    () =>
      items.flatMap((item) => {
        const plant = findPlant(item.slug);
        if (!plant) return []; // planta que ya no está en la web
        const unitPrice = priceOf(plant, item.size);
        if (unitPrice === undefined) return []; // tamaño que ya no existe
        return [
          {
            key: lineKey(item.slug, item.size),
            plant,
            size: item.size,
            qty: item.qty,
            unitPrice,
            subtotal: unitPrice * item.qty,
          },
        ];
      }),
    [items],
  );

  const add = useCallback((plant: Plant, size?: string, qty = 1) => {
    setItems((current) => {
      const key = lineKey(plant.slug, size);
      const existing = current.find((i) => lineKey(i.slug, i.size) === key);
      if (existing) {
        return current.map((i) =>
          i === existing ? { ...i, qty: Math.min(MAX_QTY, i.qty + qty) } : i,
        );
      }
      return [...current, { slug: plant.slug, size, qty }];
    });
    setIsOpen(true);
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setItems((current) =>
      qty <= 0
        ? current.filter((i) => lineKey(i.slug, i.size) !== key)
        : current.map((i) =>
            lineKey(i.slug, i.size) === key ? { ...i, qty: Math.min(MAX_QTY, qty) } : i,
          ),
    );
  }, []);

  const remove = useCallback(
    (key: string) => setItems((current) => current.filter((i) => lineKey(i.slug, i.size) !== key)),
    [],
  );

  const value = useMemo<CartContextValue>(() => {
    const total = lines.reduce((sum, line) => sum + line.subtotal, 0);
    const hasUnpricedItems = lines.some((line) => line.unitPrice === 0);
    return {
      lines,
      count: lines.reduce((sum, line) => sum + line.qty, 0),
      total,
      hasUnpricedItems,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add,
      setQty,
      remove,
      clear: () => setItems([]),
      whatsappOrderUrl: whatsappUrl(orderMessage(lines, total, hasUnpricedItems)),
    };
  }, [lines, isOpen, add, setQty, remove]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- hook del mismo módulo
export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return context;
}
