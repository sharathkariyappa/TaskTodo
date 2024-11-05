// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later., measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCYLi_ocAoeFG1iIPW5c0FMRDGDeJc_jVw',
	authDomain: 'todo-list-6af7f.firebaseapp.com',
	projectId: 'todo-list-6af7f',
	storageBucket: 'todo-list-6af7f.appspot.com',
	messagingSenderId: '367052555696',
	appId: '1:367052555696:web:135d020943f2da261a4275',
	measurementId: 'G-L0E5CJH655',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
