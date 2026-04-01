// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4Gs7GKLBL-MOlYkqdh558N3F_6mqupZo",
  authDomain: "future-forge-c711d.firebaseapp.com",
  projectId: "future-forge-c711d",
  storageBucket: "future-forge-c711d.firebasestorage.app",
  messagingSenderId: "212982347253",
  appId: "1:212982347253:web:8088b82e0b308282c95cbc",
  measurementId: "G-N118XWR5GW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only if running in browser (not SSR)
let analytics = null;

if (typeof window !== 'undefined') {
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
      console.log('✅ Firebase Analytics initialized');
    } else {
      console.log('ℹ️ Firebase Analytics not supported in this environment');
    }
  });
}

// Initialize Firestore
const db = getFirestore(app);
console.log('✅ Firebase Firestore initialized');

export { app, analytics, db };
