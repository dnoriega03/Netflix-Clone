import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Background from "../components/Background";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor completa todos los campos");
      return;
    }

    try {
      setLoading(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("Usuario logueado:", userCredential.user);

      // 🔥 redirección automática
      navigate("/home");

    } catch (err) {
      console.error(err);
      setError("Correo o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <Background />

      <img
        className="login__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix"
      />

      <div className="login__box">
        <h1>Inicia sesión</h1>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email o número de teléfono"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login__button" type="submit" disabled={loading}>
            {loading ? "Cargando..." : "Iniciar sesión"}
          </button>

          {/* ERROR BONITO */}
          {error && <p className="login__error">{error}</p>}

          <p className="login__signup">
            ¿Primera vez en Netflix?{" "}
            <span onClick={() => navigate("/register")}>
              Suscríbete ahora
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;