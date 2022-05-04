import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC_eyDGG3AHsjSwbJ2mKIGgcIA54vySAH8",
  authDomain: "movie-a9cb0.firebaseapp.com",
  projectId: "movie-a9cb0",
  storageBucket: "movie-a9cb0.appspot.com",
  messagingSenderId: "362064536571",
  appId: "1:362064536571:web:2aa0a5c2ddd9e50a38a15e",
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const providerGoogle = new GoogleAuthProvider();
export const providerFacebook = new FacebookAuthProvider();
export const db = getFirestore(app);
