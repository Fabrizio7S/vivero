import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Al cambiar de página (p. ej. abrir una planta), empieza desde arriba.
// Si el enlace lleva a una sección (#catalogo), respeta ese salto.
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
