// Render de la web en el servidor, solo al compilar (lo usa scripts/prerender.mjs).
// Genera el HTML con el diseño completo de cada página para que se vea al instante,
// sin esperar a que cargue JavaScript, y para que Google lea la página real.

import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import { catalogo } from "./lib/catalogo";

export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}

// Direcciones que se generan como HTML: la portada y una por planta.
export const routes: string[] = ["/", ...catalogo.map((plant) => `/producto/${plant.slug}`)];
