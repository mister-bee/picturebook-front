import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";

//import { storage } from "./firebase";
import { storage } from "../../index.js";
import { v4 } from "uuid";

const size = "100px"

function SaveImg(props) {
  // const {imageUrl} = props
  //const [imageUpload, setImageUpload] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, "images/");

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    console.log("imageRef", imageRef)
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <div className="SaveImg">
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
          console.log("zzzzzzzzzz>>>>>>>>>", event.target.files[0])
        }}
      />
      <button onClick={uploadFile}> Upload Image</button>

      {imageUrls.map((url) => {
        return <img src={url} height={size} width={size} />;
      })}
    </div>
  );
}

export default SaveImg;