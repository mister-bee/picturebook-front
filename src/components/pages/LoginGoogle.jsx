import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setDoc, doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore"
const provider = new GoogleAuthProvider();

export default function LoginGoogle(props) {
  const auth = getAuth();
  const navigate = useNavigate()
  const { db } = props
  const standardStartingCredit = 10

  useEffect(() => {

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken; // for google api (?)
        return result.user;
      })

      .then((googleUser) => {
        // Check if user exists in firestore

        const userId = googleUser.uid
        const docRef = doc(db, "users", userId);

        getDoc(docRef).then((res) => {
          const currentFirebaseUser = res.data()
          let incrementedLogins = 0

          if (!!currentFirebaseUser) { incrementedLogins = currentFirebaseUser.numberOfLogins + 1 }

          return { user: googleUser, isNewUser: !currentFirebaseUser, docRef, incrementedLogins }
        })

          .then(({ user, isNewUser, docRef, incrementedLogins }) => {

            if (isNewUser) {
              const userId = user.uid
              const newUser = {
                credit: standardStartingCredit,
                photoURL: user.photoURL,
                email: user.email,
                userId,
                userDisplayName: user.displayName,
                googleAuth: true,
                numberOfLogins: 1,
                dateCreated: serverTimestamp(),
                dateLastLoggedIn: serverTimestamp(),
              }

              setDoc(doc(db, "users", userId), newUser) // then navigate("/home")

            } else {
              const dataToUpdate = {
                numberOfLogins: incrementedLogins,
                dateLastLoggedIn: serverTimestamp()
              }

              // get old record and increase
              updateDoc(docRef, dataToUpdate) // then navigate("/home")
            }

            navigate("/home")
          })
      })

      .catch((error) => {

        const errorCode = error.code;
        const errorMessage = error.message;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("errorMessage", errorMessage)
      });

  }, [])



  return (
    <div>LoginGoogle</div>
  )
}



/*     .then((googleUser) => {
      // Check if user exists in firestore
      const userId = googleUser.uid
      const docRef = doc(db, "users", userId);
 
      console.log("22222222")
 
      getDoc(docRef).then((res) => {
        const currentFirebaseUser = res.data()
 
        // if (currentFirebaseUser) {
        //   console.log("🍒🍒🍒 CURRENT USER 🍒🍒🍒")
        //   return navigate("/home")
        //   //return navigate("/home")
        // } else {
 
        //   console.log("🫒 🫒 🫒 CREATE FIRESTORE NEW FIRESTORE 🫒 🫒 🫒")
        //   return googleUser
        //     .then(() => {
        //       console.log("THIS WAY")
        //     })
        // }
 
        // return currentFirebaseUser
        return googleUser
 
      })
 */