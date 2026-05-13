import { useEffect, useState } from "react";
import axios from "axios";
import YouTube from "react-youtube";
import "./Row.css";

const API_KEY = import.meta.env.VITE_API_KEY;

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(
          `https://api.themoviedb.org/3${fetchUrl}`
        );

        setMovies(request.data.results);
      } catch (error) {
        console.log("Error fetching movies:", error);
      }
    }

    fetchData();
  }, [fetchUrl]);

  const handleClick = async (movie) => {
    // Cerrar trailer si ya hay uno abierto
    if (trailerUrl) {
      setTrailerUrl("");
      return;
    }

    try {
      // Detecta si es película o serie
      const mediaType = movie.first_air_date ? "tv" : "movie";

      // Obtiene videos reales desde TMDB
      const response = await axios.get(
        `https://api.themoviedb.org/3/${mediaType}/${movie.id}/videos?api_key=${API_KEY}`
      );

      const trailers = response.data.results;

      // Busca trailer oficial
      const officialTrailer =
        trailers.find(
          (video) =>
            video.type === "Trailer" &&
            video.site === "YouTube" &&
            video.name.toLowerCase().includes("official")
        ) ||
        trailers.find(
          (video) =>
            video.type === "Trailer" &&
            video.site === "YouTube"
        );

      if (officialTrailer) {
        setTrailerUrl(officialTrailer.key);
      } else {
        alert("No se encontró trailer.");
      }
    } catch (error) {
      console.log("Error fetching trailer:", error);
    }
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className="row__poster"
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title || movie.name}
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>

      {trailerUrl && (
        <YouTube
          videoId={trailerUrl}
          opts={opts}
        />
      )}
    </div>
  );
}

export default Row;