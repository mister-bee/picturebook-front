import { useState, useRef } from 'react'
import './App.css';
import { Button } from 'semantic-ui-react'
import { useForm } from 'react-hook-form'
const { Configuration, OpenAIApi } = require('openai')

function App() {
  const [input, setInput] = useState(null)
  const [responseAI, setResponseAI] = useState(null)


  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_KEY,
  });


  const openai = new OpenAIApi(configuration);

  const { register, errors, handleSubmit, watch } = useForm({});

  const onSubmit = userInput => {

    const { question } = userInput

    openai.createCompletion({
      model: "text-davinci-002",
      prompt: question,
      temperature: 0.5,
      max_tokens: 300,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
      stop: ["You:"],
    })
      .then((response) => {
        setResponseAI({
          heading: "AI Product Description Here.. add this to a google sheet /PDF",
          newResponse: response.data.choices[0].text
        })
      })

  };

  console.log("responseAI", responseAI)

  return (
    <div className="App">
      <header className="App-header">
        <h1>The Super Knowledge Machine</h1>
      </header>

      <body>
        <br />
        <h2>Type your question below:</h2>
        <form onSubmit={e => e.preventDefault()}>
          <textarea
            type="text"
            placeholder="GPT-3 question..."
            rows="15" cols="100"
            {...register('question', { required: true, maxLength: 1000 })} />

          <div>
            <br />
            <Button
              onClick={handleSubmit(onSubmit)}
              size="huge"
              type="submit"
              inverted color='blue'
            >Ask JeepyTee
            </Button>

            <h2>{JSON.stringify(responseAI?.newResponse)}</h2>

            {responseAI && <> <Button color="green">Keeper</Button> <Button color="yellow">Toss it!</Button>  </>}
            <br />
            <br />
            <br />
          </div>
        </form>
      </body>
    </div>
  );
}

export default App;




