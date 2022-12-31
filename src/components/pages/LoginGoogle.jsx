import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore"
const provider = new GoogleAuthProvider();

export default function LoginGoogle(props) {
  const auth = getAuth();
  const navigate = useNavigate()
  const { db } = props


  useEffect(() => {
    console.log("00000000")
    signInWithPopup(auth, provider)

      .then((result) => {
        console.log("1111111")
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken; // for google api (?)
        return result.user;
      })

      .then((googleUser) => {

        console.log("2222222===>>>>", googleUser)


        // Check if user exists in firestore
        const userId = googleUser.uid
        const docRef = doc(db, "users", userId);

        getDoc(docRef).then((res) => {
          const currentFirebaseUser = res.data()
          console.log("33333333 =====currentFirebaseUser==>", currentFirebaseUser)

          return { user: googleUser, isNewUser: !currentFirebaseUser }

        })

          .then(({ user, isNewUser }) => {

            console.log("444444 ==>>>>", user)
            console.log("isNewUser ==>>>>", isNewUser)

            if (isNewUser) {
              const userId = user.uid

              const newUser = {
                credit: 10,
                photoURL: user.photoURL,
                email: user.email,
                userId,
                userDisplayName: user.displayName,
                dateCreated: "currently in metatag1",
                googleAuth: true,
                metadata: "user.metadata3"
              }

              console.log("user=====>>>>", user)
              console.log("db=====>>>>", db)
              console.log("newUser=====>>>>", newUser)

              setDoc(doc(db, "users", userId), newUser)
            }

            // need access token?

            navigate("/home")
          })
      })

      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("errorMessage", errorMessage)
        // ...
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