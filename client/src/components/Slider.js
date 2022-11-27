import styled from "styled-components";
import { RiArrowLeftSFill, RiArrowRightSFill } from "react-icons/ri";
import { useState } from "react";
const Slider = () => {
  //   const [slide, setSlide] = useState(0);
  //   const handleClick = (direction) => {
  //     if (direction === "left") {
  //       setSlide(slide > 0 ? slide - 1 : 2);
  //     } else {
  //       setSlide(slide < 2 ? slide + 1 : 0);
  //     }

  //slide={slide} had this in the Wrapper as a prop
  // onClick={() => handleClick("left")} had this in the <Arrow> left and right
  //   };
  return (
    <Container>
      <Arrow direction="left">
        <RiArrowLeftSFill />
      </Arrow>
      <Wrapper>
        <Slide>
          <ImageContainer></ImageContainer>
          <InfoContainer>
            <Title>Fashion Community</Title>
            <SomeInfo>
              Where you can give/get your untouched fabric or Scraps of fabric
            </SomeInfo>
            <Button>Get Now</Button>
          </InfoContainer>
        </Slide>
        <Slide2>
          <ImageContainer></ImageContainer>
          <InfoContainer>
            <Title>Fabric Community</Title>
            <SomeInfo>
              Where you can give/get your untouched fabric or Scraps of fabric
            </SomeInfo>
            <Button>Get Now</Button>
          </InfoContainer>
        </Slide2>
        <Slide3>
          <ImageContainer></ImageContainer>
          <InfoContainer>
            <Title>Spread The Fabric</Title>
            <SomeInfo>
              Where you can give/get your untouched fabric or Scraps of fabric
            </SomeInfo>
            <Button>Get Now</Button>
          </InfoContainer>
        </Slide3>
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
  position: relative;
  overflow: hidden;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  /* transform: translateX(${(props) => props.slide * -100}vw); */
`;
const Slide = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: url("/slider.jpg");
  background-repeat: no-repeat;
  background-size: cover;
`;
const Slide2 = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: url("/slider2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
`;
const Slide3 = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: url("/slider3.jpg");
  background-repeat: no-repeat;
  background-size: cover;
`;
const ImageContainer = styled.div`
  flex: 1;
  height: 100%;
  background-size: cover;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
`;
const SomeInfo = styled.p`
  margin: 50px 0;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

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
  z-index: 2;
`;
