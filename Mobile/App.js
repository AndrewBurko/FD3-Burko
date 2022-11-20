import React from "react";
import ReactDOM from "react-dom";

import MobileCompany from "./src/MobileCompany";
import clientsArr from "./clientsArr.json";

ReactDOM.render(
  <MobileCompany
    clients={clientsArr}
  />,
  document.querySelector("#root")
);