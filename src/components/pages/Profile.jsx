import React, { useEffect } from 'react'
import Logout from '../Logout'
import { useNavigate, useLocation } from 'react-router-dom'

function Profile(props) {
  const { auth, setImageUrls, currentUser } = props
  let navigate = useNavigate()
  let location = useLocation()

  useEffect(() => {
    if (!currentUser) { return navigate("/") }
  }, [])

  return (
    <>
      <h1>Profile of: {currentUser?.email}</h1>
      <Logout {...props} />
    </>
  )
}

export default Profile

