import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBs6lIgS7Vcldlf5-Eu56ICJKTVfOlHQ6g",
    authDomain: "chadefraldas-999fd.firebaseapp.com",
    projectId: "chadefraldas-999fd",
    storageBucket: "chadefraldas-999fd.firebasestorage.app",
    messagingSenderId: "261093164833",
    appId: "1:261093164833:web:33b5d6226c81d8bd832060"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, doc, getDoc, updateDoc };
