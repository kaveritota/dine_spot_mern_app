 // src/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
   apiKey: "AIzaSyAw0wF_D6C1fBKuXXSC_iAzpvcuFySeT-o",
  authDomain: "dinespot-44921.firebaseapp.com",
  projectId: "dinespot-44921",
  storageBucket: "dinespot-44921.firebasestorage.app",
  messagingSenderId: "957024982642",
  appId: "1:957024982642:web:78a2919fe775c77d9ed4eb",
  measurementId: "G-6GTS2J9DWX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Set up auth and Google provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
