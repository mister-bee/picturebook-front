import React from 'react'
import { useNavigate } from 'react-router-dom'
import Logout from '../Logout'

function Profile(props) {
  const { currentUser, auth, setImageUrls } = props

  let navigate = useNavigate()

  if (!currentUser) return navigate("/")

  return (
    <>
      <h2 className="center">Profile of: {currentUser?.email}</h2>
      <h1>AVATAR</h1>
      <h6>Credits</h6>
      <h6>Total Stories & Days left on server (unless subscribed)</h6>
      <Logout color="blue"
        auth={auth}
        setImageUrls={setImageUrls}
      />
    </>
  )
}

export default Profile

