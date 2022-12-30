import React from 'react'
import Logout from '../Logout'
import { useNavigate } from 'react-router-dom'

function Stories(props) {
  const { auth, setImageUrls, currentUser } = props


  let navigate = useNavigate()
  if (!currentUser) {
    return navigate("/")
  }

  return (
    <>
      <h1>Stories Page</h1>
      <h2>All stories</h2>
      <h2>THUMBNAIL / Title / Date / Exp / Link to story page</h2>
      <Logout {...props} />
    </>
  )
}

export default Stories
