import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHSmddMfR9Jkg47Y6mc8d-YhNMggVsD0U",
  authDomain: "netflix-clone-cdfe6.firebaseapp.com",
  projectId: "netflix-clone-cdfe6",
  storageBucket: "netflix-clone-cdfe6.firebasestorage.app",
  messagingSenderId: "347285252688",
  appId: "1:347285252688:web:01851dc97ea5d3d838bf55",
  measurementId: "G-1HF6F3R97H"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// activar persistencia del login
setPersistence(auth, browserLocalPersistence);