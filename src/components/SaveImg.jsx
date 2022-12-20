import React, { useState } from 'react';
import { firebase } from './firebase';

function App() {
  const [image, setImage] = useState(null);

  function handleImageChange(e) {
    setImage(e.target.files[0]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!image) {
      return;
    }

    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(`images/${image.name}`);
    imageRef.put(image).then(() => {
      imageRef.getDownloadURL().then((url) => {
        firebase
          .firestore()
          .collection('images')
          .add({ url });
      });
    });

    setImage(null);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleImageChange} />
      <button type="submit">Save Image</button>
    </form>
  );
}
