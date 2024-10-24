import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "./services/movieService";


export function MovieDetails() {
  const { id , type } = useParams();
  const [details, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let moviesData = await getMovieDetails(id, type);
        setMovieDetails(moviesData);
      } catch (error) {
        setError("error");
      }
    };
    fetchMovies();
  }, [id, type]);


  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div key={details.id} className="mt-20 movieDetails">
      <h2>{details.title || details.name}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
        alt={details.title || details.name}
      />
      <p>{details.overview}</p>
      <p>Fecha de Estreno: {details.release_date || details.first_air_date}</p>
    </div>
  );
};

