import React from 'react'
import { Button } from 'semantic-ui-react'
import { signOut } from "firebase/auth";

export default function Logout(props) {
  const { auth, color = "black", setImageUrls } = props

  const handleClick = () => {
    signOut(auth).then(() => console.log("SIGNOUT")).catch((err) => console.error(err.message))
    setImageUrls([])
  }

  console.log("signOut", signOut)
  console.log("auth", auth)

  return (
    <Button
      size="mini"
      color={color}
      onClick={handleClick}>
      Signout
    </Button>
  )
}
