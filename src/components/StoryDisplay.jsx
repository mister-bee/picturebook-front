import React from 'react'
import { Button, Container } from 'semantic-ui-react'

export default function StoryDisplay(props) {
  const { responseAI, keeper, clearEntry } = props
  return (<>
    {responseAI[1] ?
      <div>
        <img src={responseAI[1]} alt="ai_image" width="350px" height="350px" />
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