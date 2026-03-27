import { auth } from "../firebase";
import Banner from "../components/Banner";
import Row from "../components/Row";
import "./Home.css";
import Navbar from "../components/Navbar";

const API_KEY = import.meta.env.VITE_API_KEY;

function Home() {
  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div className="home">
      <Banner />
      <Navbar />

      <button className="logout_button" onClick={handleLogout}>
        Cerrar sesión
      </button>

      <Row
        title="Trending"
        fetchUrl={`/trending/all/week?api_key=${API_KEY}`}
      />

      <Row title="Top Rated" fetchUrl={`/movie/top_rated?api_key=${API_KEY}`} />

      <div className="movieRow">
        <h2>Populares en Netflix</h2>

        <div className="row__posters">
          <img
            className="row__poster"
            src="https://image.tmdb.org/t/p/w300/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg"
            alt=""
          />

          <img
            className="row__poster"
            src="https://image.tmdb.org/t/p/w300/9O1Iy9od7l2YH6W4lI0h9C4Cj9d.jpg"
            alt=""
          />

          <img
            className="row__poster"
            src="https://image.tmdb.org/t/p/w300/r7XifzvtezNt31ypvsmb6Oqxw49.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
