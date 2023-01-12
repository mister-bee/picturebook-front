import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import Lottie from 'lottie-react'
import GoogleButton from 'react-google-button'
import LoginEmail from './LoginEmail.jsx'
import LoginSignupEmail from './LoginSignupEmail.jsx'
import artGraphic from '../../images/71308-artificial-intelligence-lottie-animation.json'
import { ToastContainer, toast } from 'react-toastify';

export default function Login(props) {
  const { currentUser } = props
  const [showSignUp, setShowSignUp] = useState("hello-user")
  const [showEmailUI, setShowEmailUI] = useState(false)
  const navigate = useNavigate()
  const toggleMain = () => setShowEmailUI(!showEmailUI)

  const showErrorDisplay = (message) => toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    theme: "light"
  });

  if (currentUser) return navigate("/home")

  return (<>
    <ToastContainer />
    <h1 style={{ color: "blue", fontSize: "6em" }} >Picture Book</h1>
    <h5 className="center">Bringing imagination to life with personalized illustrated short stories for children.</h5>
    <Lottie
      style={{ height: 300 }}
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
          ? <LoginEmail
            showErrorDisplay={showErrorDisplay}
            setShowSignUp={setShowSignUp}
            {...props} />
          : <LoginSignupEmail
            setShowSignUp={setShowSignUp}
            showErrorDisplay={showErrorDisplay}
            {...props} />
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