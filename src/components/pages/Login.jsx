import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { setDoc, doc } from "firebase/firestore"

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function Login(props) {
  const { auth, db, currentUser } = props
  const [showSignUp, setShowSignUp] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleSignIn = (evt) => {
    evt.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then((cred) => {
    }).catch((err => console.error(err.message)))
  }

  const handleSignUp = (evt) => {
    evt.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then((cred) => {
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