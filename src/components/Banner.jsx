import { useEffect, useState } from "react";
import axios from "axios";
import "./Banner.css";

const API_KEY = import.meta.env.VITE_API_KEY;

function Banner() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`
      );

      const movies = request.data.results;

      const moviesWithImages = movies.filter(
        (m) => m.backdrop_path
      );

      const randomMovie =
        moviesWithImages[
          Math.floor(Math.random() * moviesWithImages.length)
        ];

      setMovie(randomMovie);
    }

    fetchData();
  }, []);

  return (
    <div
      className="banner"
      style={{
        backgroundImage: movie?.backdrop_path
          ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1>{movie?.title || movie?.name}</h1>
      <p>{movie?.overview}</p>
    </div>
  );
}

export default Banner;