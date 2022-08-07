import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'semantic-ui-react'
import axios from 'axios'
import './App.css';

function App() {
  const [input, setInput] = useState(null)
  const [responseAI, setResponseAI] = useState(null)
  const { register, errors, handleSubmit, watch } = useForm({});

  const onSubmit = formInput => {

    const baseUrl = process.env.REACT_APP_API_URL

    const { userRequest } = formInput
    console.log("userRequest", userRequest)

    const openAiRequest = { userRequest: userRequest };

    axios.post(baseUrl + "openai", openAiRequest)
      .then(response => setResponseAI({ text: response.data }))
      .catch(error => {
        console.error('There was an error 🤬', error);
      });
  };


  console.log("responseAI ===>>>", responseAI)

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
            {...register('userRequest', { required: true, maxLength: 1000 })} />

          <div>
            <br />
            <Button
              onClick={handleSubmit(onSubmit)}
              size="huge"
              type="submit"
              inverted color='blue'
            >Ask JeepyTee
            </Button>

            {responseAI && <> <h2>{responseAI?.text}</h2><Button color="green">Keeper</Button> <Button color="yellow">Toss it!</Button>  </>}
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