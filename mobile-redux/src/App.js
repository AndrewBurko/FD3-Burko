import React from "react";

import MobileCompany from "./MobileCompany";
import clientsArr from "./clientsArr.json";

function App() {
  return (
    <MobileCompany
      clientsArr={clientsArr}
    />
  );
}

export default App;