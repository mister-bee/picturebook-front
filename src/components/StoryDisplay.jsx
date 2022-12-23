import React from 'react'
import { Button, Container } from 'semantic-ui-react'

export default function StoryDisplay(props) {
  const { responseAI, keeper, clearEntry, newPicture } = props

  //console.log("URL", responseAI && responseAI[1])
  return (<>
    {responseAI[1] ?
      <div>
        <img
          src={responseAI[1]}
          onClick={newPicture}
          alt="ai_image"
          width="350px"
          height="350px" />
      </div> :
      null}

    <Container text>
      <h2>{responseAI[2]}</h2>
    </Container>

    <Button onClick={keeper} color="green">Keeper</Button>
    <Button onClick={clearEntry} color="yellow">Clear Entry</Button>
    <br />
  </>
  )
}
