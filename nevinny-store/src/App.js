import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./redux/store";

import VineShop from "./components/VineShop";

function App() {
  return (
    <BrowserRouter>
      {/* <Provider store={store}> */}
        <VineShop />
      {/* </Provider> */}
    </BrowserRouter>
  );
}

export default App;