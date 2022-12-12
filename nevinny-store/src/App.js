import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./redux/store";
import VineShopHeader from "./components/VineShopHeader";
import PagesRouter from "./routes/PagesRouter";

//Это нужно для загрузки информации в БД
import database from "./firebase-config";
import { ref, set } from "firebase/database";
import vines from "./items.json";

function writeVinesData(obj) {
  set(ref(database, 'vines/'), obj);
};
writeVinesData(vines);
//конец

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <VineShopHeader />
        <PagesRouter />
      </Provider>
    </BrowserRouter>
  );
}

export default App;