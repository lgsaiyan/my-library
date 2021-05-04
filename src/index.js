import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./App.css";
import { GeneralProvider } from "./contexts/General";

ReactDOM.render(
  <GeneralProvider>
    <App />
  </GeneralProvider>,
  document.getElementById("root")
);
