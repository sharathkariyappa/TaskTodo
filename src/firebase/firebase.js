// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkIBt7yR0KP7x4FAsJyLG7Ffn0ye_u0D8",
  authDomain: "task-manager-473e2.firebaseapp.com",
  projectId: "task-manager-473e2",
  storageBucket: "task-manager-473e2.firebasestorage.app",
  messagingSenderId: "762830180166",
  appId: "1:762830180166:web:803f00b25a52173affdf47",
  measurementId: "G-S6G7WJ7WDW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app)