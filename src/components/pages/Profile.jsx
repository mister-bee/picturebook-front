import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function Profile() {
  let navigate = useNavigate()
  let location = useLocation()
  const { state } = location || {}
  const { username } = state || {}

  useEffect(() => {
    if (!username) {
      return navigate("/home")
    }
  }, [])

  return (
    <>
      <h1>Profile of: {username}</h1>
    </>
  )
}

export default Profile