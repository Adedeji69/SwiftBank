import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyCjggTWXStM7Jt7PIhYCyaVISzcigBqKH0",
  authDomain: "swiftbank-app.firebaseapp.com",
  projectId: "swiftbank-app",
  storageBucket: "swiftbank-app.firebasestorage.app",
  messagingSenderId: "117901368751",
  appId: "1:117901368751:web:2df0fee45c9a1f668fa35a"
};

const app = initializeApp(firebaseConfig);

export { app };