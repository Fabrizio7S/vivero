import { Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import ScrollToTop from "./components/layout/ScrollToTop";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import PlantPage from "./pages/PlantPage";

// Estructura de la web: encabezado y footer fijos, y la página según la dirección.
//   /                 -> portada (HomePage)
//   /producto/<slug>  -> ficha de una planta (PlantPage)
//   cualquier otra    -> página no encontrada
function App() {
  return (
    <main className="min-h-screen bg-crema text-bosque">
      <ScrollToTop />
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/producto/:slug" element={<PlantPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </main>
  );
}

export default App;
