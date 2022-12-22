import { useState, useEffect } from "react";
import {
  ref,
  // uploadBytes,
  getDownloadURL,
  listAll,
  // list,
} from "firebase/storage";

import { storage } from "../index.js";

const size = "100px"

const DisplayImages = (props) => {
  const { userId } = props

  const folderPrefix = "images/USERSET_A_"
  const entirePrefix = folderPrefix + userId + "/"

  const [imageUrls, setImageUrls] = useState([])
  const imagesListRef = ref(storage, entirePrefix);

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
    <div className="">
      {imageUrls.map((url) => {
        return <img src={url} height={size} width={size} alt="" />;
      })}
    </div>
  );
}

export default DisplayImages;