import React, { useEffect } from 'react'
import Logout from '../Logout'
import { useNavigate, useLocation } from 'react-router-dom'

function Home(props) {
  const { auth, setImageUrls, currentUser } = props
  let navigate = useNavigate()
  let location = useLocation()

  useEffect(() => {
    if (!currentUser) {
      console.log("🍇🍇🍇🍇🍇🍇---------- -🍇🍇🍇🍇🍇🍇")
      return navigate("/")
    }
  }, [])

  console.log("--->currentUser?.email", currentUser?.email)

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
