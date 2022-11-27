import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Container>
      <Button onClick={() => loginWithRedirect()}>Login</Button>
    </Container>
  );
};

export default LoginButton;

const Container = styled.div`
  background-image: url("/loginpage.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  position: relative;
  cursor: pointer;
  position: relative;
  padding: 10px 20px;
  background: white;
  font-size: 28px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  transition: all 1s;
  &:after,
  &:before {
    content: " ";
    width: 10px;
    height: 10px;
    position: absolute;
    border: 0px solid #fff;
    transition: all 1s;
  }
  &:after {
    top: -1px;
    left: -1px;
    border-top: 5px solid #b7c4cf;
    border-left: 5px solid #b7c4cf;
  }
  &:before {
    bottom: -1px;
    right: -1px;
    border-bottom: 5px solid #b7c4cf;
    border-right: 5px solid #b7c4cf;
  }
  &:hover {
    border-top-right-radius: 0px;
    border-bottom-left-radius: 0px;
    &:before,
    &:after {
      width: 100%;
      height: 100%;
    }
  }
`;
