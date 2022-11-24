import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <div>
      <h1>Hello there</h1>
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </div>
  );
};

export default App;
