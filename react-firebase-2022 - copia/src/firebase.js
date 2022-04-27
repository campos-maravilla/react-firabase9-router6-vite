
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCI7fPPSSn2fgdnsZr1NaCABDKQKsZAtxA",
    authDomain: "react-2022-7a79b.firebaseapp.com",
    projectId: "react-2022-7a79b",
    storageBucket: "react-2022-7a79b.appspot.com",
    messagingSenderId: "1098982868667",
    appId: "1:1098982868667:web:be25eef4e4f807d9894b9e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };