import React from 'react'
import Logout from '../Logout'
import { useNavigate, useLocation } from 'react-router-dom'

function Home(props) {
  const { auth, setImageUrls, currentUser } = props

  let navigate = useNavigate()
  if (!currentUser) {
    return navigate("/")
  }

  return (
    <>
      <h1>Home Page</h1>
      <h2>Main page to generate stories</h2>
      <h2>Small Grid of thumbnails</h2>
      <Logout {...props} />
    </>
  )
}

export default Home
