import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDgOnxmZGrmhVELyH7vGsE_hYNZoQ6Sgyc",
  authDomain: "book-list-bebba.firebaseapp.com",
  databaseURL: "https://book-list-bebba-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "book-list-bebba",
  storageBucket: "book-list-bebba.appspot.com",
  messagingSenderId: "657584683863",
  appId: "1:657584683863:web:b066cbb020d38c559a9c12",
  measurementId: "G-FN2DCG9P4F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;