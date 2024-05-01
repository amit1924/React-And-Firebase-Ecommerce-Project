// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9MYGe1BOv46FBKrPGByUXEzAlUunZWJo",
  authDomain: "e-kart-37709.firebaseapp.com",
  projectId: "e-kart-37709",
  storageBucket: "e-kart-37709.appspot.com",
  messagingSenderId: "1069647602675",
  appId: "1:1069647602675:web:28dd102928ea5283fba886",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { auth, fireDB };
