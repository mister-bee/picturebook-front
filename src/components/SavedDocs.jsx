import React, { useEffect, useState } from 'react'
// import { getDocs } from "firebase/firestore"

export default function SavedDocs(props) {

  const { colRef, getDocs } = props;

  const [savedStories, setSavedStories] = useState(null)

  useEffect(() => {
    getDocs(colRef).then((snapshot) => {
      let dbStories = []
      snapshot.docs.forEach((doc) => { dbStories.push({ ...doc.data(), id: doc.id }) })
      console.log("dbStories", dbStories)
      setSavedStories(dbStories)

    }).catch(err => {
      console.log("err", err)
    })


  }, [])


  // const { currentStoryCollection, deleteItem } = props

  const savedStoryCollectionDisplay = savedStories && savedStories.map(item => {
    return (<>

      <h3 style={{ margin: "3px", color: "Black", cursor: "pointer" }}>     {item.title}
        {/* <div
          // onClick={() => deleteItem(item)}
          style={{ cursor: "pointer" }}> ❌
        </div> */}
      </h3>
      <div>
        <img src={item?.image} alt="ai_image" width="100px" height="100px" />
      </div>
      <h3 style={{ margin: "5px", color: "grey", cursor: "pointer" }}>     {item.text}
        {/* <div
          // onClick={() => deleteItem(item)}
          style={{ cursor: "pointer" }}> ❌
        </div> */}
      </h3>
      <hr />
    </>)
  })

  console.log("savedStories", savedStories)

  return <div>
    <h1>PREVIOUS STORIES Stories</h1>

    {savedStories && <>
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

      <h2 style={{ color: "grey", textAlign: "center" }}>
        {savedStoryCollectionDisplay}</h2>

      {/* </div> </div> */}

    </>}
  </div>
}