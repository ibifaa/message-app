// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyA67aMv6CMfznJNdKESZnL13v7mYd7ESeE",

  authDomain: "message-app-e9ce9.firebaseapp.com",

  projectId: "message-app-e9ce9",

  storageBucket: "message-app-e9ce9.appspot.com",

  messagingSenderId: "476352939575",

  appId: "1:476352939575:web:ed6c01bb8e687e66d8e1b2",

  measurementId: "G-WZM8FE8TG4"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();