import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'semantic-ui-react'
import axios from 'axios'
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import 'react-toastify/dist/ReactToastify.css';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function App() {
  const [responseAI, setResponseAI] = useState(null)
  const [progressInput, setProgressInput] = useState([])
  const [promptUsed, setPromptUsed] = useState(null)
  const { register, handleSubmit, reset } = useForm({}); // errors
  const notify = (message) => toast(message);


  const onSubmit = formInput => {
    const baseUrl = process.env.REACT_APP_API_URL
    const { userRequest } = formInput
    const openAiRequest = { userRequest: userRequest };
    setPromptUsed(userRequest)

    axios.post(baseUrl + "openai", openAiRequest)
      .then(response => setResponseAI(response.data))
      .catch(error => {
        notify("🙄 " + error?.message)
      });
  };

  const keeper = () => {
    const newItem = {
      prompt: promptUsed,
      text: responseAI,
      meta: "",
      id: uuidv4()
    }

    const newProgressiveInput = [...progressInput]
    newProgressiveInput.push(newItem)
    setProgressInput(newProgressiveInput)
    setResponseAI(null)
    reset()
  }


  const tossIt = () => {

    setResponseAI(null)
    reset()
  }

  const deleteItem = (item) => {
    console.log(item)
  }

  const makePDF = () => {

    const printableInput = progressInput.map(item => "PROMPT: " + item.prompt + "\nRESPONSE: " + item.text + "\n\n")

    const docDefinition = {

      content: [
        { text: "The Geeps Super Knowlegde Machine Results: ", bold: true },
        { text: moment().format('MMMM Do YYYY, h:mm:ss a') },
        { text: "  ", fontSize: 10 },
        { text: printableInput, fontSize: 10, bold: true },
        { text: "  ", fontSize: 10 }]
    }

    pdfMake.createPdf(docDefinition).open(); // .download();

  }

  const progressInputDisplay = progressInput && progressInput.map(item => {
    return (
      <h3 style={{ margin: "5px", color: "blue", cursor: "pointer" }}
        onClick={() => deleteItem(item)}>
        {item.text}
      </h3>)
  })


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
                <Button onClick={tossIt} color="yellow">Toss it!</Button>
              </>
            }
            <br />

            {progressInput &&
              <>
                {progressInputDisplay}
                <Button onClick={makePDF} inverted color="green">Save PDF</Button>
              </>}

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