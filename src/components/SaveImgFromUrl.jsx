import React, { useState } from 'react';
import { getStorage, ref, uploadBytes } from "firebase/storage";

export const SaveImageFromURL = (props) => {
  const [imageUrl, setImageUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setImageUrl(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a reference to the file in Firebase Storage
    const storage = getStorage();
    const storageRef = ref(storage, 'some-child');
    //const storageRef = storage().ref();
    const fileRef = storageRef.child(`images/${Date.now()}`);

    // Upload the file to Firebase Storage
    const task = fileRef.putString(imageUrl, 'data_url');

    // Update the progress bar
    task.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(progress);
    }, (error) => {
      // Handle errors
      setError(error);
    }, () => {
      // Handle successful uploads
      console.log('File uploaded to Firebase Storage');
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Image URL:
        <input type="text" value={imageUrl} onChange={handleChange} />
      </label>
      <button type="submit">Save</button>
      {error && <p>{error.message}</p>}
      <progress value={progress} max="100" />
    </form>
  );
}


// This component renders a form with a text input for the image URL and a submit button. When the form is submitted, the component uses the putString method of the storage object from the firebase library to upload the image to Firebase Cloud Storage. The progress of the upload is displayed in a progress bar.

// Note that in order to use the storage object, you will need to have the Firebase SDK installed and configured in your project.