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

  //-- Here we want When user creates a post, it will be reflected in the user’s profile ---//
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     fetch("/fabric").then((res) =>
  //       res.json().then((data) => {
  //         data.data.forEach((users) => {
  //           if (users.name === user) {
  //             setAllFabrics(users);
  //           }
  //         });
  //         setUsersItem(data.data);
  //       })
  //     );
  //   }
  // }, []);

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
        console.log("post", data);
        if (data.status === 200) {
          setIsDeleted(!isDeleted);
        }
      })

      .catch((error) => {
        console.log(error);
      });
  };

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
          <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
            {/* <ProductForm onSubmit={handleSubmit}>
              <Title>Add fabric item</Title>
              <ProductInfo>
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
                    <option value="">Pick a size</option>
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
                    <option value="">Pick fabric type</option>
                    <option value="natural fiber">Natural fibers</option>
                    <option value="mix fibers">Mix fibers</option>
                    <option value="synthetic fiber">Synthetic fiber</option>
                  </optgroup>
                </Select>
              </ProductInfo>
              <ImageUpload images={images} setImages={setImages} />

              <Button type="submit">Post Fabric</Button>
            </ProductForm> */}
          </Popup>
          <>
            <h2>Here is your posted fabric items:</h2>
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
  /* max-width: 1500vw; */
  background-image: url("/cover2.jpg");

  background-size: cover;
`;

const CardInfo = styled.div`
  display: flex;
  gap: 250px;
`;

const Banner = styled.img`
  width: 1714px;
  height: 300px;
`;

const Wrapper = styled.div`
  /* :before {
    content: "";
    background-image: url("/cover2.jpg");
    position: absolute;
    background-size: cover;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    opacity: 0.6;
  } */
`;
const UserCard = styled.div`
  position: relative;
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  margin-left: 20px;
  /* width: 1200px; */
  /* border: 1px solid lightgrey; */
  /* max-width: 500vw; */
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
const Title = styled.h2`
  font-size: 1.4em;
  margin-bottom: 10px;
`;
const UserName = styled.h2`
  font-weight: bolder;
  font-size: 20px;
  margin: 0;
  text-transform: uppercase;
  color: #122620;
  text-decoration: none;
  transition: 0.3s;

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

  :hover {
    color: #122620;
    background-color: #d6ad60;
  }
`;
const ImgContainer = styled.div`
  /* display: flex;
  flex-direction: column;
  margin-left: 10px;
  padding-bottom: 15px; */
`;

const ProductForm = styled.form`
  /* margin-left: 30%; */

  /* padding: 10px 20px;
  background: #f4f7f8;
  margin: 10px auto; */

  padding: 10px 20px;

  //NEW here
  margin-top: 10px;
  /* height: 450px;
  width: 300px; */
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  text-decoration: none;
  border: solid thin #122620;
  color: #122620;
  position: relative;
  background-image: url("/pic.jpg");
  border-radius: 20px;
  overflow: hidden;
  &::before {
    content: "FABRIC";
    position: absolute;
    top: -50%;
    width: 100%;
    height: 100%;
    background: #d6e4e5;
    transform: skewY(345deg);
    transition: 0.5s;
  }
  &:hover::before {
    top: -70%;
    transform: skewY(390deg);
  }

  &::after {
    content: "FABRIC";
    position: absolute;
    bottom: 0;
    left: 0;
    font-weight: 600;
    font-size: 6em;
    color: rgba(0, 0, 0, 0.1);
  }
`;

const ProductInfo = styled.div`
  z-index: 1;
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
  /* display: block; */
  padding: 19px 39px 18px 39px;
  color: #fff;
  margin: 0 auto;
  background: #205375;
  font-size: 18px;
  text-align: center;
  font-style: normal;
  width: 300px;
  border: 1px solid #7c99ac;
  border-width: 1px 1px 3px;
  margin-bottom: 10px;
  z-index: 10;
  &:hover {
    background: #7c99ac;
  }
`;
const DeleteButton = styled.button`
  padding: 10px 30px;
  color: #f4ebd0;
  text-decoration: none;
  border: none;
  background: #122620;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  &:hover {
    background: #f61b1b;
  }
`;
