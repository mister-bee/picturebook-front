import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore"

export default function LoginEmail(props) {
  const { auth, db, currentUser, showErrorDisplay, setShowSignUp } = props
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

    })
      .catch((err => {
        showErrorDisplay(err.message)
      }))
  }

  return (

    <>
      <div className="center">


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
            <div className="center">
              <Button color="blue" type="submit" size="huge">Login</Button>
            </div>
          </h3>
        </form>
      </div>
      <div className="center">
        <Button onClick={() => setShowSignUp(false)} color="black" size="mini">Create Account</Button>
      </div>
    </>
  )
}
