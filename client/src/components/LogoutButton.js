import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </Button>
  );
};

export default LogoutButton;

const Button = styled.button`
  font-family: "Poppins", sans-serif;
  background-color: #122620;
  border: solid #d6ad60;
  border-radius: 3px;
  color: #d6ad60;
`;
