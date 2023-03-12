// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDim4KoTTvXZ7VBlD5ppyFSjPZOLErjyd4",
  authDomain: "sendmail-22317.firebaseapp.com",
  projectId: "sendmail-22317",
  storageBucket: "sendmail-22317.appspot.com",
  messagingSenderId: "902203849810",
  appId: "1:902203849810:web:06f798c2f939c61689338b",
  measurementId: "G-130V9VYKCP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line
const analytics = getAnalytics(app);
export const auth = getAuth();