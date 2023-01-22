
import { initializeApp } from "firebase/app";

// HERE I AM IMPORTING TWO SERVICES FROM FIREBASE
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
// BELOW WE ARE ESTABLISHING CONNECTION WITH DATABASE
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4O5OPFR-6voLxWOwpOT1e1DUIxGaC3cw",
  authDomain: "blog-project-b3da4.firebaseapp.com",
  projectId: "blog-project-b3da4",
  storageBucket: "blog-project-b3da4.appspot.com",
  messagingSenderId: "610428111223",
  appId: "1:610428111223:web:8dc8c5602af4642a4c3972"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// HERE WE ARE INITIALIZING THE APP AND SETTING UP A CONNECTION BETWEEN FIREBASE
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

