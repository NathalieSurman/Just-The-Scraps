import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const FabricDetail = () => {
  const [item, setItem] = useState();
  const { _id } = useParams();
  const [isPurchased, setIsPurchased] = useState(false);

  useEffect(() => {
    fetch(`/fabric/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItem(data.data);
      })
      .catch((err) => console.log("Error: ", err));
  }, [isPurchased]);

  // ---- We used a PATCH for when a user buys an item/fabric it updates the data that its not available anymore ----//
  const buyHandler = () => {
    fetch(`/update/${_id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setIsPurchased(!isPurchased);
          window.alert("Purchase success");
        }
      });
  };

  return (
    <Wrapper>
      {!item ? (
        <h1>Loading</h1>
      ) : (
        <Card>
          <Image src={item.imageSrc} alt="fabric image" />
          <ItemInfo>
            <Category>
              Category:<span> {item.category}</span>
            </Category>
            <Location>
              Location:<span> {item.location}</span>
            </Location>
            <Size>
              size:<span> {item.size}</span>
            </Size>
            <CartButton disabled={!item.isAvailable} onClick={buyHandler}>
              I want this
            </CartButton>
          </ItemInfo>
        </Card>
      )}
    </Wrapper>
  );
};

export default FabricDetail;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url("/cover2.jpg");

  background: cover;
`;

const Card = styled.div`
  height: 650px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;

  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  text-decoration: none;
  border: solid thin #122620;
  color: #122620;
  background-image: url("/slider.jpg");
  position: relative;

  border-radius: 20px;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    top: -50%;
    width: 100%;
    height: 100%;
    background-image: url("/test.jpg");

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

const ItemInfo = styled.div`
  position: relative;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 2;
`;

const Image = styled.img`
  height: 295px;
  width: 295px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  z-index: 1;
`;

const Category = styled.h2`
  font-size: 18px;
  color: black;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
`;
const Location = styled.h3`
  font-size: 24px;
  color: black;
  font-weight: 700;
  letter-spacing: 1px;
`;
const Size = styled.h3`
  font-size: 24px;
  color: black;
`;

const CartButton = styled.button`
  padding: 10px 30px;
  color: #f4ebd0;
  text-decoration: none;
  border: none;
  background: #122620;
  border-radius: 30px;
  text-transform: uppercase;
  letter-spacing: 1px;
  :disabled {
    cursor: not-allowed;
    background: red;
  }
`;
