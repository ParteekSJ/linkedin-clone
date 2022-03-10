// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAK7qpp-abFW2mqbYYjbiVA6dwYKFqu_YA",
  authDomain: "linkedin-clone-ed306.firebaseapp.com",
  projectId: "linkedin-clone-ed306",
  storageBucket: "linkedin-clone-ed306.appspot.com",
  messagingSenderId: "895383737467",
  appId: "1:895383737467:web:2f50d3744dadf731803ede",
  measurementId: "G-MNKZK7GLPZ",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
