import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { storage } from "./Firebase-Config"
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid';

function App() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  const imageListRef = ref(storage, "images/");

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `image/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload)
      .then(() => {
        alert("Image Uploaded");
        getDownloadURL(imageRef)
          .then((url) => {
            setImageList((prev) => [...prev, url]); // Add the new URL to the existing list
          })
          .catch((error) => {
            console.log("Error getting download URL:", error);
          });
      })
      .catch((error) => {
        console.log("Error uploading image:", error);
      });
  };

  useEffect(() => {
    // Fetch all the existing images from Firebase
    listAll(imageListRef).then((response) => {
      const promises = response.items.map((item) => getDownloadURL(item));
      Promise.all(promises)
        .then((urls) => {
          setImageList((prev) => [...prev, ...urls]); // Combine existing URLs with the new ones
        })
        .catch((error) => {
          console.log("Error getting download URLs:", error);
        });
    });
  }, []);

  return (
    <div className="App">
      <input type='file' onChange={(event) => { setImageUpload(event.target.files[0]) }}></input>
      <button onClick={uploadImage}>Upload Image</button>

      {imageList.map((url, index) => {
        return <img key={index} src={url} alt="Uploaded" />;
      })}
    </div>
  );
}

export default App;
