import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.AIzaSyCdaaLp-Y1h6kjeXrP3mAxwg0OaWZOAvEg,
  authDomain: process.env.weather-application-2e087.firebaseapp.com,
  projectId: process.env.weather-application-2e087,
  storageBucket: process.env.weather-application-2e087.firebasestorage.app,
  messagingSenderId: process.env.15833756474,
  appId: process.env.1:15833756474:web:1987f148192ec49450d603,
};



// Initializing the  Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Register a user
export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Login a user
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Logout a user
export const logoutUser = () => {
  return signOut(auth);
};

export { auth };
