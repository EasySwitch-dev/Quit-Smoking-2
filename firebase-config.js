// INCOLLA QUI LA CONFIGURAZIONE FORNITA DA FIREBASE

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAE3wh-aJzuxiudQEWq7a2zqY85a-LfUaI",
  authDomain: "quit-smoking-dc245.firebaseapp.com",
  projectId: "quit-smoking-dc245",
  storageBucket: "quit-smoking-dc245.firebasestorage.app",
  messagingSenderId: "669238953304",
  appId: "1:669238953304:web:aee77bb23edcd90880512d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
