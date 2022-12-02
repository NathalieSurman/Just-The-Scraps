import React from "react";
import styled from "styled-components";
import Carousel from "./Carousel";

const MainPage = () => {
  return (
    <Container>
      <div>
        <Carousel />
      </div>
    </Container>
  );
};

export default MainPage;

const Container = styled.div`
  /* background-color: #122620; */
  margin: 0;
`;
