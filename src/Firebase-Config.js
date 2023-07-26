// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIT6TyrCtnw4m8kHyBe90aO5ybj6D6rms",
  authDomain: "upload-images-react-d6c23.firebaseapp.com",
  projectId: "upload-images-react-d6c23",
  storageBucket: "upload-images-react-d6c23.appspot.com",
  messagingSenderId: "1943152129",
  appId: "1:1943152129:web:4bff281db7c9b3da740200",
  measurementId: "G-WXKLYSHE3K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);