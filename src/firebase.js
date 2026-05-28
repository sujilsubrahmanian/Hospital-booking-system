// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1eY8q5gvaWP3efbAtXRuvlydOeBHV-uc",
  authDomain: "medicareapp-5a04e.firebaseapp.com",
  projectId: "medicareapp-5a04e",
  storageBucket: "medicareapp-5a04e.firebasestorage.app",
  messagingSenderId: "658956686520",
  appId: "1:658956686520:web:9680690300b013ad84904d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);