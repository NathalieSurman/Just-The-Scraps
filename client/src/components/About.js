import React from "react";
import styled from "styled-components";

const About = () => {
  return (
    <TopDiv>
      <Content>
        <Box>
          <PreTitle>About us</PreTitle>
          <Title>Who is this for?</Title>
          <Description>
            {" "}
            This is for the sewing lovers who don't know what to do with their
            extra fabrics or scraps of fabrics and for those of us love working
            with scraps of fabric.Let's not waste fabric and find new ways to
            uses our materials. This market website is meant to be free and
            please choose locations that you feel comfortable to meet.
          </Description>
        </Box>
        <FigureImg>
          <Img src="/about.jpg" />
        </FigureImg>
      </Content>
    </TopDiv>
  );
};

export default About;

const TopDiv = styled.div`
  /* background: #344557
    url(https://unsplash.imgix.net/photo-1423683249427-8ca22bd873e0?fit=crop&fm=jpg&h=700&q=75&w=1050)
    0 0 no-repeat; */
  background-color: #122620;
  background-size: cover;
  z-index: -1;
  /* height: 100vh; */
  width: 100%;
  height: 100%;
  position: relative;
`;

const Content = styled.div`
  max-width: 1110px;
  min-height: 600px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const Box = styled.article`
  z-index: 1;
  color: #d6ad60;
  background-color: rgba(white, 0.2);
  padding: 40px;
  max-width: 620px;
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

const Title = styled.h1`
  text-transform: uppercase;
  font-weight: 200;
  letter-spacing: 2px;
  margin-bottom: 24px;
  font-size: 40px;
  color: #d6ad60;
`;
const PreTitle = styled.p`
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 2px;
  margin-bottom: 16px;
  color: #d6ad60;
`;

const Description = styled.p`
  letter-spacing: 0.5px;
  font-size: 20px;
  line-height: 26px;
`;
const Img = styled.img`
  height: 480px;
  width: 70%;
  transform: translatey(80px);
  right: -6%;
  border-radius: 3px;
`;

const FigureImg = styled.figure`
  right: 0;
  max-width: 600px;
  width: 60%;
  height: 600px;
  transform: translatey(100px);
  /* position: absolute; */
  overflow: hidden;
`;
