// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDT9LxvBwxEcm7gJPZoSR7o_h8gaGkNvzA",
  authDomain: "book-inventory-a52aa.firebaseapp.com",
  projectId: "book-inventory-a52aa",
  storageBucket: "book-inventory-a52aa.appspot.com",
  messagingSenderId: "377792439978",
  appId: "1:377792439978:web:8ead6c330d1583c0ed52d3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
