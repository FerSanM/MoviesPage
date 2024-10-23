import { useState, useEffect } from "react";
import { getPopularMoviesWithTrailers } from "./services/movieService";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export function Trailers() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [background, setBackground] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const handleFocus = (img) => {
    if (background !== img) {
      setBackground(img);
    }
  };
  const handleClick = (index) => {
    setActiveTab(index);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      let moviesData = [];
      try {
        if (activeTab === 0) {
          moviesData = await getPopularMoviesWithTrailers("movie");
        }else{
          moviesData = await getPopularMoviesWithTrailers("tv");
        }
        
        const moviesWithTrailers = moviesData.filter(
          (movie) => movie.trailers.length > 0
        );
        setMovies(moviesWithTrailers);

        if (moviesWithTrailers.length > 0) {
          const firstMovieTrailer = moviesWithTrailers[0].trailers[0].key;
          setBackground(
            `https://img.youtube.com/vi/${firstMovieTrailer}/hqdefault.jpg`
          );
        }
      } catch (error) {
        setError("Error fetching movies and trailers");
      }
    };

    fetchMovies();
  }, [activeTab]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section
      className="relative flex-col items-center content-center movieTrailer w-5/6 m-auto mt-10 h-[400px]"
      style={{
        backgroundImage: background ? `url(${background})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.5s ease",
      }}
    >
        <h3 className="relative text-xl z-10 ps-14 font-bold me-5 text-white">
          Trailer Populares
        </h3>
      <img
          src="img/D13.png"
          className="absolute top-0 h-full opacity-50 w-full -z-0"
          alt=""
        />
      <div className="relative movieContainer z-10 ps-12 flex overflow-x-auto">
        {movies.map((movie) => (
          <article
            key={movie.id}
            className="flex-col text-center mt-10 pb-14 px-3"
          >
            <div key={movie.trailers[0].id} className="mb-4 w-80 h-40">
              <a
                href={`https://www.youtube.com/watch?v=${movie.trailers[0].key}`}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() =>
                  handleFocus(
                    `https://img.youtube.com/vi/${movie.trailers[0].key}/hqdefault.jpg`
                  )
                }
                className="flex relative justify-center items-center transition-all hover:scale-105"
              >
                <PlayArrowIcon
                  sx={{ fontSize: 50 }}
                  className="absolute text-white text-"
                />
                <img
                  src={`https://img.youtube.com/vi/${movie.trailers[0].key}/hqdefault.jpg`}
                  alt={`Trailer for ${activeTab === 0 ? movie.title : movie.name}`}
                  className="object-cover object-center w-80 h-40 rounded-lg cursor-pointer"
                />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
