// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDs8MprilJEJOSVMlEMEs51G4PDJ7Sn5mY",
  authDomain: "react-fb-auth-a7974.firebaseapp.com",
  projectId: "react-fb-auth-a7974",
  storageBucket: "react-fb-auth-a7974.appspot.com",
  messagingSenderId: "520581200931",
  appId: "1:520581200931:web:130c4f7414bb8601800596"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)