import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSearchData } from "./services/movieService";
import { Link } from "react-router-dom";

export function Search() {
  const { query } = useParams();
  const [search, setSearch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    if (isNaN(date)) {
      return 'Fecha inválida';
    }
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null); 
      try {
        const movieData = await getSearchData(query);
        setSearch(movieData);
      } catch (error) {
        console.error("Error al traer los datos de películas", error);
        setError("Error al cargar los datos. Intenta nuevamente más tarde.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [query]);

  if (loading) {
    return <div className="flex text-4xl items-center justify-center">Cargando...</div>;
  }

  return (
    <section className="mt-20 w-3/5 m-auto min-h-svh">
      <div>
        {error ? (
          <div className="flex text-4xl items-center justify-center">
            <span>{error}</span>
          </div>
        ) : search.length > 0 ? (
          search.map((data) => (
            <article
              className="searchContainer overflow-hidden flex mb-5 rounded-xl shadow-md h-[150px]"
              key={data.id}
            >
              <Link to={`/${data.media_type}/${data.id}`}>
                <div className="w-[120px]">
                  <img
                    src={`https://image.tmdb.org/t/p/w185${data.poster_path}`}
                    alt={data.name || data.title}
                    className="object-cover w-full rounded-ss-xl rounded-es-xl h-full"
                  />
                </div>
              </Link>

              <div className="p-3">
                <div className="w-auto">
                  <Link to={`/${data.media_type}/${data.id}`}>
                    <span className="font-semibold hover:text-gray-500">
                      {data.title || data.name}
                    </span>
                  </Link>
                  {data.original_title !== undefined ? ` (${data.original_title})` : ""}
                  <br />
                  <span className="font-normal">{formatDate(data.release_date || data.first_air_date)}</span>
                </div>
                <p className="line-clamp-3 pt-2">{data.overview}</p>
              </div>
            </article>
          ))
        ) : (
          <div className="flex text-4xl items-center justify-center">
            <span>No se encontraron resultados</span>
          </div>
        )}
      </div>
    </section>
  );
}
