import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

function GoogleSignIn() {
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  const handleSignIn = () => {
    firebase.auth().signInWithPopup(googleAuthProvider);
  }

  return (
    <button onClick={handleSignIn}>
      Sign in with Google
    </button>
  );
}

export default GoogleSignIn;
