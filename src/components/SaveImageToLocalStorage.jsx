import React from 'react';

function saveImageToLocalStorage(imageUrl) {
  // Make a reference to the image element
  const imageElement = document.createElement('img');

  // Set the src of the image element to the image url
  imageElement.src = imageUrl;

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

function MyComponent() {
  return (
    <div>
      <button onClick={() => saveImageToLocalStorage('https://example.com/image.png')}>
        Save Image
      </button>
    </div>
  );
}

// This code creates an image element, sets its src to the image URL, and when the image has finished loading, it gets the image data as a base64-encoded string using the getBase64Image function. It then saves the image data to local storage using the localStorage.setItem function.

// You can then retrieve the image data from local storage and display it in your app by using the localStorage.getItem function.


function GetImageFromLocalStorage() {
  const imageData = localStorage.getItem('image');

  return (
    <div>
      <img src={imageData} />
    </div>
  );
}