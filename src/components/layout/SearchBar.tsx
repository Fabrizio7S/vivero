import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { scrollToCatalog } from "../../lib/scroll";
import { SearchIcon } from "../ui/icons";

// Buscador del encabezado. Guarda el texto en la URL (?q=) y el catálogo lo lee de ahí.
// Si se escribe desde la ficha de una planta, lleva a la portada con la búsqueda.
function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const search = searchParams.get("q") ?? "";

  const updateSearch = (value: string) => {
    const params: Record<string, string> = value ? { q: value } : {};

    if (pathname === "/") {
      setSearchParams(params, { replace: true });
    } else {
      navigate({ pathname: "/", search: value ? `?q=${encodeURIComponent(value)}` : "" });
    }
  };

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        scrollToCatalog();
      }}
      className="flex min-h-12 w-full items-center gap-2.5 rounded-full border border-green-900/15 bg-white px-4 transition-shadow focus-within:ring-2 focus-within:ring-green-800 sm:px-5"
    >
      <SearchIcon className="h-[18px] w-[18px] shrink-0 text-gray-600" />
      <label htmlFor="plant-search" className="sr-only">
        Buscar planta
      </label>
      <input
        id="plant-search"
        type="search"
        value={search}
        onChange={(event) => updateSearch(event.target.value)}
        placeholder="Buscar planta…"
        className="w-full min-w-0 bg-transparent text-[15px] text-bosque outline-none placeholder:text-gray-500"
      />
    </form>
  );
}

export default SearchBar;
