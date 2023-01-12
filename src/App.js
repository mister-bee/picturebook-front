import { useState, useEffect } from 'react'
import { Container } from 'semantic-ui-react'
import "./App.css"
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from "react-router-dom"

import Home from "./components/pages/Home"
import LoginMain from "./components/pages/LoginMain"
import LoginGoogle from "./components/pages/LoginGoogle"
import About from "./components/pages/About"
import Billing from "./components/pages/Billing"
import Crypto from "./components/pages/Crypto"
import Stories from "./components/pages/Stories"
import Story from "./components/pages/Story"
import Profile from "./components/pages/Profile"
import ErrorPage from "./components/pages/ErrorPage"
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-bottts-sprites';

const Navigation = () => {
  return (
    <nav>
      <NavLink to="/home">Home </NavLink>
      <NavLink to="/profile">Profile </NavLink>
      <NavLink to="/stories">Stories </NavLink>
      <NavLink to="/about">About </NavLink>
    </nav>
  )
}

function App(props) {
  const { db, auth, onAuthStateChanged } = props
  const [currentUser, setCurrentUser] = useState(null)
  const [imageUrls, setImageUrls] = useState([])
  const [avatar, setAvatar] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [])


  useEffect(() => {
    if (currentUser) {
      let dicebearSVG = createAvatar(style, {
        seed: currentUser?.uid,
        dataUri: true,
        // ... and other options
      });
      setAvatar(dicebearSVG)
    }
  }, [currentUser])



  return (
    <Router>
      {currentUser ? <>
        <Container>

          <header className="App-header">
            <h1 style={{ margin: "1px", fontSize: "3em", fontFamily: "Garamond" }}>Picture Book</h1>
            {/* <img src={avatar} height="40px" width="40px" alt="user-avatar" /> */}
            {/* <h6 style={{ margin: "2px 0px 5px 0px", color: "white" }}>LOGGED IN: {currentUser.email}</h6> */}

          </header>

          <Navigation />
          <h4 style={{ margin: "2px 0px 0px 5px" }}>Logged in: {currentUser?.email} </h4>
        </Container>
      </> : null}

      <Routes>
        <Route path="/"
          element={<LoginMain {...props}
            currentUser={currentUser} />} />

        <Route exact path="/home"
          element={<Home {...props}
            setImageUrls={setImageUrls}
            imageUrls={imageUrls}
            currentUser={currentUser}
            avatar={avatar} />} />

        <Route exact path="/about"
          element={<About {...props}
            setImageUrls={setImageUrls}
            currentUser={currentUser}
            avatar={avatar} />} />

        <Route exact path="/login"
          element={<LoginMain {...props}
            setImageUrls={setImageUrls}
            currentUser={currentUser}
            avatar={avatar} />} />

        <Route exact path="/logingoogle"
          element={<LoginGoogle {...props}
            setImageUrls={setImageUrls}
            currentUser={currentUser}
            avatar={avatar} />} />

        <Route exact path="/billing"
          element={<Billing {...props}
            setImageUrls={setImageUrls}
            currentUser={currentUser}
            avatar={avatar} />} />

        <Route exact path="/crypto"
          element={<Crypto {...props}
            setImageUrls={setImageUrls}
            currentUser={currentUser}
            avatar={avatar} />} />

        <Route exact path="/stories"
          element={<Stories {...props}
            setImageUrls={setImageUrls}
            imageUrls={imageUrls}
            currentUser={currentUser}
            avatar={avatar} />} />

        <Route exact path="/story/:storyid"
          element={<Story {...props}
            setImageUrls={setImageUrls}
            imageUrls={imageUrls}
            currentUser={currentUser}
            avatar={avatar} />} />

        <Route exact path="/profile"
          element={<Profile {...props}
            setImageUrls={setImageUrls}
            imageUrls={imageUrls}
            currentUser={currentUser}
            avatar={avatar} />} />


        <Route path="*" element={<ErrorPage />} />

      </Routes>


    </Router>
  )
}

export default App