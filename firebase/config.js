import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgY7c-NysA2IG28UFP52YPH4J-vRLj204",
  authDomain: "kokuri-v4.firebaseapp.com",
  projectId: "kokuri-v4",
  storageBucket: "kokuri-v4.appspot.com",
  messagingSenderId: "257603556904",
  appId: "1:257603556904:web:6eda0bd775dc41f82a871d",
  measurementId: "G-1VZFJDRRK8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
