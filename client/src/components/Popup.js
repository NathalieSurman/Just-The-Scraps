import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import ImageUpload from "./ImageUpload";

const Popup = (props) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [inputValue, setInputValue] = useState("");
  const [formData, setFormData] = useState({});
  const [itemState, setItemState] = useState(null);
  const [images, setImages] = useState([]);
  // const [allFabrics, setAllFabrics] = useState("");
  // const [usersItem, setUsersItem] = useState("");
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

  if (isLoading && !isAuthenticated) {
    return <div>Loading ...</div>;
  }

  return props.trigger ? (
    <PopUp>
      <InnerPop>
        <CloseBtn onClick={() => props.setTrigger(false)}>close</CloseBtn>
        <ProductForm onSubmit={handleSubmit}>
          <Title>Add fabric item</Title>
          <ProductInfo>
            <Subtitle>Fill in Fabric Info</Subtitle>
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
        </ProductForm>
      </InnerPop>
    </PopUp>
  ) : (
    ""
  );
};

export default Popup;

const PopUp = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  /* background-color: aqua; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerPop = styled.div`
  position: relative;
  padding: 32px;
  width: 100%;
  max-width: 640px;
  background-color: #122620;
  text-align: center;
  border: #d6ad60 solid 1.5px;

  /* max-width: 1140px;
  min-height: 100vh; */
  /* display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column; */
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: #122620;
  color: #d6ad60;
  border: #d6ad60 solid 1px;
  text-transform: uppercase;
  padding: 2px 8px;
  &:hover {
    background-color: #d6ad60;
    color: #122620;
    border: #122620 solid 1px;
  }
`;

const ProductForm = styled.form`
  /* margin-left: 30%; */
  //#122620; //#d6ad60
  /* padding: 10px 20px;
  background: #f4f7f8;
  margin: 10px auto; */
  background-color: #122620;
  padding: 10px 20px;

  //NEW here
  margin-top: 10px;
  /* height: 450px;
  width: 300px; */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-decoration: none;
  border: solid thin #122620;
  color: #122620;
  position: relative;
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
  background-color: #122620;
  border: #d6ad60 solid 1px;
  color: #d6ad60;
  -webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03) inset;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03) inset;
  margin-bottom: 30px;
  background: #122620;
`;
const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #d6ad60;
`;
const Title = styled.h2`
  text-align: center;
  font-size: 1.4em;
  margin-bottom: 10px;
  color: #d6ad60;
`;

const Subtitle = styled.h3`
  color: #d6ad60;
`;
const Select = styled.select`
  background: rgba(254, 168, 21, 0.67);
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
  background-color: #122620;
  color: #d6ad60;

  -webkit-box-shadow: 0 1px 0 rgba(253, 224, 35, 0.775) inset;
  box-shadow: 0 1px 0 rgba(247, 168, 32, 0.642) inset;
  margin-bottom: 30px;
  -webkit-appearance: menulist-button;
  height: 35px;
`;

const Button = styled.button`
  position: relative;
  /* display: block; */
  padding: 19px 39px 18px 39px;
  color: #d6ad60;
  margin: 0 auto;
  background: #122620;
  font-size: 18px;
  text-align: center;
  font-style: normal;
  width: 300px;
  border: 1px solid #d6ad60;
  border-width: 1px 1px 3px;
  margin-bottom: 10px;
  z-index: 10;
  &:hover {
    background: #d6ad60;
    color: #122620;
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
