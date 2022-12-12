import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./redux/store";
import VineShop from "./components/VineShop";

//Это нужно для загрузки информации в БД

import database from "./firebase-config";
import { ref, set } from "firebase/database";
import vines from "./items.json";

function writeUserData(obj) {
  set(ref(database, 'vines/'), obj);
};
writeUserData(vines);

//конец

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <VineShop />
      </Provider>
    </BrowserRouter>
  );
}

export default App;