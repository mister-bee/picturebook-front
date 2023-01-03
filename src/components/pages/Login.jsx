import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { setDoc, doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore"

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function Login(props) {
  const { auth, db, currentUser } = props
  const [showSignUp, setShowSignUp] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const standardStartingCredit = 10


  const handleSignIn = (evt) => {
    evt.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then((cred) => {
      // 2  UPDATE DOC
      const userId = cred.user.uid
      const docRef = doc(db, "users", userId);

      getDoc(docRef).then((res) => {
        const currentFirebaseUser = res.data()

        return { userId, docRef, currentFirebaseUser }
      })

        .then(({ userId, docRef, currentFirebaseUser }) => {

          const dataToUpdate = {
            numberOfLogins: currentFirebaseUser.numberOfLogins + 1,
            dateLastLoggedIn: serverTimestamp()
          }

          console.log("dataToUpdate", dataToUpdate)
          console.log("userId", userId)

          updateDoc(docRef, dataToUpdate)

        })

    }).catch((err => console.error(err.message)))
  }

  const handleSignUp = (evt) => {
    evt.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)

      // set to firestore
      // #1 - check this
      .then((cred) => {

        const userId = cred.user.uid

        const newUser = {
          credit: standardStartingCredit,
          photoURL: cred.user.photoURL,
          email: cred.user.email,
          userId,
          userDisplayName: cred.user.displayName,
          googleAuth: false,
          numberOfLogins: 1,
          dateCreated: serverTimestamp(),
          dateLastLoggedIn: serverTimestamp(),
        }



        // set title of user file to userID
        setDoc(doc(db, "users", userId), newUser)

      }).catch((err) => {
        console.error(err.message)
      })
  }

  const toggleSignup = () => {
    setEmail("")
    setPassword("")
    setShowSignUp(!showSignUp)
  }

  if (currentUser) {
    return navigate("/home")
  }

  return (<>
    {showSignUp ?
      <> <h1 style={{ color: "orange", fontSize: "4em" }}>Create New Account</h1>

        <form onSubmit={handleSignUp}>
          <h3>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)} />
            </label>
            <div>
              <label>
                Password
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)} />
              </label>

            </div>
            <br />
            <div>
              <Button
                color="orange"
                size="huge"
                type="submit">Create Account</Button>
            </div>
          </h3>

        </form>
        <br />
        <br />
        <br />

        <Button onClick={() => toggleSignup(false)} color="black" size="mini">Return to Sign-in</Button>
      </>
      :
      <> <h1 style={{ color: "blue", fontSize: "5em" }}  >Picture Book</h1>
        <form onSubmit={handleSignIn}>

          <h3>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)} />
            </label>

            <div>
              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)} />
              </label>
            </div>
            <br />
            <div>
              <Button color="blue" type="submit" size="huge">Login</Button>
            </div>
          </h3>
        </form>
        <br />
        <br />
        <br />
        <br />

        <Button onClick={toggleSignup} color="black" size="mini">Create Account</Button>
      </>}
    <div>

    </div>
    <Button onClick={() => navigate('logingoogle')}>Google Login</Button>
  </>
  );
}