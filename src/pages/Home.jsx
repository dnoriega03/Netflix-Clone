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

      <Row
        title="Top Rated"
        fetchUrl={`/movie/top_rated?api_key=${API_KEY}`}
      />

      <Row
        title="Populares en Netflix"
        fetchUrl={`/discover/tv?api_key=${API_KEY}&with_networks=213`}
      />
    </div>
  );
}

export default Home;
