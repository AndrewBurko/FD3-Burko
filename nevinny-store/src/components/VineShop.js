import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import VineShopHeader from "./VineShopHeader";
import VineShopBanner from "./VineShopBanner";
import { vinesLoad } from "../redux/vinesLoad";
import VineItem from "./VineItem";
import PagesLinks from "./PagesLinks";
import PagesRouter from "../routes/PagesRouter";

import "./VineShop.css";
import { addItemToCart } from "../redux/vinesSlice";

function VineShop() {

  const dispatch = useDispatch();

  const vines = useSelector(state => state.vines);

  useEffect( () => {
    dispatch(vinesLoad);
  }, []);

  let vineItemCode;
  if (vines.dataLoadState === 2) {
    vineItemCode = vines.data.map( v =>
      <VineItem 
        key={v.id}
        item={v}
      />
    );
  };

  return (
    <Fragment>
      <VineShopHeader />
      <VineShopBanner />
      <PagesLinks />
      <PagesRouter />
      <main className="main-items-block">
        { (vines.dataLoadState === 0) && <p className="main-inf-text">Нет информации о товарах</p> }
        { (vines.dataLoadState === 1) && <p className="main-inf-text">Загрузка информации...</p> }
        { (vines.dataLoadState === 2) &&  vineItemCode }
        { (vines.dataLoadState === 3) && <p className="main-inf-text">Error: {vines.dataLoadError}</p> }
      </main>
    </Fragment>
  );
}

export default VineShop;