import styled from "styled-components";
import { RiArrowLeftSFill, RiArrowRightSFill } from "react-icons/ri";
const Slider = () => {
  return (
    <Container>
      <Arrow direction="left">
        <RiArrowLeftSFill />
      </Arrow>
      <Wrapper>
        <ImageContainer>
          <Image src="/0010.jpg" alt="fabrics" />
        </ImageContainer>
        <InfoContainer></InfoContainer>
      </Wrapper>
      <Arrow direction="right">
        <RiArrowRightSFill />
      </Arrow>
    </Container>
  );
};

export default Slider;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  /* background-color: #122620; */
  position: relative;
`;

const Wrapper = styled.div`
  height: 100%;
`;
const Slide = styled.div`
  display: flex;
  align-items: center;
`;
const ImageContainer = styled.div`
  flex: 1;
`;
const InfoContainer = styled.div`
  flex: 1;
`;

const Image = styled.img``;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
`;
