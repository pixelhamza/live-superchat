import logo from './logo.svg';
import './App.css';
import firebase, { initializeApp } from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-fireabse-hooks/firestore'

firebase.initializeApp({
  piKey: "AIzaSyBlvmfyEu1q-4d3Dj8MjupLU_Gj5fNDPis",
  authDomain: "superchat-eec12.firebaseapp.com",
  projectId: "superchat-eec12",
  storageBucket: "superchat-eec12.firebasestorage.app",
  messagingSenderId: "663980396987",
  appId: "1:663980396987:web:52e22137554cf7ba2e749e",
  measurementId: "G-2TS0Z971YT"

})

const auth=firebase.auth()
const firestore=firebase.firestore()


function App() {

  const user=useAuthState(auth)
  
  return (
    <div className="App">
      <header className="App-header">
       
      </header>
    </div>
  );
}

export default App;
