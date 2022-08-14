import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'semantic-ui-react'
import axios from 'axios'
import './App.css';
import { ToastContainer, toast } from 'react-toastify';

import { v4 as uuidv4 } from 'uuid'

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [progressInput, setProgressInput] = useState([])
  const [responseAI, setResponseAI] = useState(null)
  const { register, errors, handleSubmit, watch } = useForm({});
  const notify = (message) => toast(message);


  const onSubmit = formInput => {
    const baseUrl = process.env.REACT_APP_API_URL
    const { userRequest } = formInput
    // console.log("userRequest", userRequest)
    const openAiRequest = { userRequest: userRequest };
    axios.post(baseUrl + "openai", openAiRequest)
      .then(response => setResponseAI(response.data))
      .catch(error => {
        // console.error('There was an error 🤬', error?.message);
        notify("🙄 " + error?.message)
      });
  };

  const keeper = () => {
    const newItem = {
      text: responseAI,
      meta: "",
      id: uuidv4()
    }
    console.log("newItem", newItem)
    const newProgressiveInput = [...progressInput]
    newProgressiveInput.push(newItem)

    // console.log(responseAI)
    setProgressInput(newProgressiveInput)
    // add tuple to array [text, meta]
  }

  const progressInputDisplay = progressInput && progressInput.map(item => <h6>{item.text}</h6>)

  console.log("progressInput ===>>>", progressInput)

  return (
    <div className="App">
      <ToastContainer />
      <header className="App-header">
        <h1>The Super Knowledge Machine</h1>
        <p>Get Design from OpenAi</p>
      </header>

      <body>
        <br />
        <h2>Type your question below:</h2>
        <form onSubmit={e => e.preventDefault()}>
          <textarea
            type="text"
            placeholder="GPT-3 question..."
            rows="8" cols="80"
            {...register('userRequest', { required: true, maxLength: 1000 })} />
          <div>
            <br />
            <Button
              onClick={handleSubmit(onSubmit)}
              size="huge"
              type="submit"
              inverted color='blue'
            >Ask GeepyTee
            </Button>

            {responseAI &&
              <>
                <h2>{responseAI}</h2>
                <Button onClick={keeper} color="green">Keeper</Button>
                <Button color="yellow">Toss it!</Button>
              </>
            }
            <br />

            {progressInput && progressInputDisplay}



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