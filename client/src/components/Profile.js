import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ImageUpload from "./ImageUpload";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import FabricItem from "./FabricItem";
import Popup from "./Popup";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [inputValue, setInputValue] = useState("");
  const [formData, setFormData] = useState({});
  const [itemState, setItemState] = useState(null);
  const [images, setImages] = useState([]);

  const [buttonPopup, setButtonPopup] = useState(false);
  const [userFabrics, setUserFabrics] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  if (isAuthenticated) {
    window.sessionStorage.setItem("user", user.name);
  }

  useEffect(() => {
    const userName = window.sessionStorage.getItem("user");
    fetch(`/user-post/${userName}`)
      .then((res) => res.json())
      .then((data) => {
        setUserFabrics(data.data);
      });
  }, [isDeleted]);

  // //--- User can DELETE their fabric item post ----//

  const handleDelete = (_id) => {
    fetch(`/delete-post/${_id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(" here test data", data);
        if (data.status === 204) {
          setIsDeleted(!isDeleted);
        }
      });
  };

  if (isLoading && !isAuthenticated) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <Container>
        <div className="bannerDiv">
          <Banner src="/banner4.jpg" />
        </div>
        <Wrapper>
          <UserCard>
            <ImgContainer>
              <UserImg src={user.picture} alt={user.name} />
            </ImgContainer>
            <UserName>{user.name}</UserName>
            <p>{user.email}</p>
            <div>
              <PopBtn onClick={() => setButtonPopup(true)}>Create Post</PopBtn>
            </div>
          </UserCard>
          <Popup trigger={buttonPopup} setTrigger={setButtonPopup}></Popup>
          <>
            <Subtitle>Your posted fabric:</Subtitle>
            {userFabrics.map((fabric) => {
              return (
                <>
                  <FabricItem item={fabric} img={fabric.imageSrc} />

                  <DeleteButton
                    onClick={() => {
                      handleDelete(fabric._id);
                    }}
                  >
                    Delete
                  </DeleteButton>
                </>
              );
            })}
          </>
        </Wrapper>
      </Container>
    )
  );
};

export default Profile;

const Container = styled.div`
  padding: 0px;
  margin: 0px;
  align-items: center;
  background-image: url("/cover2.jpg");
  font-family: "Poppins", sans-serif;
  background-size: cover;
`;

const Banner = styled.img`
  width: 1714px;
  height: 300px;
`;

const Wrapper = styled.div``;

const UserCard = styled.div`
  position: relative;
  font-family: "Poppins", sans-serif;
  display: flex;
  margin-left: 20px;
`;
const UserImg = styled.img`
  width: 128px;
  height: 128px;
  -webkit-box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  border-radius: 100%;
  margin-top: -80px;
  margin-bottom: 20px;
  border: 4px solid #122620; //#d6ad60
  margin-left: 10px;
`;

const Subtitle = styled.h2`
  font-weight: bolder;
  font-size: 20px;
  margin: 0;
  text-transform: uppercase;
  color: #122620;
  text-decoration: none;
  transition: 0.3s;
  font-family: "Poppins", sans-serif;
  letter-spacing: 1px;

  :hover {
    color: #f4ebd0;
  }
`;

const UserName = styled.h2`
  font-weight: bolder;
  font-size: 20px;
  margin: 0;
  text-transform: uppercase;
  color: #122620;
  text-decoration: none;
  transition: 0.3s;
  font-family: "Poppins", sans-serif;
  letter-spacing: 1px;

  :hover {
    color: #f4ebd0;
  }
`;

const PopBtn = styled.button`
  padding: 8px 25px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  color: #d6ad60;
  background-color: #122620;
  position: absolute;
  right: 10px;
  transition: 0.3s;
  font-family: "Poppins", sans-serif;

  :hover {
    color: #122620;
    background-color: #d6ad60;
  }
`;
const ImgContainer = styled.div``;

const DeleteButton = styled.button`
  padding: 10px 30px;
  color: #f4ebd0;
  text-decoration: none;
  border: none;
  background: #122620;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: "Poppins", sans-serif;
  &:hover {
    background: #f61b1b;
  }
`;
