import { RiArrowLeftSFill, RiArrowRightSFill } from "react-icons/ri";
import { useState } from "react";
import styled from "styled-components";

const Carousel = () => {
  const slides = [
    {
      url: "http://localhost:3000/slider.jpg",
      title: "Fashion",
      subtitle: "Welcome to just the Scraps",
      //   img: "Fashion",
    },
    {
      url: "http://localhost:3000/slider2.jpg",
      title: "Fabric/Scraps",
      subtitle: "Sewing lovers",
      //   img: "Fabric",
    },
    {
      url: "http://localhost:3000/slider3.jpg",
      title: "Sustainable",
      subtitle: "Where you can get or give fabric/scraps of fabric",
      //   img: "Scraps",
    },
  ];
  const [currImg, setCurrImg] = useState(0);

  return (
    <Carousel1>
      <InnerCarousel style={{ backgroundImage: `url(${slides[currImg].url})` }}>
        <div
          className="left"
          onClick={() => {
            currImg > 0 && setCurrImg(currImg - 1);
          }}
        >
          <RiArrowLeftSFill style={{ fontSize: 30 }} />
        </div>
        <div className="center">
          <Title>{slides[currImg].title}</Title>
          <SubTitle>{slides[currImg].subtitle}</SubTitle>
        </div>
        <div
          className="right"
          onClick={() => {
            currImg < slides.length - 1 && setCurrImg(currImg + 1);
          }}
        >
          <RiArrowRightSFill style={{ fontSize: 30 }} />
        </div>
      </InnerCarousel>
    </Carousel1>
  );
};

export default Carousel;

const Carousel1 = styled.div`
  width: 1714px;
  height: 790px;
  background-color: black;
  margin: 0;
`;

const InnerCarousel = styled.div`
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;

  .left {
    flex: 5%;
    height: 100%;
    background-color: #122620;
    backdrop-filter: blur(8px);
    display: grid;
    place-items: center;
    color: #d6ad60;
    cursor: pointer;
  }
  .right {
    flex: 5%;
    height: 100%;
    background-color: #122620;
    display: grid;
    place-items: center;
    color: #d6ad60;
    cursor: pointer;
  }

  .center {
    flex: 80%;
    height: 100%;
    display: grid;
    place-items: center;
    font-family: Arial, Helvetica, sans-serif;
    text-align: justify;
    text-align-last: center;
  }
`;

const Title = styled.h1`
  font-size: 5rem;
  border-radius: 9px;
  z-index: 1;
  color: #122620;
  background-color: rgba(white, 0.2);
  padding: 20px;
  max-width: 320px;
  margin-top: 100px;
  width: 70%;
  backdrop-filter: blur(8px);
  animation: text 0.8s 0.6s ease backwards;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    width: 5px;
    height: 100%;
    background-color: rgba(white, 0.5);
    top: 0;
    left: 0;
  }
`;

const SubTitle = styled.p`
  font-size: 2rem;

  padding: 20px;
  border-radius: 9px;
  ///
  text-transform: uppercase;
  font-weight: 600;
  -webkit-text-stroke: 1px #122620;
  margin-bottom: 16px;
  color: #d6ad60;
  z-index: 1;

  background-color: rgba(white, 0.2);

  max-width: 420px;
  margin-top: 100px;
  width: 70%;
  backdrop-filter: blur(8px);
  animation: text 0.8s 0.6s ease backwards;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    width: 5px;
    height: 100%;
    background-color: rgba(white, 0.5);
    top: 0;
    left: 0;
  }
`;
