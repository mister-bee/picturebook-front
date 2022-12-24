import React, { useState } from "react";
import { Button } from 'semantic-ui-react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore"

export function LoginWithEmail(props) {
  const { auth, db } = props
  const [showSignUp, setShowSignUp] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //const colRefNewUser = collection(db, "users")

  const handleSignIn = (evt) => {
    evt.preventDefault();
    // setEmailAndPassword({ email, password })
    signInWithEmailAndPassword(auth, email, password).then((cred) => {
    }).catch((err => console.error(err.message)))
  }

  const handleSignUp = (evt) => {
    evt.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then((cred) => {

      // ------------------------------------

      const userId = cred.user.uid

      const newUser = {
        credit: 10,
        photoURL: cred.user.photoURL,
        email: cred.user.email,
        userId,
        userDisplayName: cred.user.displayName,
        lalala: "more metadata to come"
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


  return (<>
    {showSignUp ?
      <> <h1 style={{ color: "orange" }}>New Account</h1>
        <form onSubmit={handleSignUp}>
          <h3>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)} />
            </label>
            <div>
              <Button color="black" size="large" type="submit">Create Account</Button>
            </div>
          </h3>

        </form>
        <br />
        <br />
        <br />
        <br />
        <br />

        <Button onClick={() => toggleSignup(false)} color="orange" size="mini">Return to Sign-in</Button>
      </>
      :
      <> <h1 style={{ color: "blue" }}>Picture Book Login</h1>
        <form onSubmit={handleSignIn}>

          <h3>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)} />
            </label>
            <div>
              <Button color="black" type="submit" size="large">Enter</Button>
            </div>
          </h3>
        </form>
        <br />
        <br />
        <br />
        <br />
        <br />

        <Button onClick={toggleSignup} color="blue" size="mini">Sign up</Button>
      </>}
    <div>

    </div>
  </>
  );
}