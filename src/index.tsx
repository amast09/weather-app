// This file is not in the client/ directory because I didn't want to eject out
// of create react app

import React from "react";
import ReactDOM from "react-dom";
import App from "./client/App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
