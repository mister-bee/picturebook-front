import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'semantic-ui-react'
import axios from 'axios'
import './App.css';

import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore"


import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid'
import Lottie from "lottie-react";
import 'react-toastify/dist/ReactToastify.css';
import { NameForm } from './components/LoginEmail';
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

  const testUserId = "abc123"
  //const folderPrefix = 'stories_USER_' + currentUser?.uid
  //const folderPrefix = 'stories_USER_' + currentUser?.uid
  // console.log("🌹===> folderPrefix", folderPrefix)

  //const colRef = collection(db, folderPrefix)
  //const colRef = collection(db, "stories")

  // users collection, userID, stories-sub collection, storyId
  // const colRef = collection(db, "users", "userID", "stories", "storyId")
  const thisStoryId = uuidv4()

  //const colRef = collection(db, "users", currentUser?.uid, "stories")

  const colRef = collection(db, "users", testUserId, "stories2")


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user state changed:", user)
      setCurrentUser(user)
    })
  }, [])


  const onSubmit = formInput => {
    const baseUrl = process.env.REACT_APP_API_URL
    const { userRequest, temperature } = formInput
    const openAiRequest = { userRequest, temperature: parseFloat(temperature), userId: currentUser?.uid };

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
    const newStory = {
      prompt: promptUsed,
      temperature,
      image: responseAI[1], // NEED TO UPDATE THIS TO GOOGLE URL 
      text: responseAI[2],
      meta: "meta data tbd",
      title: "COMING SOON",
      id: thisStoryId, // fix
      userId: currentUser.uid,
      userDisplayName: currentUser?.displayName,
      userEmail: currentUser?.email
    }

    addDoc(colRef, newStory).then((result) => {
      console.log(result).catch((err) => {
        console.error(err.message)
      })
    })

    const updatedStoryCollection = currentStoryCollection ? [...currentStoryCollection] : []

    updatedStoryCollection.push(newStory)
    setCurrentStoryCollection(updatedStoryCollection)
    setResponseAI(null)
  }

  const clearEntry = () => {
    setResponseAI(null)
    reset()
  }

  const deleteItem = (item) => {
    const storyCollection = [...currentStoryCollection]
    const filteredInput = storyCollection.filter(i => i.id !== item.id)
    setCurrentStoryCollection(filteredInput)
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

        <form onSubmit={e => e.preventDefault()}>
          <textarea
            type="text"
            placeholder="GPT-3 question..."
            rows="8" cols="80"
            {...register('userRequest', { required: true, maxLength: 1000 })} />
          <br />

          {isLoading
            ? <Lottie animationData={loadingAnimation} loop={true} style={robotStyle} />

            : <><Button
              onClick={handleSubmit(onSubmit)}
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

        <DisplayFirestoreDocs
          db={db}
          getDocs={getDocs}
          colRef={colRef}
          doc={doc}
          deleteDoc={deleteDoc}
          onSnapshot={onSnapshot} />

      </body>
    </div >

    : <NameForm auth={auth} />
}

export default App;


