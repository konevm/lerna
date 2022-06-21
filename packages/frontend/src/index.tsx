import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.scss";
import App from "./App";

const newClientId = "864014744067-ltncttbt440rs9sjh70e1qt4cnd2rmhd.apps.googleusercontent.com";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={newClientId}>
        <App />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </Provider>
);
