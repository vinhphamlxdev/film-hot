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

// const firebaseConfig = {
//   apiKey: "AIzaSyClxUwpz6r6Ib4RbMhYqm7XWLavZHJjx6Q",
//   authDomain: "danime-c49f3.firebaseapp.com",
//   projectId: "danime-c49f3",
//   storageBucket: "danime-c49f3.appspot.com",
//   messagingSenderId: "527568071796",
//   appId: "1:527568071796:web:1506f06f6c91f5cac6f521",
//   measurementId: "G-6QTPQGEH4D",
// };

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const providerGoogle = new GoogleAuthProvider();
export const providerFacebook = new FacebookAuthProvider();
export const db = getFirestore(app);
