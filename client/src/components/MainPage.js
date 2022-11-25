import React from "react";
import styled from "styled-components";
import Slider from "./Slider";

const MainPage = () => {
  return (
    <Container>
      <Slider />
    </Container>
  );
};

export default MainPage;

const Container = styled.div`
  background-color: #122620;
`;
