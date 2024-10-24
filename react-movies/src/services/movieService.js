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

export const getMovieDetails = async (movie_id, type) => {
  try {
    const response = await axios.get(`${BASE_URL}/${type}/${movie_id}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      },
      params: {
        language: "es-MX",
        page: 1,
      },
    });
    return response.data;
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
