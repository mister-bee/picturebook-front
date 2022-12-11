import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'semantic-ui-react'
import axios from 'axios'
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid'
import Lottie from "lottie-react";
import 'react-toastify/dist/ReactToastify.css';
import loadingAnimation from './images/loading-animation.json';
import animatedRobot from './images/99973-little-power-robot.json';
import SavedStoriesDisplay from './components/SavedStoriesDisplay';
import StoryDisplay from './components/StoryDisplay';

function App() {
  const [responseAI, setResponseAI] = useState(null)
  const [currentStoryCollection, setCurrentStoryCollection] = useState(null)
  const [promptUsed, setPromptUsed] = useState(null)
  const [temperature, setTemperature] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, reset } = useForm({}); // errors
  const notify = (message) => toast(message);

  const onSubmit = formInput => {
    const baseUrl = process.env.REACT_APP_API_URL
    const { userRequest, temperature } = formInput
    const openAiRequest = { userRequest, temperature: parseFloat(temperature) };

    setPromptUsed(userRequest)
    setTemperature(parseFloat(temperature))
    setIsLoading(true)

    axios.post(baseUrl + "openai", openAiRequest)
      .then(response => {
        setResponseAI(response.data)
        setIsLoading(false)
      })
      .catch(error => {
        setIsLoading(false)
        notify("🙄 " + error?.message)
      });
  };

  const keeper = () => {
    const newItem = {
      prompt: promptUsed,
      temperature,
      image: responseAI[1],
      text: responseAI[2],
      meta: "meta data tbd",
      id: uuidv4()
    }

    const updatedStoryCollection = currentStoryCollection ? [...currentStoryCollection] : []
    updatedStoryCollection.push(newItem)
    setCurrentStoryCollection(updatedStoryCollection)
    setResponseAI(null)
  }

  const clearEntry = () => {
    setResponseAI(null)
    reset()
  }

  const robotStyle = { height: 200 };

  const deleteItem = (item) => {
    const storyCollection = [...currentStoryCollection]
    const filteredInput = storyCollection.filter(i => i.id !== item.id)
    setCurrentStoryCollection(filteredInput)
  }

  return (
    <div className="App">

      <ToastContainer />
      <header className="App-header">
        <h1 style={{ margin: "1px", fontSize: "2em", fontFamily: "Garamond" }}>Picture Book</h1>
      </header>
      <body>
        <br />
        <Lottie
          animationData={animatedRobot}
          loop={true}
          style={robotStyle} />
        <h2>Write a story about...</h2>
        <form onSubmit={e => e.preventDefault()}>
          <textarea
            type="text"
            placeholder="GPT-3 question..."
            rows="8" cols="80"
            {...register('userRequest', { required: true, maxLength: 1000 })} />
          {/* 
          <div>
            <br />
            <div>
              <label>Enter the 'temperature' between 0 and 1. The closer to 1 the more chances the AI will take.</label>
            </div>
            <input
              label="Temperature"
              type="number"
              step={.01}
              name="temperature"
              min="0" max="1"
              {...register('temperature', { required: true })} />
          </div> */}

          {/* <div>
            <br />
            <div>
              <label>Enter max tokens. Default is 200.</label>
            </div>
            <input
              label="Max_tokens"
              type="number"
              step={10}
              name="max_tokens"
              min="100" max="500"
              default="200"
              {...register('max_tokens', { required: true })} />
          </div> */}

          <br />

          {isLoading
            ?
            <Lottie animationData={loadingAnimation} loop={true} style={robotStyle} />
            : <Button
              onClick={handleSubmit(onSubmit)}
              size="huge"
              type="submit"
              inverted color='blue'>Write it!
            </Button>
          }

          <br />
        </form>
        <br />

        {responseAI &&
          <StoryDisplay
            responseAI={responseAI}
            keeper={keeper}
            clearEntry={clearEntry}
          />}

        {currentStoryCollection?.length > 0 ? <SavedStoriesDisplay deleteItem={deleteItem} currentStoryCollection={currentStoryCollection} /> : null}

      </body>
    </div >
  );
}

export default App;






  // const makePDF = () => {
  //   const printableInput = currentStoryCollection.map(item => "PROMPT: " + item.prompt + "\nTEMPERATURE: " + item.temperature + "\nRESPONSE:" + item.text + "\n\n")

  //   const docDefinition = {
  //     content: [
  //       { text: "The Geeps Super Knowledge Machine Results: ", bold: true },
  //       { text: moment().format('MMMM Do YYYY, h:mm:ss a') },
  //       { text: "\n", fontSize: 10 },
  //       { text: printableInput, fontSize: 10, bold: true },
  //       { text: "  ", fontSize: 10 }]
  //   }

  //   pdfMake.createPdf(docDefinition).download("Geeps_Keeper.pdf").open();

  // }

