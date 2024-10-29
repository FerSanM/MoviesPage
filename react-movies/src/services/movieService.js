import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async (type) => {
  try {
    const response = await axios.get(`${BASE_URL}/${type}/popular`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      },
      params: {
        language: "es-MX",
        page: 1,
      },
    });
    return response.data.results;
  } catch {
    console.error(
      "Error fetching pupular movies:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getCredits = async (movie_id, type) => {
  const response = await axios.get(`${BASE_URL}/${type}/${movie_id}/credits`,{
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
    params: {
      language: "es-MX",
      page: 1
    },
  });
  return response.data.crew.filter((credit) => credit.job === 'Director' || credit.job === 'Novel' || credit.job === 'Songs' || credit.job === 'Story' || credit.job === 'Characters' || credit.job === 'Writer' || credit.job === 'Screenplay');
}

export const getRealiseDate = async (movie_id) => {
  const response = await axios.get(`${BASE_URL}/movie/${movie_id}/release_dates`,{
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
    },
    params:{

    }
  });
  return response.data.results.filter((realise) => realise.iso_3166_1 === "PY" || realise.iso_3166_1 === "US");
}

export const getContentRatings = async (tv_id) => {
  const response = await axios.get(`${BASE_URL}/tv/${tv_id}/content_ratings`,{
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  });
  return response.data.results;
}

export const getMovieDetails = async (movie_id, type) => {
  try {
    const responseMX = await axios.get(`${BASE_URL}/${type}/${movie_id}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      },
      params: {
        language: "es-MX",
        page: 1,
      },
    });
    const responseUS = await axios.get(`${BASE_URL}/${type}/${movie_id}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      },
      params: {
        page: 1,
      },
    });
    if (responseMX.data.overview === ""){
      return responseUS.data;
    }else{
      return responseMX.data;
    }
    
  } catch (error) {
    console.error("error fetching movie details", error);
  }
};

export const getTrendingAll = async (day) => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/all/${day}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      },
      params: {
        language: "es-MX",
        page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("error fetching trending all", error);
  }
};

export const getTopRated = async (type) => {
  try {
    const response = await axios.get(`${BASE_URL}/${type}/top_rated`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      },
      params: {
        language: "es-MX",
        page: 1,
      },
    });
    return response.data.results;
  } catch {
    console.error(
      "Error fetching pupular movies:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getMovieVideos = async (movieId, type) => {
  try {
    const response = await axios.get(`${BASE_URL}/${type}/${movieId}/videos`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      },
      params: {
        language: "es-MX",
        page: 1,
      },
    });
    return response.data.results.filter(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );
  } catch (error) {
    console.error(`Error fetching videos for movie ${movieId}:`, error);
    throw error;
  }
};

export const getPopularMoviesWithTrailers = async (type) => {
  try {
    const popularMovies = await getPopularMovies(type);
    const moviesWithTrailers = await Promise.all(
      popularMovies.map(async (movie) => {
        const trailers = await getMovieVideos(movie.id, type);
        return { ...movie, trailers };
      })
    );
    return moviesWithTrailers;
  } catch (error) {
    console.error("Error fetching popular movies with trailers:", error);
    throw error;
  }
};
