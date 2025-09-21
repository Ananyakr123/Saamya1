import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyCaJk0eAnqJKcyiqTQh6YVEdyAoLDA82k0",
    authDomain: "saamya-7b17e.firebaseapp.com",
    projectId: "saamya-7b17e",
    storageBucket: "saamya-7b17e.firebasestorage.app",
    messagingSenderId: "761732974208",
    appId: "1:761732974208:web:03d6b12abbd1f982dbc865",
    measurementId: "G-05EZBZ71LB"
  };

  const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);