import React from "react";
import styled from "styled-components";
import { TfiSearch } from "react-icons/tfi";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Header = () => {
  if (window.location.pathname === "/") {
    return null;
  }
  return (
    <Container>
      <Wrapper>
        <Left>
          {/* <Language>EN</Language> */}
          <StyledLink to="/about">About us</StyledLink>
        </Left>
        <Center>
          <LogoLink to="/mainpage">Just The Scraps.</LogoLink>
        </Center>
        <Right>
          <LogoutButton />
          <StyledLink to="/fabric">Fabrics</StyledLink>
          <StyledLink to="/profile">Profile</StyledLink>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  height: 60px;
  background-color: #122620;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const LogoLink = styled(Link)`
  font-weight: bold;
  color: #d6ad60;
  font-size: 37px;
  text-decoration: none;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
`;

const StyledLink = styled(Link)`
  color: #d6ad60;
  text-decoration: none;
  font-size: 18px;
`;
