import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

const container = document.getElementById("root")!;

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Si el HTML ya trae el diseño de esta página (generado al compilar), React solo
// lo "activa" sin volver a dibujarlo: la página se ve completa desde el primer momento.
// Si no coincide (p. ej. una dirección inexistente o una búsqueda ?q=), se dibuja de cero.
const prerenderedPath = container.dataset.ssr;
const canHydrate = prerenderedPath === window.location.pathname && !window.location.search;

if (canHydrate) {
  hydrateRoot(container, app);
} else {
  container.textContent = "";
  createRoot(container).render(app);
}
