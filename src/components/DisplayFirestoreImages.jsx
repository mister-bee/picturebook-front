import { useEffect } from "react";
import {
  ref,
  getDownloadURL,
  // getMetadata,
  listAll,
  // list,
} from "firebase/storage";

import { storage } from "../index.js";

const DisplayFirestoreImages = (props) => {
  const { userId, imageUrls, setImageUrls, size = "100px"
  } = props

  const folderPrefix = "images/USERSET_A_"
  const entirePrefix = folderPrefix + userId + "/"
  const imagesListRef = ref(storage, entirePrefix);

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item, i) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
          return item
        })
      })
    })
  }, []);

  return (
    <div className="">
      {imageUrls.map((url) => {
        return <img src={url} height={size} width={size} alt="" />;
      })}
    </div>
  );
}

export default DisplayFirestoreImages;

