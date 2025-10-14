
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBlvmfyEu1q-4d3Dj8MjupLU_Gj5fNDPis",
  authDomain: "superchat-eec12.firebaseapp.com",
  projectId: "superchat-eec12",
  storageBucket: "superchat-eec12.appspot.com",
  messagingSenderId: "663980396987",
  appId: "1:663980396987:web:52e22137554cf7ba2e749e",
  measurementId: "G-2TS0Z971YT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const firestore = getFirestore(app);

export { auth, provider, firestore };