import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Home() {
  let navigate = useNavigate()
  let { username = "Jerry" } = useParams()
  return (<>
    <h1>Home</h1>
    <button onClick={() => navigate("/profile",
      { state: { username } }
    )}>Profile</button>
  </>
  )
}

export default Home