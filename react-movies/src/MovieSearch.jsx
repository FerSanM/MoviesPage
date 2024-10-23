import React, { useState } from 'react';
import axios from 'axios';

export function MovieSearch() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Función para manejar la búsqueda
  const searchMovies = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const url = 'https://api.themoviedb.org/3/search/movie';
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWZlNWNjNDQ4ZWUzYWFmMTlkODk4YzVjNjAwNzJkYyIsIm5iZiI6MTcyOTAwNjMyNi41ODIwOSwic3ViIjoiNjcwNmY0MmFjZDQzYmNmMjkxYWE3M2EyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.VVqBqp6teSFed3HVl_TjQx1qKP5T4oDUv9a-s1lfsxQ'; // Reemplaza esto con tu Bearer Token

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          query: query,
          include_adult: false,
          language: 'es-MX',  // O 'en-US' si prefieres en inglés
        },
      });

      setMovies(response.data.results);
    } catch (err) {
      setError('Hubo un problema al buscar las películas.');
    }
    
    setLoading(false);
  };

  return (
    <div>
      <h1>Buscar películas</h1>
      
      <form onSubmit={searchMovies}>
        <input 
          type="text" 
          placeholder="Buscar película" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}

      <div>
        <h2>Resultados:</h2>
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <h3>{movie.title} ({movie.release_date})</h3>

              {/* Verificamos si hay poster_path */}
              {movie.poster_path ? (
                <img 
                  src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} 
                  alt={movie.title} 
                />
              ) : (
                <p>No hay póster disponible</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};