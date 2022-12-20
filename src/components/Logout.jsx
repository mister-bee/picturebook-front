import React from 'react'
import { Button } from 'semantic-ui-react'
import { signOut } from "firebase/auth";

export default function Logout(props) {
  const { auth, color = "black" } = props
  return (
    <Button size="mini" color={color} onClick={() => signOut(auth).then(() => console.log("SIGNOUT").catch((err => console.error(err.message))))} >Signout</Button>

  )
}
