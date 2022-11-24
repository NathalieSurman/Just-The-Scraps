import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import CartProvider from "./components/cart/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

root.render(
  <React.StrictMode>
    <CartProvider>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri={window.location.origin}
      >
        <App />
      </Auth0Provider>
    </CartProvider>
  </React.StrictMode>
);
