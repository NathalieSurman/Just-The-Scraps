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
  //TODO the imag does not show

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
                {/* {item.numInStock === 0 ? "Out Of Stock" : "Great Pick"} */}
              </span>
            </div>
            <CategoryDiv>
              Category:<span> {item.category}</span>
            </CategoryDiv>
            <CartButton disabled={!item.isAvailable} onClick={buyHandler}>
              I want this
            </CartButton>
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
const CartButton = styled.button`
  :disabled {
    cursor: not-allowed;
    background: red;
  }
`;
const ItemInfo = styled.div``;
