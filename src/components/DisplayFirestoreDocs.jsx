import React, { useEffect, useState } from 'react'
import { collection, getDocs, addDoc, deleteDoc, setDoc, doc, onSnapshot } from "firebase/firestore"

import {
  deleteObject, ref, getStorage
} from "firebase/storage";

export default function DisplayFirestoreDocs(props) {

  const { db, userId, deleteImgFromDisplay } = props;
  const colRef = collection(db, "users", userId, "stories")
  const [savedStories, setSavedStories] = useState(null)

  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {
      let dbStories = []
      snapshot.docs.forEach((doc) => { dbStories.push({ ...doc.data(), id: doc.id }) })
      // console.log("dbStories", dbStories)
      setSavedStories(dbStories)
    })
  }, [])


  const deleteItem = (item) => {

    deleteImgFromDisplay(item)

    // FIRESTORE
    const docRef = doc(db, 'users', userId, 'stories', item.id)
    deleteDoc(docRef)

    // STORAGE
    const storage = getStorage()
    const desertRef = ref(storage, item.bucketFullPath);

    // storage image
    deleteObject(desertRef).then(() => {
      console.log("🍄🍄🍄🍄 item DELETED for good===>>>", item)

      // Firestore
      deleteDoc(docRef)

    }).catch((err) => {
      console.error(err.message)
    });

    // aldo delete from storage (not backed up storage)
  }

  const savedStoryCollectionDisplay = savedStories && savedStories.map(item => {
    return (<>
      <h3 style={{ margin: "3px", color: "Black", cursor: "pointer" }}>     {item.title} </h3>
      <div
        onClick={() => deleteItem(item)}
        style={{ cursor: "pointer" }}> ❌
      </div>
      <div><img src={item?.imageDownloadURL} alt="ai_image" width="100px" height="100px" /></div>
      <h3 style={{ margin: "5px", color: "grey", cursor: "pointer" }}>     {item.text}</h3>
      <hr />
    </>)
  })


  return <div>
    {savedStories && <>
      <h2 style={{ color: "grey", textAlign: "center" }}>
        {savedStoryCollectionDisplay}</h2>
    </>}
  </div>
}



            // useEffect(() => {
  //   getDocs(colRef).then((snapshot) => {
  //     let dbStories = []
  //     snapshot.docs.forEach((doc) => { dbStories.push({ ...doc.data(), id: doc.id }) })
  //     console.log("dbStories", dbStories)
  //     setSavedStories(dbStories)
  //   }).catch(err => { console.log("err", err) })
  // }, [])
