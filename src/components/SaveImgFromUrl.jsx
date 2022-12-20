import React, { useState } from 'react';
import { firebase } from './firebase';

function SaveImg() {
  const [imageUrl, setImageUrl] = useState('');

  function handleImageUrlChange(e) {
    setImageUrl(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!imageUrl) {
      return;
    }

    const imageRef = firebase.storage().refFromURL(imageUrl);
    imageRef.getMetadata().then((metadata) => {
      firebase
        .firestore()
        .collection('images')
        .add({ url: imageUrl, metadata });
    });

    setImageUrl('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter image URL"
        onChange={handleImageUrlChange}
        value={imageUrl}
      />
      <button type="submit">Save Image</button>
    </form>
  );
}
