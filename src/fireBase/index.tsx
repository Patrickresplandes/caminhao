import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAO1PPJcCtq5998YDHgoOfBOSNqNUe1VQs",
  authDomain: "caminhao-64453.firebaseapp.com",
  projectId: "caminhao-64453",
  storageBucket: "caminhao-64453.firebasestorage.app",
  messagingSenderId: "241560180356",
  appId: "1:241560180356:web:9568ba4b1834fffcf314d1",
  measurementId: "G-QQYL0Q50NW",
};

// Inicializa o Firebase App
const app = initializeApp(firebaseConfig);

// Inicializa o Analytics de forma condicional
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

// Inicializa o Auth e Firestore (podem ser usados no servidor)
const auth = getAuth(app);
const db = getFirestore(app);

// Exporta os serviços
export { auth, analytics, db };
