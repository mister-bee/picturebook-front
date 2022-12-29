import React from 'react'
import Logout from '../Logout'
function About(props) {
  const { auth, setImageUrls } = props
  return (
    <>
      <h1>About</h1>
      <Logout auth={auth} color="black" setImageUrls={setImageUrls} />
    </>
  )
}

export default About
