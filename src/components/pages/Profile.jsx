import React, { useEffect } from 'react'
import Logout from '../Logout'
import { useNavigate } from 'react-router-dom'

function Profile(props) {
  const { auth, setImageUrls, currentUser } = props

  let navigate = useNavigate()
  if (!currentUser) {
    return navigate("/")
  }

  return (
    <>
      <h1>Profile of: {currentUser?.email}</h1>
      <h2>Avatars are randomly generated. You can change it by clicking here until you find one your like.</h2>
      <Logout {...props} />
    </>
  )
}

export default Profile

