import React from "react";
import styled from "styled-components";
import { TfiSearch } from "react-icons/tfi";
import { SlBag } from "react-icons/sl";

const Header = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input />
            <TfiSearch style={{ color: "grey", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>Just The Scraps.</Logo>
        </Center>
        <Right>
          <h2>LOGOUT</h2>
          <CartIcon>
            <SlBag />
          </CartIcon>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  height: 60px;
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

const SearchContainer = styled.div`
  border: 0.5px solid lightblue;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
`;

const Logo = styled.h1`
  font-weight: bold;
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const CartIcon = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;
