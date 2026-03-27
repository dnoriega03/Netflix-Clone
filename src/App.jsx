import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <h1 style={{ color: "white" }}>Cargando...</h1>;
  }

  return (
    <Router>
      <Routes>
        {/* LOGIN */}
        <Route
          path="/"
          element={!user ? <Login /> : <Navigate to="/home" />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/home" />}
        />

        {/* HOME PROTEGIDO */}
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
