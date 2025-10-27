import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAVNDFJQnWoe0ZRRauN7E6WJfKooyCp2xo",
  authDomain: "avabookstore-90634.firebaseapp.com",
  projectId: "avabookstore-90634",
  storageBucket: "avabookstore-90634.appspot.com",
  messagingSenderId: "904567718489",
  appId: "1:904567718489:web:f3a2caed8be8a9d6f7a748",
  measurementId: "G-PPV4R38Z9Q"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
