// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPs83LY_py8Io65TW_J2twhJGDYkiOwO0",
  authDomain: "fir-contect-62b31.firebaseapp.com",
  projectId: "fir-contect-62b31",
  storageBucket: "fir-contect-62b31.appspot.com",
  messagingSenderId: "751612350866",
  appId: "1:751612350866:web:e78a05c1849396ecac314b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);