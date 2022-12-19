import React, { useState } from "react";
import { Button } from 'semantic-ui-react'
import { createUserWithEmailAndPassword } from "firebase/auth";

export function NameForm(props) {
  const { setEmailAndPassword, auth } = props

  const [showSignUp, setShowSignUp] = useState(false)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSignInSubmit = (evt) => {
    evt.preventDefault();
    setEmailAndPassword({ email, password })
  }

  const handleSignUpSubmit = (evt) => {
    evt.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then((cred) => {
      console.log(cred.user)
    })
    console.log("email", email)
    console.log("password", password)
  }

  const toggleSignup = () => {
    setEmail("")
    setPassword("")
    setShowSignUp(!showSignUp)
  }

  return (showSignUp ?
    <> <h1 style={{ color: "orange" }}>New Account</h1>
      <form onSubmit={handleSignUpSubmit}>

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
    <> <h1 style={{ color: "blue" }}>Picure Book Login</h1>
      <form onSubmit={handleSignInSubmit}>

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
    </>

  );
}