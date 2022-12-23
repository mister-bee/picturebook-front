import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// ---- refactor into firebase.js -----

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  getFirestore
  //collection, getDocs, addDoc, deleteDoc, doc, onSnapshot 
} from "firebase/firestore"
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

console.log("👛👛👛👛 RUNNING", process.env.REACT_APP_FIREBASE_PROJECT_ID)

// initialize app
const app = initializeApp(firebaseConfig)

// initialize services
const db = getFirestore()

// collection ref
// const colRef = collection(db, 'stories')

// auth
const auth = getAuth()

const analytics = getAnalytics(app);

// storage
export const storage = getStorage(app);

// ---- refactor into firebase.js -----


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <App
    auth={auth}
    db={db}
    onAuthStateChanged={onAuthStateChanged}
  />

);


// <React.StrictMode> </React.StrictMode> 