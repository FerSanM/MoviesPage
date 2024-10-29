import { getTrendingAll } from "./services/movieService";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function Trending() {
  const [activeTab, setActiveTab] = useState(0);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let moviesData = [];
        if (activeTab === 0) {
          moviesData = await getTrendingAll("day");
        } else {
          moviesData = await getTrendingAll("week");
        }
        setIsVisible(true);
        setMovies(moviesData);
      } catch (error) {
        setError("error");
      }
    };
    setIsVisible(false);
    setTimeout(() => {
      fetchMovies();
    }, 500);
  }, [activeTab]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleClick = (index) => {
    setActiveTab(index);
  };

  return (
    <section
      id="tendencias"
      className="w-5/6 m-auto mt-10 h-[400px] ps-12 pe-12"
    >
      <div className="flex ps-2">
        <h3 className="text-xl font-semibold me-5">Tendencias</h3>
        <div className="popularContainer flex rounded-full">
          <a
            onClick={() => handleClick(0)}
            className={`btnPopular px-4 cursor-pointer rounded-full py-[2px] ${activeTab === 0 ? "Active" : ""}`}
          >
            Hoy
          </a>
          <a
            onClick={() => handleClick(1)}
            className={`btnPopular px-4 cursor-pointer rounded-full py-[2px] ${activeTab === 1 ? "Active" : ""}`}
          >
            Semana
          </a>
        </div>
      </div>
      <div
        className={`movieContainer ${isVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-500 flex overflow-x-auto relative pb-5`}
      >
        {movies.map((movie) => (
          <article key={movie.id} className="flex-col text-center mt-10 px-2">
            <Link to={`/${movie.media_type}/${movie.id}`}>
              <div className="w-40 h-auto">
                {activeTab === 2 ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w185${movie.profile_path}`}
                    alt={movie.name}
                    className="imgAPI rounded-xl h-56 w-40"
                  />
                ) : (
                  <img
                    src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                    alt={movie.title || movie.name}
                    className="imgAPI rounded-xl h-56 w-40"
                  />
                )}
              </div>
              <div className="mt-2">
                <span className="font-semibold hover:text-cyan-400">
                  {movie.title || movie.name}
                </span>
                <br />
                {activeTab !== 2 && (
                  <span>{movie.release_date || movie.first_air_date}</span>
                )}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
