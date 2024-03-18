// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore"
import {getAuth , GithubAuthProvider} from "firebase/auth"

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
const auth = getAuth(app);
const provider = new GithubAuthProvider();

export {auth,provider}
export const database = getFirestore(app)