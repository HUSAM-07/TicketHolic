// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCj4gD3JWugOw4rhjskQJjHc2c_weP1X8s",
  authDomain: "ticketholic-726e7.firebaseapp.com",
  projectId: "ticketholic-726e7",
  storageBucket: "ticketholic-726e7.firebasestorage.app",
  messagingSenderId: "181108249644",
  appId: "1:181108249644:web:1a6203928bd9246fb7ad89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);