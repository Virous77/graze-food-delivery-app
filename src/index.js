import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserAuthContextProvider } from "./store/authContext";
import { AdminContextProvider } from "./store/adminContext";
import Store from "./store/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserAuthContextProvider>
        <AdminContextProvider>
          <Provider store={Store}>
            <App />
          </Provider>
        </AdminContextProvider>
      </UserAuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
