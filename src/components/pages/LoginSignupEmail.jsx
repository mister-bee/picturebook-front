import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore"

export default function LoginSignupEmail(props) {
  const { auth, db, currentUser, setShowSignUp, showErrorDisplay } = props
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const standardStartingCredit = 10
  const handleSignUp = (evt) => {
    evt.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)

      // set to firestore
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
        showErrorDisplay(err.message)
      })
  }

  return (<>
    <h1 style={{ color: "orange", fontSize: "4em" }}>Create New Account</h1>

    <div className="center">
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
          <div className="center">
            <Button
              color="orange"
              size="huge"
              type="submit">Create Account</Button>
          </div>
        </h3>
      </form>
    </div>
    <div className="center">
      <Button onClick={() => setShowSignUp(true)} color="black" size="mini">Return to Sign-in</Button>
    </div>
  </>
  )
}
