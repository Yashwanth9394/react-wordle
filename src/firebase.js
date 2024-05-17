import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { collection, getFirestore } from 'firebase/firestore'

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDGueN_W93G1QAn-7Z26uhQEN2jalmMXJQ',
  authDomain: 'wordleai-75012.firebaseapp.com',
  projectId: 'wordleai-75012',
  storageBucket: 'wordleai-75012.appspot.com',
  messagingSenderId: '637264748895',
  appId: '1:637264748895:web:3acc1e7b591880262696ea',
  measurementId: 'G-Q2N33TKECS',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
const db = getFirestore(app)

// Initialize Firebase Analytics
const analytics = getAnalytics(app)

export { db, app, analytics }
