import { useEffect, useRef } from "react";

const ImageUpload = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dpacwtxaj",
        uploadPreset: "jnj9cmxktest",
      },
      function (error, result) {
        console.log(result);
      }
    );
  }, []);
  return <button onClick={() => widgetRef.current.open()}>Upload Image</button>;
};

export default ImageUpload;
