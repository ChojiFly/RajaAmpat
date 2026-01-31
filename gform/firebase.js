import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCOHkv7GwBAo0zs3gACjvw_tZeLMnJdSVw",
  authDomain: "raja-ampat2.firebaseapp.com",
  projectId: "raja-ampat2",
  storageBucket: "raja-ampat2.firebasestorage.app",
  messagingSenderId: "146871945044",
  appId: "1:146871945044:web:c639b17c5b8ac6a15beac1"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

// LOGIN ANONIM
signInAnonymously(auth).catch(console.error);

// FLAG SIAP
export let authReady = false;

onAuthStateChanged(auth, user => {
  if (!user) {
    auth.signInAnonymously();
  }
});
