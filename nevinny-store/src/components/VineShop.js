import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { vinesLoad } from "../redux/vinesLoad";
import VineItem from "./VineItem";

import "./VineShop.css";

function VineShop() {

  const dispatch = useDispatch();
  const vines = useSelector(state => state.vines);

  if (vines.dataLoadState === 0) {
    dispatch(vinesLoad);
  };

  let vineItemCode;
  if (vines.dataLoadState === 2) {
    vineItemCode = vines.data.map( v =>
      <VineItem 
        key={v.id}
        item={v}
      />
    );
  };

  console.log("VineShop is Rendering");

  return (
    <main className="main-items-block">
      { (vines.dataLoadState === 0) && <p className="main-inf-text">Нет информации о товарах</p> }
      { (vines.dataLoadState === 1) && <p className="main-inf-text">Загрузка информации...</p> }
      { (vines.dataLoadState === 2) &&  vineItemCode }
      { (vines.dataLoadState === 3) && <p className="main-inf-text">Error: {vines.dataLoadError}</p> }
    </main>
  );
}

export default VineShop;