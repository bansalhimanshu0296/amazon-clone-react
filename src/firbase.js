import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";


const firebaseConfig = {
    apiKey: "AIzaSyDwGS6PZZUWR1V0EhJoCgnaGUvHPqwxAOc",
    authDomain: "clone-6d5b3.firebaseapp.com",
    projectId: "clone-6d5b3",
    storageBucket: "clone-6d5b3.appspot.com",
    messagingSenderId: "140056223676",
    appId: "1:140056223676:web:c73c50aedab4c305b115b9"
};

const app = getApps().length ?  getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { db, auth, functions };