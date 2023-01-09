import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import Lottie from 'lottie-react'
import GoogleButton from 'react-google-button'
import LoginEmail from './LoginEmail.jsx'
import LoginSignupEmail from './LoginSignupEmail.jsx'
import artGraphic from '../../images/71308-artificial-intelligence-lottie-animation.json'

export default function Login(props) {
  const { currentUser } = props
  const [showSignUp, setShowSignUp] = useState("hello-user")
  const [showEmailUI, setShowEmailUI] = useState(false)
  const navigate = useNavigate()
  const toggleMain = () => setShowEmailUI(!showEmailUI)

  if (currentUser) return navigate("/home")

  return (<>
    <h1 style={{ color: "blue", fontSize: "5em" }} >Picture Book!</h1>

    <Lottie
      style={{ height: 400 }}
      animationData={artGraphic}
      loop={false} />
    <br />
    <div className="center">
      {!showEmailUI && <Button onClick={toggleMain} size="huge" color="black">Email and Password</Button>}
    </div>
    <br />
    {showEmailUI
      ? <>
        {showSignUp
          ? <LoginEmail setShowSignUp={setShowSignUp} {...props} />
          : <LoginSignupEmail setShowSignUp={setShowSignUp} {...props} />
        }
      </>
      : null
    }

    <div className="center">
      {!showEmailUI && <GoogleButton onClick={() => navigate('logingoogle')} />}
    </div>
    <br />
    <br />
  </>

  );
}