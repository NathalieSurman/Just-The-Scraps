import { Link } from "react-router-dom";
import styled from "styled-components";

const FabricItem = ({ item, img }) => {
  return (
    <Container>
      <ItemDiv to={`/fabric/${item._id}`}>
        <ItemImg src={img} alt="fabric" />
        <ItemName>{item.category}</ItemName>
        <Location>{item.location}</Location>
        <ItemSize>{item.size}</ItemSize>
      </ItemDiv>
    </Container>
  );
};

export default FabricItem;

const Container = styled.div``;

const ItemDiv = styled(Link)`
  height: 450px;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 5%;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  text-decoration: none;
  color: black;
`;

const ItemImg = styled.img`
  height: 300px;
  width: 300px;
`;
const ItemName = styled.div``;

const Location = styled.div`
  font-weight: bold;
  text-align: center;
`;
const ItemSize = styled.div``;
