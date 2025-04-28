// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSV0gPmVlA7aNv4C35JSNd-ZmcpcIfBKM",
  authDomain: "zadanie1-4901b.firebaseapp.com",
  projectId: "zadanie1-4901b",
  storageBucket: "zadanie1-4901b.firebasestorage.app",
  messagingSenderId: "964593134940",
  appId: "1:964593134940:web:f5f3b6a13de25d34882599"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);