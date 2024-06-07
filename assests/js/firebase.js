// Importa las funciones necesarias desde el SDK de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Configuración de Firebase para tu aplicación web
export const firebaseConfig = {
    apiKey: "AIzaSyDaTVP-9F7DTD0d57PCsDZnsPE8hAZ4XhQ",
    authDomain: "webcien-4c88b.firebaseapp.com",
    projectId: "webcien-4c88b",
    storageBucket: "webcien-4c88b.appspot.com",
    messagingSenderId: "864662688017",
    appId: "1:864662688017:web:c0a7f380dc885e0983bcb0"
  };

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
export const db = getFirestore(app);

