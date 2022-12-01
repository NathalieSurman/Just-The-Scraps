import { useAuth0 } from "@auth0/auth0-react";
import Home from "./components/Home";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import MainPage from "./components/MainPage";
import AllFabric from "./components/AllFabric";
import FabricDetail from "./components/FabricDetail";
import Profile from "./components/Profile";
import Header from "./components/Header";
import FiberCategory from "./components/FiberCategory";
import About from "./components/About";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
const App = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  let location = useLocation();
  console.log(location);

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <Wrapper>
      <Header />

      {isAuthenticated ? (
        //----We want to check if the user login  then they can see the website and can get the products ----//
        <Routes>
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/fabric" element={<AllFabric />} />
          <Route path="/about" element={<About />} />
          <Route path="/fabric/:_id" element={<FabricDetail />} />
          <Route path="/categories" element={<FiberCategory />} />
          <Route path="*" element={<MainPage />} />
        </Routes>
      ) : (
        //-----But if they don't login then they won't see anything on the website or the products ----//
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      )}
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  /* width: 100vw; */
  height: 100vh;
`;
