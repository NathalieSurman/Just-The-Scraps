import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import Home from "./components/Home";
import styled from "styled-components";

const App = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <Wrapper>
      <Home />
      {/* {isAuthenticated ? <LogoutButton /> : <LoginButton />} */}
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div``;
