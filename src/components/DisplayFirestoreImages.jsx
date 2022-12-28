import { useEffect } from "react";
import {
  ref,
  getDownloadURL,
  // getMetadata,
  listAll,
  // list,
} from "firebase/storage";

import { storage } from "../index.js";

const size = "100px"

const DisplayImages = (props) => {
  const { userId, imageUrls, setImageUrls, 
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
      {/* <h1>{imageUrls && imageUrls.length}</h1> */}
      {imageUrls.map((url) => {
        return <img src={url} height={size} width={size} alt="" />;
      })}
    </div>
  );
}

export default DisplayImages;


// useEffect(() => {

//   listAll(imagesListRef).then((response) => {

//     response.items.forEach((item) => {

//       let itemDownloadUrl
//       let fileName

//       getDownloadURL(item).then((url) => {
//         console.log("url++++++++", url)

//         // ---ORIGINAL ARRAY ---- //
//         setImageUrls((prev) => [...prev, url]);
//         return item


//         // --- GET META DATA FOR IMAGE OBJECT ---- ///
//       }).then((item) => {
//         getMetadata(item).then((metadata) => {
//           console.log("fileName ++++++++", metadata.name)

//         })
//       })

//       console.log("itemDownloadUrl===>", itemDownloadUrl)
//       console.log("fileName===>", fileName)
//     });
//   })
// }, []);




  // useEffect(() => {
  //   listAll(imagesListRef).then((response) => {
  //     response.items.forEach((item) => {
  //       getMetadata(item).then((url) => {
  //         console.log("url======>>>>>>", url)
  //         //setImageUrls((prev) => [...prev, url]);
  //       });
  //       // item.getMetadata().then((metadata) => console.log("USER METADATA", metadata))
  //       // .then(()=>
  //       // )
  //     });
  //   });
  // }, []);


  

          // --- GET META DATA FOR IMAGE  KEY ---- ///
          // .then((itemagain) => {


          //   getMetadata(itemagain)
          //     .then((metadata) => {
          //       const fileNameKey = metadata.name
          //       const newImageObject = { [fileNameKey]: itemDownloadUrl }
          //       console.log("newImageObject", newImageObject)


          //       // setTempObject((tempObject) =>   [fileNameKey]: itemDownloadUrl , ...tempObject)

          //       const oldObject = { ...tempObject }
          //       setTempObject((tempObject) => tempObject, newImageObject)
          //       setTempObject((tempObject) => tempObject, { a: "Dog" })


          //     })
          // })