import { auth, provider, firestore } from './firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { orderBy, query,limit,collection } from 'firebase/firestore';
import React, { useState, useRef } from 'react';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import './App.css';
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
  const messagesRef = collection(firestore, 'messages');
  const messagesQuery = query(messagesRef, orderBy('createdAt'), limit(30));

  const [messages] = useCollectionData(messagesQuery, { idField: 'id' });

  const [formValue, setFormValue] = useState('');
  const dummy = useRef();

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!formValue.trim()) return; // avoid sending empty messages

    const { uid, photoURL } = auth.currentUser;

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL: photoURL || null,
    });

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMessageTap = (msg) => {
    alert(`Message tapped: "${msg.text}" from user ${msg.uid}`);
  };

  return (
    <>
      <div className="chat-messages">
        {messages?.map(msg => (
          <ChatMessage key={msg.id} message={msg} onTap={() => handleMessageTap(msg)} />
        ))}
        <div ref={dummy}></div>
      </div>

      <form onSubmit={sendMessage} style={{ marginTop: '10px' }}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Type your message"
          style={{ width: '80%', padding: '10px' }}
        />
        <button type="submit" disabled={!formValue.trim()} style={{ padding: '10px 20px' }}>
          Send
        </button>
      </form>
    </>
  );
}

function ChatMessage({ message, onTap }) {
  const { text, uid } = message;
  const messageClass = uid === auth.currentUser?.uid ? 'sent' : 'received';

  return (
    <p className={messageClass} onClick={onTap} style={{ cursor: 'pointer' }}>
      {text}
    </p>
  );
}

export default App;