// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_DOMEIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  database: process.env.NEXT_PUBLIC_DATABASE,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASURMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = isSupported().then((yes) =>
  yes ? getAnalytics(app) : null
);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
