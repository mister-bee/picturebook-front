import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore"

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
initializeApp(firebaseConfig)

// initialize services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'stories')
getDocs(colRef).then((snapshot) => {

  let stories = []

  snapshot.docs.forEach((doc) => {
    stories.push({ ...doc.data(), id: doc.id })
  })

  console.log("stories", stories)
}).catch(err => {
  console.log("err", err)
})


//export default app;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// test