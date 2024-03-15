// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-qqsJTlxTq65K2ToL6FQdYItwtA2S1nI",
  authDomain: "ehsaandraw.firebaseapp.com",
  projectId: "ehsaandraw",
  storageBucket: "ehsaandraw.appspot.com",
  messagingSenderId: "324689529899",
  appId: "1:324689529899:web:1182f42f688d6f4823ae6e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)