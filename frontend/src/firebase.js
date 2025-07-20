 // src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAw0wF_D6C1fBKuXXSC_iAzpvcuFySeT-o",
  authDomain: "dinespot-44921.firebaseapp.com",   //Add `.firebaseapp.com`
  projectId: "dinespot-44921",                    //Required for Firebase Auth
  storageBucket: "dinespot-44921.appspot.com",    //Correct domain for storage
  messagingSenderId: "957024982642",
  appId: "1:957024982642:web:78a2919fe775c77d9ed4eb",
  measurementId: "G-6GTS2J9DWX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
