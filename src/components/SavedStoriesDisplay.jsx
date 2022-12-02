import React from 'react'

export default function SavedStoriesDisplay(props) {
  const { currentStoryCollection, deleteItem } = props

  const currentStoryCollectionDisplay = currentStoryCollection.map(item => {
    return (<>
      <div>
        <img src={item?.image} alt="ai_image" width="100px" height="100px" />
      </div>
      <h3 style={{ margin: "5px", color: "grey", cursor: "pointer" }}>     {item.text}
        <div
          onClick={() => deleteItem(item)}
          style={{ cursor: "pointer" }}> ❌
        </div>
      </h3>
      <hr />
    </>)
  })

  return <>
    <h1>Saved Stories</h1>
    <div
      style={{
        width: "60%",
        height: "auto",
        margin: "0 auto",
        position: "relative"
      }}>

      <div
        style={{
          textAlign: "left",
          width: "100%",
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: "black"
        }}>

        <h2 style={{ color: "grey", textAlign: "center" }}>
          {currentStoryCollectionDisplay}
        </h2>
      </div>
    </div>
  </>


}




{/* <img src={downloadPdf} height="30" alt="pdf_button" onClick={() => makePDF(progressInputDisplay)} /> */ }