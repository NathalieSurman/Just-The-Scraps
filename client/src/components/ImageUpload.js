import { useEffect, useRef } from "react";
import styled from "styled-components";

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
  return <Button onClick={() => widgetRef.current.open()}>Upload Image</Button>;
};

export default ImageUpload;

const Button = styled.button`
  position: relative;
  display: block;
  padding: 19px 39px 18px 39px;
  color: #fff;
  margin: 0 auto;
  background: #205375;
  font-size: 18px;
  text-align: center;
  font-style: normal;
  width: 100%;
  border: 1px solid #7c99ac;
  border-width: 1px 1px 3px;
  margin-bottom: 10px;
  &:hover {
    background: #7c99ac;
  }
`;
