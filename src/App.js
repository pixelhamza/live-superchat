import { auth, provider, firestore } from './firebase'; // ✅ use modular setup
import { signInWithPopup, signOut } from 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore'


function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        <h1>SuperChat</h1>
        <SignOut />
      </header>
      <section className="App-main">
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Signed in:', result.user);
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => signOut(auth)}>Sign Out</button>
  );
}

function ChatRoom() {
  return <div>Welcome to the chat room!</div>;
}

export default App;