import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'semantic-ui-react'
import axios from 'axios'
import './App.css';

import { collection, getDocs, addDoc, deleteDoc, setDoc, doc, onSnapshot } from "firebase/firestore"
import { getStorage, ref, getDownloadURL } from "firebase/storage"

import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid'
import Lottie from "lottie-react";
import 'react-toastify/dist/ReactToastify.css';
import { LoginWithEmail } from './components/LoginEmail';
import loadingAnimation from './images/loading-animation.json';
import animatedRobot from './images/99973-little-power-robot.json';
import StoryDisplay from './components/StoryDisplay';
import DisplayFirestoreDocs from './components/DisplayFirestoreDocs';
import Logout from './components/Logout';
import DisplayFirestoreImages from './components/DisplayFirestoreImages';

function App(props) {
  const [responseAI, setResponseAI] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)

  const [currentStoryCollection, setCurrentStoryCollection] = useState(null)
  const [promptUsed, setPromptUsed] = useState(null)
  const [temperature, setTemperature] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, reset } = useForm({}); // errors
  const notify = (message) => toast(message);
  const robotStyle = { height: 200 };

  const { db, auth, onAuthStateChanged } = props

  const thisStoryId = uuidv4() // add to state on useEffect?

  console.log("thisStoryId", thisStoryId)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user state changed:", user)
      setCurrentUser(user)
    })
  }, [])

  // add "real book suggestions" to notes
  // 
  const getImageUrl = (response) => {
    const storage = getStorage();
    console.log("GET URL HERE", response.data)
    const prefix = "images/USERSET_A_" + currentUser.uid + "/"
    // thisStoryId - from state
  }

  const onStoryRequestSubmit = formInput => {
    const baseUrl = process.env.REACT_APP_API_URL
    const { userRequest, temperature } = formInput


    const openAiRequest = { userRequest, temperature: parseFloat(temperature), userId: currentUser?.uid };

    setPromptUsed(userRequest)
    setTemperature(parseFloat(temperature))
    setIsLoading(true)

    axios.post(baseUrl + "openai", openAiRequest)

      .then((response) => {

        setResponseAI(response.data) // need to integrate url
        setIsLoading(false)

      })
      .catch(error => {
        setIsLoading(false)
        notify("🙄 " + error?.message)
      });
  };

  const keeper = () => {
    if (!currentUser) return null

    const newStory = {
      prompt: promptUsed,
      temperature,
      image: responseAI[1], // NEED TO UPDATE THIS TO GOOGLE URL 
      bucketImg: "coming-soon",
      text: responseAI[2],
      meta: "meta data tbd",
      title: "COMING SOON",
      storyId: thisStoryId,
      userId: currentUser.uid,
      userDisplayName: currentUser?.displayName,
      userEmail: currentUser?.email
    }

    // Create new story with id as title
    setDoc(doc(db, "users", currentUser.uid, "stories", thisStoryId), newStory)

    const updatedStoryCollection = currentStoryCollection ? [...currentStoryCollection] : []

    updatedStoryCollection.push(newStory)
    setCurrentStoryCollection(updatedStoryCollection)
    setResponseAI(null)
  }

  const clearEntry = () => {
    setResponseAI(null)
    reset()
  }

  const newPicture = () => {
    console.log("NEW PICTURE REQUEST")
  }

  const newStory = () => {
    console.log("NEW STORY REQUEST")
  }

  return currentUser ?

    <div className="App">
      <ToastContainer />
      <header className="App-header">
        <h1 style={{ margin: "1px", fontSize: "3em", fontFamily: "Garamond" }}>Picture Book</h1>
        <h5>LOGGED IN: {currentUser.email}</h5>
        <Logout color="blue" auth={auth} />
      </header>

      <body>
        <DisplayFirestoreImages userId={currentUser.uid} />
        <br />
        <Lottie
          animationData={animatedRobot}
          loop={true}
          style={robotStyle} />
        <h2>Write a story about...</h2>

        <form onStoryRequestSubmit={e => e.preventDefault()}>
          <textarea
            type="text"
            placeholder="GPT-3 question..."
            rows="8" cols="80"
            {...register('userRequest', { required: true, maxLength: 1000 })} />
          <br />

          {isLoading
            ? <Lottie animationData={loadingAnimation} loop={true} style={robotStyle} />

            : <><Button
              onClick={handleSubmit(onStoryRequestSubmit)}
              size="huge"
              type="submit"
              inverted color='blue'>Write it!
            </Button><br /></>}

          <br />
        </form>

        {responseAI &&
          <StoryDisplay
            responseAI={responseAI}
            keeper={keeper}
            clearEntry={clearEntry}
            newPicture={newPicture}
          />}

        {currentUser?.uid && <DisplayFirestoreDocs
          db={db}
          userId={currentUser?.uid} />}

      </body>
    </div >

    : <LoginWithEmail auth={auth} db={db} />
}

export default App;


// addDoc(colRef, newStory).then((result) => {
//   console.log(result).catch((err) => {
//     console.error(err.message)
//   })
// })

// const deleteItem = (item) => {
//   const storyCollection = [...currentStoryCollection]
//   const filteredInput = storyCollection.filter(i => i.id !== item.id)
//   setCurrentStoryCollection(filteredInput)
// }


//   Option #1 : create new story with random title
// addDoc(colRefStories, newStory).then((result) => {
//   console.log(result).catch((err) => {
//     console.error(err.message)
//   })
// })
