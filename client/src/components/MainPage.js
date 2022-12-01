import React from "react";
import styled from "styled-components";
import Slider from "./Slider";
import TestSlider from "./TestSlider";

const MainPage = () => {
  const slides = [
    {
      url: "http://localhost:3000/slider.jpg",
      title: "offwhite",
      subtitle: "Welcome to just the Scraps",
    },
    { url: "http://localhost:3000/slider2.jpg", title: "fabric" },
    { url: "http://localhost:3000/slider3.jpg", title: "fabricwave" },
  ];
  const containerStyles = {
    width: "1710px",
    height: "280px",
    margin: "0 auto",
  };

  return (
    <Container>
      <div style={containerStyles}>
        {/* <Slider /> */}
        <TestSlider slides={slides} />
      </div>
    </Container>
  );
};

export default MainPage;

const Container = styled.div`
  /* background-color: #122620; */
  margin: 0;
`;
