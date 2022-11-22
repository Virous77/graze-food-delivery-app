import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBAYf1BsJGRBd6jz1_h6tjiB0JkjEWV9Ss",
  authDomain: "posts-6fdae.firebaseapp.com",
  databaseURL:
    "https://posts-6fdae-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "posts-6fdae",
  storageBucket: "posts-6fdae.appspot.com",
  messagingSenderId: "203960574404",
  appId: "1:203960574404:web:f0c2b931380792cc498491",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
