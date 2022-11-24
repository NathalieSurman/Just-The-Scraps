import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import Home from "./components/Home";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import AllFabric from "./components/AllFabric";
import FabricDetail from "./components/FabricDetail";
import Cart from "./components/cart/Cart";

const App = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <Router>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/fabric" element={<AllFabric />} />
          <Route path="/fabric/:_id" element={<FabricDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Wrapper>
    </Router>
  );
};

export default App;

const Wrapper = styled.div``;
