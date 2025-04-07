// src/config/firebase-config.js

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJ9k65r9X5l9DRSB1UayWNEcEPem_D-Yo",
  authDomain: "egg-project-57572.firebaseapp.com",
  projectId: "egg-project-57572",
  storageBucket: "egg-project-57572.firebasestorage.app",
  messagingSenderId: "508159008574",
  appId: "1:508159008574:web:daec455e9d33753d01166f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Export them so other files can import
export { auth, db };
