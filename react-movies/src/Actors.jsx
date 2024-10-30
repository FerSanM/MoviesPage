import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActors, getExternalId, getMovieDetails, getPage } from "./services/movieService";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import LinkIcon from "@mui/icons-material/Link";
import Divider, { dividerClasses } from '@mui/material/Divider';

export function Actors() {
  const { id, type } = useParams();
  const [actors, setActors] = useState([]);
  const [details, setDetails] = useState([]);
  const [externalId, setExternalId] = useState([]);
  const [page, setPage] = useState([]);
 
  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const actorsData = await getActors(id, type);
        const detailsData = await getMovieDetails(id, type);
        const externalData = await getExternalId(id, type);
        const pageData = await getPage(id, type);

        setPage(pageData);
        setActors(actorsData);
        setExternalId(externalData);
        setDetails(detailsData);
      } catch (error) {
        console.error("Error al obtener los actores", error);
      }
    };
    fetchDatas();
  }, [id, type]);

  return (
    <section className="grid grid-cols-4">
      <div className="col-span-3">
        <div id="popular" className="popularSection ms-10 mt-10 h-[400px]">
          <span className="font-bold text-xl ms-3">Actores Principales</span>
          <div
            className={`movieContainer transition-opacity duration-500 flex overflow-x-auto relative pb-5`}
          >
            {" "}
            {actors.map((actor) => (
              <article
                key={actor.name}
                className="flex-col mx-3 rounded-xl shadow-md text-center mt-4"
              >
                <div className="w-40 h-auto">
                  <img
                    src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                    alt={actor.name}
                    className="imgAPI rounded-t-xl h-56 object-cover"
                  />
                </div>
                <div className="mt-2">
                  <span className="hover:text-cyan-400 cursor-pointer font-semibold">
                    {actor.name}
                  </span>
                  <br />
                  <span>{actor.character}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <article className="p-10 text-start">
          <div className="flex items-center py-5">
            <a className="pe-1" href={externalId.facebook_id ? `https://www.facebook.com/${externalId.facebook_id}` : ""}><FacebookIcon sx={{ fontSize: 30 }} /></a> 
            <a className="px-1" href={externalId.instagram_id ? `https://instagram.com/${externalId.instagram_id}` : ""}><InstagramIcon sx={{ fontSize: 28 }} /></a>
            <a className="px-1" href={externalId.twitter_id ? `https://www.x.com/${externalId.twitter_id}` : ""}><XIcon sx={{ fontSize: 25 }}/></a>
            <a className="px-1" href={page ? `${page}` : ""}><LinkIcon sx={{ fontSize: 30 }}/></a>
          </div>
          <div className="grid grid-cols-1">
            <span className="font-semibold">Titulo Original</span>
            <span>{details.original_title || details.original_name}</span>
            <span className="font-semibold mt-2">Estado</span>
            <span>{details.status}</span>
            <span className="font-semibold mt-2">Idioma Original</span>
            <span>{details.original_language}</span>
            <span className="font-semibold mt-2">Presupuesto</span>
            <span>
              {"$" +
                (details.budget
                  ? details.budget.toLocaleString("en-US")
                  : "N/A")}
            </span>
            <span className="font-semibold mt-2">Ingresos</span>
            <span>
              {"$" +
                (details.revenue
                  ? details.revenue.toLocaleString("en-US")
                  : "N/A")}
            </span>
          </div>
        </article>
      </div>
    </section>
  );
}
