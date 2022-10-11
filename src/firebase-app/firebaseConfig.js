import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCCyttdbxI1ERkjo0Ipnh9nVgXP8j8IeoI",
  authDomain: "movie-app-41ce9.firebaseapp.com",
  projectId: "movie-app-41ce9",
  storageBucket: "movie-app-41ce9.appspot.com",
  messagingSenderId: "334263502846",
  appId: "1:334263502846:web:e321fc97d01b3ff821a2af",
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const providerGoogle = new GoogleAuthProvider();
export const providerFacebook = new FacebookAuthProvider();
export const db = getFirestore(app);
