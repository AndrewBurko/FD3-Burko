import React from "react";
import ReactDOM from "react-dom";

import ShopBlock from "./components/ShopBlock";

import itemsArr from "./items.json";

const shopName = "AppleStore";

ReactDOM.render(
  <ShopBlock 
    name={shopName} 
    items={itemsArr}
  />, 
  document.querySelector("#root")
);