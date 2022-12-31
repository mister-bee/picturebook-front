import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();

export default function LoginGoogle() {
  const auth = getAuth();
  const navigate = useNavigate()


  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      return result.user;
    }).then((user) => {
      console.log("user=====>>>>", user)
      // if in database, ask to create account
      //     1) create account and  2) navigate("/home")
      //     OR 
      //      1) erase auth record and 2) logout
      // else navigate("/home")




    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });

  return (
    <div>LoginGoogle</div>
  )
}
