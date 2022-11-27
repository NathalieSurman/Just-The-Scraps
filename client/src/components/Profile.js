import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ImageUpload from "./ImageUpload";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [inputValue, setInputValue] = useState("");

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  //making a event for when we submitted the product item "fabric"
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/create-post", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName: inputValue }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          window.sessionStorage.setItem("user", inputValue);
        } else {
          window.alert("Fill all the form !");
        }
      })

      .catch((error) => {
        console.log(error);
      });
  };
  // const { _id } = useParams();

  // //-----Update the fabric data----///
  // const postItem = () => {
  //   // increasing(product);
  //   fetch(`/update/${_id}`, {
  //     method: "PATCH",
  //     body: JSON.stringify({}),
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //   });
  // };

  // //--- User can DELETE their fabric item ----//
  // const deleteItem = () => {
  //   // removing(product);
  //   fetch(`/delete-post//${_id}`, {
  //     method: "DELETE",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //   });
  // };

  return (
    isAuthenticated && (
      <Container>
        <UserCard>
          <ImgContainer>
            <Img src={user.picture} alt={user.name} />
          </ImgContainer>
          <Name>{user.name}</Name>
          <p>{user.email}</p>
        </UserCard>
        <ProductForm>
          <Title>Add fabric item</Title>
          <div>
            <h3>Fill in Fabric Info</h3>
            <Input type="text" placeholder="Enter meeting location" />
            <Label for="size">Size Fabric: </Label>
            <Select>
              <optgroup label="Size">
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </optgroup>
            </Select>{" "}
            <Label for="fabric type">Fabric Type: </Label>
            <Select>
              <optgroup label="fabric type">
                <option value="nature">Natural fibers</option>
                <option value="mix">Mix fibers</option>
                <option value="synthetic">Synthetic fiber</option>
              </optgroup>
            </Select>
          </div>
          <ImageUpload />

          <Button>Post Fabric</Button>
        </ProductForm>
      </Container>
    )
  );
};

export default Profile;

const Container = styled.div``;
const UserCard = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  align-items: flex-start;
  border: 1px solid #420000;
  border-radius: 3px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  width: 200px;
  min-height: 300px;
  max-height: 300px;
`;
const Img = styled.img`
  width: 180px;
  height: auto;
  padding: 3px 3px 15px 3px;
  border: 2px solid #eeeeee;
  border-radius: 2px;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  margin: 5px auto 10px auto;
  &:hover {
    transform: scale(1.2);
  }
`;
const Title = styled.h2`
  font-size: 1.4em;
  margin-bottom: 10px;
`;
const Name = styled.h2`
  position: relative;
  height: auto;
  background-color: white;
  border-left: 1px solid grey;
  border-right: 1px solid grey;
  margin: 10px auto 10px auto;
  width: 75%;
  padding: 10px 5px 10px 5px;
  text-align: center;
  font-size: 0.8em;
  color: #101010;
`;
const ImgContainer = styled.div``;

const ProductForm = styled.form`
  margin-left: 30%;
  max-width: 500px;
  padding: 10px 20px;
  background: #f4f7f8;
  margin: 10px auto;
  padding: 20px;
  background: #f4f7f8;
  border-radius: 8px;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 4px;
  font-size: 15px;
  margin: 0;
  outline: 0;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  background-color: #e8eeef;
  color: #8a97a0;
  -webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03) inset;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03) inset;
  margin-bottom: 30px;
  background: #d2d9dd;
`;
const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const Select = styled.select`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 4px;
  font-size: 15px;
  margin: 0;
  outline: 0;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  background-color: #e8eeef;
  color: #8a97a0;
  -webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03) inset;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03) inset;
  margin-bottom: 30px;
  -webkit-appearance: menulist-button;
  height: 35px;
`;

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
