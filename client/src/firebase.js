// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-a07d4.firebaseapp.com",
  projectId: "mern-auth-a07d4",
  storageBucket: "mern-auth-a07d4.appspot.com",
  messagingSenderId: "58592107376",
  appId: "1:58592107376:web:29faa2111a3393d00dcdb5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);