# Vivero Nativa — página web

Catálogo de plantas de **Vivero Nativa** (Lurín, Lima) con pedidos por WhatsApp.
Publicada en **https://www.viveronativa.com** (Vercel). Cada `git push` a `main` la actualiza sola en 1–2 minutos.

Hecha con React + TypeScript + Vite + Tailwind CSS.

---

## Cómo actualizar la web (lo más común)

| Quiero…                                         | Archivo que se edita                     |
| ----------------------------------------------- | ---------------------------------------- |
| Cambiar teléfono, dirección, horario o textos   | `src/config/vivero.ts`                   |
| Cambiar o agregar una red social                | `src/config/vivero.ts` (`redesSociales`) |
| Cambiar precios, descripciones o cuidados       | El Excel → descargar CSV → `npm run excel` (ver abajo) |
| Agregar una planta nueva                        | `public/Web/` (fotos) + `src/data/plantas.ts` |
| Cambiar las plantas "más vendidas"              | `src/data/plantas.ts` (`masVendidos`)    |
| Cambiar los colores de la marca                 | `src/index.css` (bloque `@theme`)        |
| Cambiar el título/descripción en Google         | `src/lib/seo.ts` (`homeSeo`)             |
| Cambiar la foto de portada                      | `public/imagenes/portada.webp`           |
| Cambiar el logo                                 | `public/marca/` (mismos nombres de archivo) |

### Agregar una planta nueva

1. Guarda sus fotos (ideal 1200×1200 px, formato `.webp`) en `public/Web/` con este nombre:

   ```
   <slug>-<número>-<vista>.webp
   ```

   Ejemplo: `zamioculca-verde-1-frontal.webp`, `zamioculca-verde-2-picado.webp`…
   El número define el orden; la primera es la foto principal.

2. En `src/data/plantas.ts` copia un bloque `{ ... }` y cambia sus datos:

   ```ts
   {
     slug: "zamioculca-verde",          // igual al inicio del nombre de las fotos
     nombre: "Zamioculca Verde",
     categoria: "Interior",             // crea el filtro si es una categoría nueva
     nombresEnInventario: ["Zamioculca"], // opcional: nombre en inventario.ts para el precio
     descripcion: "…",
     luz: "…",
     riego: "…",
   },
   ```

   - Sin `nombresEnInventario` la web muestra **"Consultar precio"**.
   - Si en el inventario hay varios precios con ese nombre, muestra **"Desde S/ …"** y la lista por tamaño.
   - Para ocultar "Envío a todo el Perú" en una planta: `envioNacional: false`.
   - Una planta sin fotos **no aparece** en la web aunque esté en la lista.

3. Pruébalo (`npm run dev`) y súbelo (ver abajo). La página de la planta, el sitemap
   y los datos para Google se generan solos.

---

## Actualizar desde el Excel

Precios, categoría, nombre científico, descripción, luz, riego y cuidados salen del
Google Sheets **"Catálogo Vivero Nativa (web)"**.

1. En Google Sheets: **Archivo → Descargar → Valores separados por comas (.csv)**.
2. Guarda el archivo como `recursos/catalogo-excel.csv` (reemplaza el anterior).
3. Ejecuta `npm run excel`: regenera `src/data/inventario.ts`.
4. `npm run build` avisa si alguna planta publicada no está en el Excel o no tiene precio.
5. Sube los cambios (ver abajo).

Si una columna del Excel está vacía para una planta, la web usa el texto de `src/data/plantas.ts`.
Los nombres científicos marcados "por verificar" no se muestran.

**Tamaños:** si un producto aparece en varias filas con distinto precio, la ficha muestra
botones de tamaño (2 precios: Pequeño / Grande; 3: Pequeño / Mediano / Grande). Si agregas
una columna **"Tamaño"** al Excel, se usan esos nombres.

**Precio manual:** en `src/data/plantas.ts`, `precios: [70, 90, 150]` tiene prioridad sobre el
Excel. Úsalo solo mientras se corrige el Excel; `npm run build` avisa si no coinciden.

