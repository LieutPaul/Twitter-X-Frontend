import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "twitterx-4ff0f.firebaseapp.com",
  projectId: "twitterx-4ff0f",
  storageBucket: "twitterx-4ff0f.appspot.com",
  messagingSenderId: "56987800072",
  appId: "1:56987800072:web:9cc18baefc829b69f0b7bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)