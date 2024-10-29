import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getRealiseDate,
  getMovieDetails,
  getContentRatings,
  getCredits,
} from "./services/movieService";
import { ProgressCircle } from "./ProgressCircle";

export function MovieDetails() {
  const { id, type } = useParams();
  const [details, setMovieDetails] = useState(null);
  const [release, setRealiseData] = useState(null);
  const [credits, setCredits] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getMovieDetails(id, type);
        const creditsData = await getCredits(id, type);
        if (type === "tv") {
          const contentRatings = await getContentRatings(id);
          setRealiseData(contentRatings);
        } else {
          const dataRealise = await getRealiseDate(id);
          setRealiseData(dataRealise);
        }
        setCredits(creditsData);
        setMovieDetails(moviesData);
      } catch (error) {
        console.error("Error fetching movie or TV details:", error);
      }
    };

    fetchMovies();
  }, [id, type]);

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <section
      className="w-full mt-16"
      style={{
        backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)), 
        url(https://image.tmdb.org/t/p/w500${details.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "right top",
      }}
    >
      <div key={details.id} className="flex py-10 ps-24 pe-10 movieDetails">
        <div className="w-1/4">
          <img
            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
            alt={details.title || details.name}
            width={300}
            height={450}
            className="rounded-xl"
          />
        </div>
        <div className="flex-col w-3/4 ps-15 text-white">
          <div className="flex">
            <h2 className="font-bold text-4xl">
              {details.title || details.name}
            </h2>
            <span className="text-3xl ms-1 opacity-70">
              (
              {new Date(
                details.release_date || details.first_air_date
              ).getFullYear()}
              )
            </span>
          </div>
          <div className="flex items-center">
            {(() => {
              const countryCertification = release?.find(
                (entry) => entry.iso_3166_1 === "US"
              );

              let content = "";
              if (release.length !== 0) {
                if (type === "tv") {
                  content = countryCertification
                    ? countryCertification?.rating ||
                      "No hay certificación disponible"
                    : release[0].rating;
                } else {
                  const validRelease =
                    countryCertification?.release_dates?.find(
                      (release) => release.certification
                    );
                  content =
                    validRelease?.certification ||
                    "No hay certificación disponible";
                }
              }
              return content ? (
                <div className="flex opacity-70 border-2 h-min text-sm text-center px-2 rounded-md">
                  {content}
                </div>
              ) : null;
            })()}
            <span className="flex text-md text-center ps-2 rounded-md">
              {(() => {
                const releaseCountry = release?.find(
                  (entry) =>
                    entry.iso_3166_1 === "PY" || entry.iso_3166_1 === "US"
                );
                const certificationDate = releaseCountry?.release_dates?.find(
                  (release) => release.release_date
                );
                if (type === "tv") {
                  return `${new Date(details.first_air_date).toLocaleDateString("es-MX")} ${release == [] ? `(${release[0].iso_3166_1})` : ""}`;
                }
                return certificationDate
                  ? `${new Date(certificationDate.release_date).toLocaleDateString("es-MX")} (${releaseCountry.iso_3166_1})`
                  : "";
              })()}
            </span>
            <span className="flex text-md font-semibold text-center ps-2 rounded-md">
              {details.genres.map((genre, index) => (
                <span className="ms-2" key={genre.id}>
                  {genre.name}
                  {index < details.genres.length - 1 && ","}
                </span>
              ))}
            </span>
            {type === "movie" && details.runtime && (
              <span className="flex text-md font-semibold text-center ps-2 rounded-md">
                {(() => {
                  const hours = Math.floor(details.runtime / 60);
                  const minutes = details.runtime % 60;
                  return (
                    <span className="ms-2">{`${hours}h ${minutes}m`}</span>
                  );
                })()}
              </span>
            )}
          </div>
          <div className="flex items-center py-5">
            <ProgressCircle vote={details.vote_average} />
            <span className="ms-2">Puntuación</span>
          </div>
          <div className="pb-4">
            <span className="opacity-70">{details.tagline}</span>
          </div>
          <div>
            <span className="text-xl font-bold">Resumen</span>
            <p className="pt-4">{details.overview}</p>
          </div>
          <div className="grid grid-cols-4">
            {credits.length > 0 ? (
              credits.map((credit) => (
                <article key={credit.id} className="pt-5">
                  <span className="font-bold">{credit.name}</span>
                  <br />
                  <span className="text-sm">{credit.job}</span>
                </article>
              ))
            ) : (
              <article key={details.created_by.name} className="pt-5">
                <span className="font-bold">{details.created_by.length > 0 ? details.created_by[0].name : ""}</span>
                <br />
                <span className="text-sm">{details.created_by.length > 0 ? "Creador" : ""}</span>
              </article>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
