import React, { useEffect } from 'react'
import Logout from '../Logout'
import { useNavigate, useLocation } from 'react-router-dom'

function About(props) {
  const { auth, setImageUrls, currentUser } = props
  let navigate = useNavigate()
  let location = useLocation()

  useEffect(() => {
    if (!currentUser) { return navigate("/") }
  }, [])

  return (
    <>
      <h1>About Page</h1>
      <h2>What is AI?</h2>
      <h2>What can I do with these stories</h2>
      <Logout {...props} />
    </>
  )
}

export default About
