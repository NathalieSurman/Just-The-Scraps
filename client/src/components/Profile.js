import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ImageUpload from "./ImageUpload";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

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
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <Product>
          <h2>Add fabric item</h2>
          <Input type="text" placeholder="Enter fabric type" />
          <Input type="text" placeholder="Enter fabric size" />
          <Input type="text" placeholder="Enter location" />
          <ImageUpload />

          <button>Add fabric</button>
        </Product>
      </div>
    )
  );
};

export default Profile;

const Container = styled.div``;

const Product = styled.div`
  margin-left: 30%;
`;

const Input = styled.input`
  padding: 7px;
  display: block;
  width: 300px;
`;
