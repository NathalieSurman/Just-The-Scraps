import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import MainPage from "./MainPage";

const Home = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <div>
      <LoginButton />
    </div>
  );
};

export default Home;