---

## Comandos

```bash
npm install        # solo la primera vez
npm run excel      # importar el Excel (recursos/catalogo-excel.csv)
npm run dev        # ver la web en local: http://localhost:5173
npm run build      # versión de producción (carpeta dist/)
npm run preview    # ver la versión de producción: http://localhost:4173
npm run lint       # revisar el código
```

Subir los cambios a la web:

```bash
git add -A
git commit -m "describe el cambio"
git push
```

---

## Estructura del proyecto

```
public/                 Archivos que se publican tal cual
  Web/                  Fotos de las plantas (<slug>-<n>-<vista>.webp)
  marca/                Logos, íconos de pestaña e imagen para compartir en redes
  imagenes/portada.webp Foto de la portada
  robots.txt            Instrucciones para Google

recursos/               Originales (no se publican): logos, portada original y catalogo-excel.csv

scripts/
  generar-fotos.mjs     Lee public/Web y crea src/data/fotos.ts (se ejecuta solo)
  importar-excel.mjs    Lee recursos/catalogo-excel.csv y crea src/data/inventario.ts
  prerender.mjs         Al compilar, pone el diseño completo en el HTML de cada página

src/
  config/vivero.ts      ★ Datos del vivero: contacto, horario, textos, redes
  data/
    plantas.ts          ★ Plantas de la web: textos, cuidados y "más vendidos"
    inventario.ts       Generado desde el Excel (npm run excel): no editar
    fotos.ts            Generado automáticamente: no editar
  lib/
    catalogo.ts         Junta plantas + precios + fotos
    formato.ts          Formato de precios, búsqueda sin tildes, enlace de WhatsApp
    carrito.tsx         Carrito: productos, cantidades, total y mensaje del pedido
    seo.ts              Títulos, descripciones, datos para Google y sitemap
    scroll.ts           Ids de las secciones de la portada
  components/
    layout/             Encabezado, buscador, footer
    home/               Secciones de la portada (portada, más vendidas, catálogo, contacto)
    plant/              Tarjeta, galería, tamaños y distintivo de envío de una planta
    cart/               Botón y panel del carrito
    ui/                 Íconos y botones de redes sociales
  pages/                Páginas: portada, ficha de planta, no encontrada
  hooks/usePageSeo.ts   Actualiza título y descripción al navegar
  types/plant.ts        Tipos de datos
  App.tsx               Rutas de la web
  main.tsx              Arranque en el navegador (activa el HTML ya generado)
  entry-server.tsx      Arranque al compilar (genera el HTML de cada página)
  index.css             Colores y fuentes de la marca

vite.config.ts          Al compilar: crea una página HTML por planta (con su SEO) y el sitemap.xml
vercel.json             Configuración de Vercel (direcciones limpias)
```

★ = archivos pensados para editarse a mano.

---

## Carrito de compras

- Funciona solo en el navegador del cliente (se guarda en `localStorage`): no hay servidor
  ni base de datos.
- El cliente agrega plantas (con su tamaño), cambia cantidades y pulsa **"Enviar pedido por
  WhatsApp"**: se abre WhatsApp con el pedido completo y el total.
- Código: `src/lib/carrito.tsx` (lógica y mensaje) y `src/components/cart/` (botón y panel).

---

## SEO (Google) y velocidad

- Al compilar, cada página se genera con su diseño completo en el HTML (prerender):
  se ve al instante, sin esperar a JavaScript, y Google lee la página real.

- Cada planta tiene su propia página `https://www.viveronativa.com/producto/<slug>` con
  título, descripción, foto y datos estructurados (Product + BreadcrumbList).
- La portada incluye los datos del vivero (GardenStore) con dirección, horario y redes.
- `sitemap.xml` se genera al compilar con todas las páginas y fotos.
- Google Search Console: propiedad de dominio `viveronativa.com`.
