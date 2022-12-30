import { useState, useEffect } from 'react'
import "./App.css"
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from "react-router-dom"

import Home from "./components/pages/Home"
import Login from "./components/pages/Login"
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
      console.log("user state changed:", user?.uid)
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
        <h4>🍏 Logged in:{currentUser?.email}🍏 </h4>
        <Navigation /> </> : null}

      <Routes>
        <Route path="/"
          element={<Login {...props}
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
          element={<Login {...props}
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