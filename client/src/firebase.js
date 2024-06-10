// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-162d3.firebaseapp.com",
  projectId: "mern-blog-162d3",
  storageBucket: "mern-blog-162d3.appspot.com",
  messagingSenderId: "156748686029",
  appId: "1:156748686029:web:5ca46171ad84ea1d27bf84"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

