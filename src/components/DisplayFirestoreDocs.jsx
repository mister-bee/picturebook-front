import React, { useEffect, useState } from 'react'

export default function DisplayFirestoreDocs(props) {

  const { colRef, getDocs, db, doc, deleteDoc, onSnapshot } = props;
  const [savedStories, setSavedStories] = useState(null)

  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {
      let dbStories = []
      snapshot.docs.forEach((doc) => { dbStories.push({ ...doc.data(), id: doc.id }) })
      console.log("dbStories", dbStories)
      setSavedStories(dbStories)
    })
  }, [])

  useEffect(() => {
    getDocs(colRef).then((snapshot) => {
      let dbStories = []
      snapshot.docs.forEach((doc) => { dbStories.push({ ...doc.data(), id: doc.id }) })
      console.log("dbStories", dbStories)
      setSavedStories(dbStories)
    }).catch(err => { console.log("err", err) })
  }, [])

  const deleteItem = (item) => {
    console.log("🍄🍄🍄🍄 item DELETED===>>>", item)
    const docRef = doc(db, 'stories', item.id)
    deleteDoc(docRef)
  }

  const savedStoryCollectionDisplay = savedStories && savedStories.map(item => {
    return (<>
      <h3 style={{ margin: "3px", color: "Black", cursor: "pointer" }}>     {item.title} </h3>
      <div><img src={item?.image} alt="ai_image" width="100px" height="100px" /></div>
      <h3 style={{ margin: "5px", color: "grey", cursor: "pointer" }}>     {item.text}</h3>
      <div
        onClick={() => deleteItem(item)}
        style={{ cursor: "pointer" }}> ❌
      </div>
      <hr />
    </>)
  })

  console.log("savedStories", savedStories)

  return <div>
    {savedStories && <>
      <h2 style={{ color: "grey", textAlign: "center" }}>
        {savedStoryCollectionDisplay}</h2>
    </>}
  </div>
}


{/*   
    <div
      style={{
        width: "60%",
        height: "auto",
        margin: "0 auto",
        position: "relative"}}>

      <div
        style={{
          textAlign: "left",
          width: "100%",
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: "black"}}> */}