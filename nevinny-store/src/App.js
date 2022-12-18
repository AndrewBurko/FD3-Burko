import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./redux/store";
import WineShop from "./components/WineShop";

/* this code use for upload info from json-file to Firebase database
import database from "./firebase-config";
import { ref, set } from "firebase/database";
import wines from "./items.json";

function uploadWinesData(obj) {
  set(ref(database, 'wines/'), obj);
};
uploadWinesData(wines);
end */

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <WineShop />
      </Provider>
    </BrowserRouter>
  );
}

export default App;