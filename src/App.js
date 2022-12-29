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
      <Link to="/">Home </Link>
      <Link to="/about">About </Link>
      <Link to="/profile">Profile </Link>
      <Link to="/stories">Stories </Link>
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
      <h3>Logged in:{currentUser?.email}</h3>


      <Navigation />
      <Routes>
        <Route path="/" element={<Login auth={auth} />} />
        <Route path="/home" element={<Home auth={auth} />} />
        <Route path="/about" element={<About auth={auth} setImageUrls={setImageUrls} />} />
        <Route path="/login" element={<Login auth={auth} />} />
        <Route path="/billing" element={<Billing auth={auth} />} />
        <Route path="/crypto" element={<Crypto auth={auth} />} />
        <Route path="/stories" element={<Stories auth={auth} />} />
        <Route path="/story/:storyid" element={<Story auth={auth} />} />
        <Route path="/profile" element={<Profile auth={auth} />} />
        <Route path="*" element={<ErrorPage />} />
        {/* <Route path="/landing" element={<Landing />} /> */}
      </Routes>


    </Router>
  )
}

export default App