import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'semantic-ui-react'
import axios from 'axios'
import './App.css';

import { setDoc, doc } from "firebase/firestore"
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
import DisplayFirestoreImages from './components/DisplayFirestoreImages';
import Logout from './components/Logout';

function App(props) {
  const [currentUser, setCurrentUser] = useState(null)
  const [responseAI, setResponseAI] = useState(null)
  const [newStoryId, setNewStoryId] = useState(null)
  const [currentStoryCollection, setCurrentStoryCollection] = useState(null)
  const [promptUsed, setPromptUsed] = useState(null)
  const [temperature, setTemperature] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, reset } = useForm({}); // errors
  const notify = (message) => toast(message);
  const { db, auth, onAuthStateChanged } = props
  const robotStyle = { height: 200 };

  const storage = getStorage();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user state changed:", user)
      setCurrentUser(user)
    })
  }, [])

  useEffect(() => {
    setNewStoryId(uuidv4())
  }, [])

  const onStoryRequestSubmit = formInput => {
    const baseUrl = process.env.REACT_APP_API_URL
    const { userRequest, temperature } = formInput

    // const storyId = uuidv4()
    // create storyId

    const openAiRequest = { userRequest, temperature: parseFloat(temperature), userId: currentUser?.uid, storyIdTitle: newStoryId };

    setPromptUsed(userRequest)
    setTemperature(parseFloat(temperature))
    setIsLoading(true)

    axios.post(baseUrl + "openai", openAiRequest)
      .then((response) => {
        setResponseAI(response.data)
        setIsLoading(false)
      })
      .catch(error => {
        setIsLoading(false)
        notify("🙄 " + error?.message)
      });
  };

  const keeper = () => {
    if (!currentUser) return null

    let newStory = {
      userId: currentUser.uid,
      userDisplayName: currentUser?.displayName,
      userEmail: currentUser?.email,
      image: responseAI[1], // Use
      title: "COMING SOON",
      text: responseAI[2],
      storyId: newStoryId,
      prompt: promptUsed,
      temperature,
    }

    const imageFilePath = "images/USERSET_A_" + currentUser.uid + "/" + newStoryId

    getDownloadURL(ref(storage, imageFilePath))
      .then((downloadURL) => {
        newStory.imageDownloadURL = downloadURL
        return
      })
      .then(() => {
        return ref(storage, imageFilePath)

      }).then((imageDisplayURL) => {
        newStory.bucketFullPath = imageDisplayURL.fullPath
      })

      .then(() => {

        // Save story to firestore 
        setDoc(doc(db, "users", currentUser.uid, "stories", newStoryId), newStory)

          .then(() => {
            // update local collection display
            const updatedStoryCollection = currentStoryCollection ? [...currentStoryCollection] : []
            updatedStoryCollection.push(newStory)
            setCurrentStoryCollection(updatedStoryCollection)
            setResponseAI(null)
            setNewStoryId(uuidv4())
          })

          .catch((err) => { console.error(err.message) })
      })
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
        <h5>{newStoryId}</h5>
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
