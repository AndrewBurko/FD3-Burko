import React from "react";
import { Provider } from "react-redux";

import { store } from "./redux/store";

import MobileCompany from "./components/MobileCompany";

function App() {
  return (
    <Provider store={store}>
      <MobileCompany />
    </Provider>
  );
}

export default App;