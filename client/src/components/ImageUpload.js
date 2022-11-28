import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const ImageUpload = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [images, setImages] = useState([]);
  const [imagesToRemove, setImagesToRemove] = useState(null);

  const handleRemoveImg = (imgObj) => {};

  const handleOpenWidget = (e) => {
    e.preventDefault();
    let myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dpacwtxaj",
        uploadPreset: "jnj9cmxktest",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setImages((prev) => [
            ...prev,
            { url: result.info, public_id: result.info.public_id },
          ]);
          console.log("done! ehre is the image info: ", result.info);
        }
      }
    );
    myWidget.open();
  };
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <div>
      <Container>
        <Button
          id="upload-widget"
          className="cloudinary-button"
          onClick={(e) => handleOpenWidget(e)}
        >
          Upload
        </Button>
        <div className="images-preview-container">
          {images.map((image) => {
            return (
              <div>
                <img src={image.url.url} />
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
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

const Container = styled.div``;
//<Button onClick={() => widgetRef.current.open()}>Upload Image</Button>
