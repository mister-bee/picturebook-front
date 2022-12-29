import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Story() {
  let navigate = useNavigate()
  let { storyId = "98289ue82jqwe" } = useParams()
  return (<>
    <h1>Story Display Template</h1>
    <h2>Text</h2>
    <h2>Link for Google Classroom / QR code</h2>
    <button>DELETE/ETC {storyId}</button>
  </>
  )
}

export default Story