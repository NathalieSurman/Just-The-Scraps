import React from "react";
import styled from "styled-components";

const About = () => {
  return (
    <TopDiv>
      <Title>About us</Title>
      <Container>
        <Box>
          <p>
            I made this page for people who need at website that is just about
            fabrics.This Website is for those of us who have scraps of fabrics
            that we don't know what to do with or just rolls of fabrics we also
            don't know what to do with. But we don't want to throw away since it
            would cause harm to the environment. This is also a site for those
            of us who want to get scraps of fabrics for our fun projects.
          </p>
        </Box>
      </Container>
    </TopDiv>
  );
};

export default About;

const TopDiv = styled.div`
  background: #344557
    url(https://unsplash.imgix.net/photo-1423683249427-8ca22bd873e0?fit=crop&fm=jpg&h=700&q=75&w=1050)
    0 0 no-repeat;
  background-size: cover;
  /* background-repeat: no-repeat; */
  z-index: -1;
  /* width: 100vw; */
  height: 100vh;
  /* display: flex;
  justify-content: center;
  align-items: center; */
`;

const Title = styled.h1`
  margin: 0;
  color: white;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  width: 570px;
  height: 210px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  p {
    letter-spacing: 1px;
    padding: 10px;
  }
`;
