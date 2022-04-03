import React from "react";
import { BrowserRouter } from "react-router-dom";
import Base from "./modules/core/Base";
import Routes from "./Routes";
import "./App.css";
// import { GlobalProvider } from "./context/Provider";

export default function App() {
  return (
    <BrowserRouter>
    {/* <GlobalProvider> */}
        <Base>
          <Routes />
        </Base>
    {/* </GlobalProvider> */}
      </BrowserRouter>
  );
}
