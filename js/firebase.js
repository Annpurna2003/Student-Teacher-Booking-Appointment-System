// firebaase configuration

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD43jpOVctl5uZJDh6gId_C1tnee5SpFl4",
  authDomain: "booking-app-851b4.firebaseapp.com",
  projectId: "booking-app-851b4",
  storageBucket: "booking-app-851b4.firebasestorage.app",
  messagingSenderId: "572089626669",
  appId: "1:572089626669:web:fcb0f0ff747db5d4dc08a4",
  measurementId: "G-B73HFPHRP7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth ,db,app,analytics }; 