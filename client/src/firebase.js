// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "coursify-72a3c.firebaseapp.com",
  projectId: "coursify-72a3c",
  storageBucket: "coursify-72a3c.firebasestorage.app",
  messagingSenderId: "652961709523",
  appId: "1:652961709523:web:a4d76c3dab8d3a086ac326"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);