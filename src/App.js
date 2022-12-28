import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Home from "./components/pages/Home"
import Login from "./components/pages/Login"
import About from "./components/pages/About"
import Billing from "./components/pages/Billing"
import Crypto from "./components/pages/Crypto"
import Stories from "./components/pages/Stories"
import Profile from "./components/pages/Profile"
import ErrorPage from "./components/pages/ErrorPage"


function App(props) {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/crypto" element={<Crypto />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  )
}

export default App