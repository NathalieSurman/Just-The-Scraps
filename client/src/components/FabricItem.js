import { Link } from "react-router-dom";
import styled from "styled-components";

const FabricItem = ({ item, img, filterFabrics }) => {
  if (
    !filterFabrics.size &&
    !filterFabrics.location &&
    !filterFabrics.category
  ) {
    return (
      <Container>
        <ItemDiv to={`/fabric/${item._id}`}>
          <ContentBox>
            <ItemImg src={img} alt="fabric" />
            <ItemName>{item.category}</ItemName>
            <Location>{item.location}</Location>
            <ItemSize>{item.size}</ItemSize>
          </ContentBox>
        </ItemDiv>
      </Container>
    );
  }
  return item.size === filterFabrics.size &&
    item.location === filterFabrics.location &&
    item.category === filterFabrics.category ? (
    <Container>
      <ItemDiv to={`/fabric/${item._id}`}>
        <ContentBox>
          <ItemImg src={img} alt="fabric" />
          <ItemName>{item.category}</ItemName>
          <Location>{item.location}</Location>
          <ItemSize>{item.size}</ItemSize>
        </ContentBox>
      </ItemDiv>
    </Container>
  ) : null;
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

const ItemImg = styled.img`
  height: 295px;
  width: 295px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  z-index: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
  -webkit-transition: 0.3s ease-in-out;
  transition: 0.3s ease-in-out;
  &:hover {
    -webkit-transform: scale(1.3);
    transform: scale(1.3);
  }
`;
const ItemName = styled.div`
  margin-top: 10px;
  font-weight: bold;
  display: block;
  margin-bottom: 18px;
  text-transform: uppercase;
  color: #122620;
  text-decoration: none;
  transition: 0.3s;

  letter-spacing: 1px;

  :hover {
    color: #f4ebd0;
  }
`;

const Location = styled.div`
  font-weight: bold;
  text-align: center;
  font-size: 15px;
  line-height: 2px;
  margin-bottom: 18px;
  color: #122620;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: 0.3s;
  :hover {
    color: #f4ebd0;
  }
`;
const ItemSize = styled.div`
  font-size: 15px;
  line-height: 2px;
  margin-bottom: 18px;
  color: #122620;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: 0.3s;
  :hover {
    color: #f4ebd0;
  }
`;

const ContentBox = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 2;
`;
