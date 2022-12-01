import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  // const loggedUser = sessionStorage.getItem("user");

  return (
    <Container>
      <DivButton>
        <Title>Please Login In First</Title>
        <Button onClick={() => loginWithRedirect()}>Login</Button>
      </DivButton>
    </Container>
  );
};

export default LoginButton;

const Container = styled.div`
  /* background-image: url("/loginpage.jpg");
  background-size: cover;
  background-repeat: no-repeat; */
  z-index: -1;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  //NEW
  background: #344557
    url(https://unsplash.imgix.net/photo-1423683249427-8ca22bd873e0?fit=crop&fm=jpg&h=700&q=75&w=1050)
    0 0 no-repeat;
  background-size: cover;
  &:after {
    content: "";
    background: rgba(#344557, 0.85);
  }
`;

const Title = styled.h1`
  display: block;
  text-transform: uppercase;
  font-size: 1.5rem;
  color: #1f4136;
  text-shadow: -15px 5px 20px #d6ad60;
  transition: all 0.5s ease-in-out;

  :hover {
    text-shadow: -16px 5px 15px #f2d6d6;
  }
`;
const DivButton = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  cursor: pointer;
  outline: none;
  border: 0;
  vertical-align: middle;
  text-decoration: none;
  font-size: inherit;
  font-family: inherit;
  font-weight: 100;
  color: #d6ad60;
  text-transform: uppercase;
  padding: 0.5em 1.05em;
  background: #1f4136; //$light-pink: #fff0f0;
  border: 2px solid #d6ad60; //$pink-border: #b18597;
  border-radius: 0.75em;
  transform-style: preserve-3d;
  box-sizing: border-box;
  &::before,
  &::after {
    box-sizing: border-box;
  }
  transition: transform 150ms cubic-bezier(0, 0, 0.58, 1),
    background 150ms cubic-bezier(0, 0, 0.58, 1);
  &::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #2c5b4c; //$dark-pink: #f9c4d2;
    border-radius: inherit;
    box-shadow: 0 0 0 2px #3f836d, 0 0.625em 0 0 #387663; //$pink-shadow: #ffe3e2;
    transform: translate3d(0, 0.75em, -1em);
    transition: transform 150ms cubic-bezier(0, 0, 0.58, 1),
      box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
  }
  &:hover {
    background: #ffe9e9; //$pink: #ffe9e9;
    transform: translate(0, 0.25em);
    &::before {
      box-shadow: 0 0 0 2px #b18597, 0 0.5em 0 0 #ffe3e2;
      transform: translate3d(0, 0.5em, -1em);
    }
  }
  &:active {
    background: #ffe9e9;
    transform: translate(0em, 0.75em);
    &::before {
      box-shadow: 0 0 0 2px #b18597, 0 0 #ffe3e2;
      transform: translate3d(0, 0, -1em);
    }
  }
`;
