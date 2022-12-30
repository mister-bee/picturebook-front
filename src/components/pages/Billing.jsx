import React from 'react'
import Logout from '../Logout'
import { useNavigate } from 'react-router-dom'

function Billing(props) {
  const { auth, setImageUrls, currentUser } = props

  let navigate = useNavigate()
  if (!currentUser) {
    return navigate("/")
  }

  return (<>
    <h1>Billing</h1>
    <Logout {...props} />
  </>
  )
}

export default Billing