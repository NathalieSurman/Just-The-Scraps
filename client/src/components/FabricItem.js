import { Link } from "react-router-dom";
import styled from "styled-components";

const FabricItem = ({ item, img }) => {
  return (
    <Container>
      <ItemDiv to={`/fabric/${item._id}`}>
        <ItemImg src={img} alt="fabric" />
        <ItemName>{item.category}</ItemName>
        <ItemStock>{item.numInStock}</ItemStock>
      </ItemDiv>
    </Container>
  );
};

export default FabricItem;

const Container = styled.div``;

const ItemDiv = styled(Link)``;

const ItemImg = styled.img``;
const ItemName = styled.div``;
const ItemStock = styled.div``;
