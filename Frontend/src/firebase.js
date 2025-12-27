import { initializeApp } from "firebase/app";
// import { auth } from "../firebase";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAe7kLSfa3cPwQYJZOzDyAhc-eHWRMhClk",
  authDomain: "iit-delhi-project-7b106.firebaseapp.com",
  projectId: "iit-delhi-project-7b106",
  storageBucket: "iit-delhi-project-7b106.appspot.com",
  messagingSenderId: "529879806096",
  appId: "1:529879806096:web:5b2fdaeb11afa04e1a6815",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
