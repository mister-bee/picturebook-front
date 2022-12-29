import { useState, useEffect } from 'react'
import "./App.css"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

import Home from "./components/pages/Home"
import Login from "./components/pages/Login"
import About from "./components/pages/About"
import Billing from "./components/pages/Billing"
import Crypto from "./components/pages/Crypto"
import Stories from "./components/pages/Stories"
import Story from "./components/pages/Story"
import Profile from "./components/pages/Profile"
import ErrorPage from "./components/pages/ErrorPage"

const Navigation = () => {
  return (
    <nav>
      <Link to="/home">Home </Link>
      <Link to="/profile">Profile </Link>
      <Link to="/stories">Stories </Link>
      <Link to="/about">About </Link>
    </nav>
  )
}

function App(props) {
  const { db, auth, onAuthStateChanged } = props
  const [currentUser, setCurrentUser] = useState(null)
  const [imageUrls, setImageUrls] = useState([])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user state changed:", user?.uid)
      setCurrentUser(user)
    })
  }, [])

  if (!currentUser) {
    return <Login {...props} />
  }

  return (
    <Router>
      <h4>Logged in:{currentUser?.email}</h4>
      <Navigation />
      <Routes>
        <Route path="/"
          element={<Login {...props}
            currentUser={currentUser} />} />

        <Route path="/home"
          element={<Home {...props}
            setImageUrls={setImageUrls}
            currentUser={currentUser} />} />

        <Route path="/about"
          element={<About {...props}
            setImageUrls={setImageUrls}
            currentUser={currentUser} />} />

        <Route path="/login"
          element={<Login {...props}
            setImageUrls={setImageUrls}
            currentUser={currentUser} />} />

        <Route path="/billing"
          element={<Billing {...props}
            setImageUrls={setImageUrls}
            currentUser={currentUser} />} />

        <Route path="/crypto"
          element={<Crypto {...props}
            setImageUrls={setImageUrls}
            currentUser={currentUser} />} />

        <Route path="/stories"
          element={<Stories {...props}
            setImageUrls={setImageUrls}
            currentUser={currentUser} />} />

        <Route path="/story/:storyid"
          element={<Story {...props}
            setImageUrls={setImageUrls}
            currentUser={currentUser} />} />

        <Route path="/profile"
          element={<Profile {...props}
            setImageUrls={setImageUrls}
            currentUser={currentUser} />}
        />
        <Route path="*" element={<ErrorPage />} />
        {/* <Route path="/landing" element={<Landing />} /> */}
      </Routes>


    </Router>
  )
}

export default App