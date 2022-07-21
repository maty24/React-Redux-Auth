// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBs-vL7JwZZ5hAj9NJonCGwUvi4PCVMwgs",
  authDomain: "react-redux-b0ba8.firebaseapp.com",
  projectId: "react-redux-b0ba8",
  storageBucket: "react-redux-b0ba8.appspot.com",
  messagingSenderId: "798225424052",
  appId: "1:798225424052:web:607e34702b6093150fc1e1"
};

// Initialize Firebase
export const Firebaseapp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(Firebaseapp);
export const FirebaseDB = getFirestore(Firebaseapp);