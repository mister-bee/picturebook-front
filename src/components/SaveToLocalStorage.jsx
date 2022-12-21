import React from 'react';

function saveImageToLocalStorage(imageUrl) {
  // Make a reference to the image element
  const imageElement = document.createElement('img');

  // Set the src of the image element to the image url
  imageElement.src = imageUrl;
  imageElement.crossOrigin = 'anonymous';


  // When the image has finished loading, get the image data as a base64-encoded string
  imageElement.onload = () => {
    const imageData = getBase64Image(imageElement);

    // Save the image data to local storage
    localStorage.setItem('image', imageData);
  }
}

function getBase64Image(img) {
  // Create a canvas element and draw the image to it
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  // Get the image data as a base64-encoded string
  return canvas.toDataURL('image/png');
}

export const SaveToLocalStorage = () => {
  return (
    <div>
      {/* <button onClick={() => saveImageToLocalStorage('https://oaidalleapiprodscus.blob.core.windows.net/private/org-Econ25n9XoubA7Ok6uhKleDt/user-JVZRCDCL7gKbnBrJ5CRWwCqe/img-z6i6869UrTn1tbl1BymPk2eD.png?st=2022-12-21T01%3A00%3A18Z&se=2022-12-21T03%3A00%3A18Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-20T20%3A35%3A49Z&ske=2022-12-21T20%3A35%3A49Z&sks=b&skv=2021-08-06&sig=jtBZTDdBKY3h0rintJPYhbPhDTEn27JHk8Z7HVoFG/4%3D')}> */}


      <button onClick={() => saveImageToLocalStorage('https://premierpups.com/azure/affordablepup/pups/french-bulldog-puppies-637637524473115475.jpg?w=557&h=557&mode=crop&autorotate=1')}>

        Save Image
      </button>
    </div>
  );
}

// This code creates an image element, sets its src to the image URL, and when the image has finished loading, it gets the image data as a base64-encoded string using the getBase64Image function. It then saves the image data to local storage using the localStorage.setItem function.

// You can then retrieve the image data from local storage and display it in your app by using the localStorage.getItem function.


export const GetImageFromLocalStorage = () => {
  const imageData = localStorage.getItem('image');
  console.log("imageData", imageData)

  return (
    <div>
      <img src={imageData} alt="" />
    </div>
  );
}