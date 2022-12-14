import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";

const Login = () => {
  const [userInfo, setUserInfo] = useState(null);

  const onSignIn = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider);
      setUserInfo(result.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {userInfo ? (
        // Show user info if logged in
        <>
          <p>Hello, {userInfo.displayName}!</p>
          <p>Your email: {userInfo.email}</p>
        </>
      ) : (
        // Show login button if not logged in
        <button onClick={onSignIn}>Sign in with Google</button>
      )}
    </>
  );
};

export default Login;