import React, { useState } from "react";
import { Button } from 'semantic-ui-react'
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";
import Logout from "./Logout";

export function NameForm(props) {
  const { auth } = props
  const [showSignUp, setShowSignUp] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSignIn = (evt) => {
    evt.preventDefault();
    // setEmailAndPassword({ email, password })
    signInWithEmailAndPassword(auth, email, password).then((cred) => {
    }).catch((err => console.error(err.message)))
  }

  const handleSignUp = (evt) => {
    evt.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then((cred) => {
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
      {/* <Logout auth={auth} /> */}

    </div>
  </>
  );
}