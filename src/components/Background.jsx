import { useEffect, useState } from "react";
import axios from "axios";
import "./Background.css";

const API_KEY = import.meta.env.VITE_API_KEY;

const Background = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const requests = [
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`,
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`,
        ];

        const responses = await Promise.all(
          requests.map((url) => axios.get(url))
        );

        const allMovies = responses.flatMap(
          (res) => res.data?.results || []
        );

        if (!allMovies.length) return;

        // 🔥 LOOP INFINITO
        const loopMovies = [...allMovies, ...allMovies];

        setMovies(loopMovies);
      } catch (error) {
        console.error("ERROR API ❌", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="background">
      <div className="background__grid">
        {movies
          .filter((m) => m.poster_path)
          .slice(0, 60)
          .map((movie, index) => (
            <img
              key={index}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="movie"
            />
          ))}
      </div>
    </div>
  );
};

export default Background;