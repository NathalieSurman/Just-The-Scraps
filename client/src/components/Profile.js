import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ImageUpload from "./ImageUpload";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [inputValue, setInputValue] = useState("");
  const [formData, setFormData] = useState({});
  const [itemState, setItemState] = useState(null);
  const [images, setImages] = useState([]);
  const [allFabrics, setAllFabrics] = useState("");
  const [usersItem, setUsersItem] = useState("");
  const { _id } = useParams();

  //-- Here we want When user creates a post, it will be reflected in the user’s profile ---//
  useEffect(() => {
    fetch("/fabric").then((res) =>
      res.json().then((data) => {
        data.data.forEach((users) => {
          if (users.name === user) {
            setAllFabrics(users);
          }
        });
        setUsersItem(data.data);
      })
    );
  }, []);

  //we want an event to see what the user put for the location in the input
  const handleChange = (e) => {
    setFormData({ ...formData, location: e.target.value });
  };

  const handleSelect = (e) => {
    const selectId = e.target.value;
    //---We want to know which size is being selected by the user ---//
    const selectedItems = ["small", "medium", "large"].filter(
      (item) => item === selectId
    );
    setItemState(selectedItems);
    //-- In the setFormData, we needed a way to see what the user picked, therefore we did this ---//
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelected = (e) => {
    const selectId = e.target.value;
    //----We want to know which one is being selected for the fabric type/category type ----//
    const selectedItems = ["natural", "mix-fiber", "synthetic"].filter(
      (item) => item === selectId
    );
    setItemState(selectedItems);
    setFormData({ ...formData, [e.target.id]: e.target.value }); //added this so we can see what the user picked
  };

  //---- Here we want to make sure we match the structure from our data when we create a New fabric item ----//
  const category = formData.category;
  const size = formData.sizes;
  const location = formData.location;

  //--- We are making a event for when we submitted the product item "fabric" ---//
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/create-post", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category,
        size,
        location,
        imageSrc: images[0].url.url,
        isAvailable: true,
        user: user,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // if (data.status === 200) {
        //   window.sessionStorage.setItem("postSubmit", inputValue); //not sure here
        // } else {
        //   window.alert("Fill all the form !");
        // }
      })

      .catch((error) => {
        console.log(error);
      });
  };

  // //--- User can DELETE their fabric item post ----//
  const deleteItem = () => {
    // removing(product);
    fetch(`/delete-post/${_id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        category,
        size,
        location,
        imageSrc: images[0].url.url,
        isAvailable: true,
        user: user,
      }),
    });
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

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
        <ProductForm onSubmit={handleSubmit}>
          <Title>Add fabric item</Title>
          <div>
            <h3>Fill in Fabric Info</h3>
            <Input
              type="text"
              placeholder="Enter meeting location"
              onChange={handleChange}
            />
            <Label for="size">Size Fabric: </Label>
            <Select
              id="sizes"
              value={inputValue.id}
              onChange={(e) => {
                handleSelect(e);
              }}
            >
              <optgroup label="Size">
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </optgroup>
            </Select>{" "}
            <Label for="fabric type">Fabric Type: </Label>
            <Select
              id="category"
              value={inputValue.id}
              onChange={(e) => {
                handleSelected(e);
              }}
            >
              <optgroup label="fabric type">
                <option value="natural">Natural fibers</option>
                <option value="mix fibers">Mix fibers</option>
                <option value="synthetic fiber">Synthetic fiber</option>
              </optgroup>
            </Select>
          </div>
          <ImageUpload images={images} setImages={setImages} />

          <Button type="submit">Post Fabric</Button>
        </ProductForm>
      </Container>
    )
  );
};

{
  /* <div className="mapDiv">
          {usersItem.map((item) => {
            return (
              <div>
                <div>{item.user.name}</div>
              </div>
            );
          })}
        </div> */
}
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
