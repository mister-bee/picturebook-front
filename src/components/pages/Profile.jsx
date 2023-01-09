import React, { useEffect } from 'react'
import Logout from '../Logout'
import { useNavigate } from 'react-router-dom'

function Profile(props) {
  const { auth, setImageUrls, currentUser } = props

  let navigate = useNavigate()

  if (!currentUser) return navigate("/")

  return (
    <>
      <h2 className="center">Profile of: {currentUser?.email}</h2>
      <h1>AVATAR</h1>
    </>
  )
}

export default Profile

