import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Background from "../components/Background";
import "./Login.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login">
      <Background />

      <div className="login__box">
        <h1>Crear cuenta</h1>
        <form onSubmit={register}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login__button" type="submit">
            Registrarse
          </button>

          {error && <p className="login__error">{error}</p>}

          <p className="login__signup">
            ¿Ya tienes cuenta?{" "}
            <span onClick={() => navigate("/")}>Inicia sesión</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register; // 🔥 ESTO ES CLAVE
