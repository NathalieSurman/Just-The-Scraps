import { useAuth0 } from "@auth0/auth0-react";
import Home from "./components/Home";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import AllFabric from "./components/AllFabric";
import FabricDetail from "./components/FabricDetail";
import Profile from "./components/Profile";
import Header from "./components/Header";
import FiberCategory from "./components/FiberCategory";

const App = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <Router>
      <Wrapper>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/fabric" element={<AllFabric />} />
          <Route path="/fabric/:_id" element={<FabricDetail />} />
          <Route path="/categories" element={<FiberCategory />} />
        </Routes>
      </Wrapper>
    </Router>
  );
};

export default App;

const Wrapper = styled.div`
  /* width: 100vw; */
  height: 100vh;
`;
