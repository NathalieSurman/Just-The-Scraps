import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const FabricDetail = () => {
  const [item, setItem] = useState();
  const { _id } = useParams();

  useEffect(() => {
    fetch(`/fabric/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItem(data.data);
      })
      .catch((err) => console.log("Error: ", err));
  }, []);
  //TODO the imag does not show

  return (
    <div>
      {!item ? (
        <h1>Loading</h1>
      ) : (
        <Wrapper>
          <img src={item.imageSrc} alt="fabric image" />
          <ImgDiv>{console.log(item.imageSrc)}</ImgDiv>
          <ItemInfo>
            <div>
              <span>
                {item.numInStock === 0 ? "Out Of Stock" : "Great Pick"}
              </span>
            </div>
            <CategoryDiv>
              Category:<span> {item.category}</span>
            </CategoryDiv>
            {/*when button is click, post data in the cart database*/}
            {/* <CartButton
              onClick={postToCart}
              disabled={item.numInStock === 0 ? true : false}
              style={{
                background: item.numInStock === 0 ? "grey" : "#F76F81",
              }}
            >
              Add To Cart
            </CartButton> */}
          </ItemInfo>
        </Wrapper>
      )}
    </div>
  );
};

export default FabricDetail;

const Wrapper = styled.div``;
const CategoryDiv = styled.div``;
const ImgDiv = styled.div``;
const CartButton = styled.button``;
const ItemInfo = styled.div``;
