import React from 'react'
import Logout from '../Logout'
import { useNavigate } from 'react-router-dom'
import DisplayFirestoreDocs from '../../components/DisplayFirestoreDocs';
import DisplayFirestoreImages from '../../components/DisplayFirestoreImages';

function Stories(props) {
  const { currentUser, db, imageUrls, setImageUrls } = props
  let navigate = useNavigate()

  const deleteImgFromDisplay = (item) => {
    const newUrlArray = imageUrls.filter(url => url !== item.imageDownloadURL)
    setImageUrls(newUrlArray)
  }

  if (!currentUser) return navigate("/")

  return (
    <>
      <h1 style={{}}>Stories Page</h1>

      <DisplayFirestoreImages
        userId={currentUser.uid}
        imageUrls={imageUrls}
        setImageUrls={setImageUrls}
      />

      <DisplayFirestoreDocs
        deleteImgFromDisplay={deleteImgFromDisplay}
        db={db}
        userId={currentUser?.uid}
      />

      <Logout {...props} />
    </>
  )
}

export default Stories
