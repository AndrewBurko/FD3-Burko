import React, { Fragment } from "react";
import { useDispatch } from "react-redux";

import VineShopHeader from "./VineShopHeader";
import VineShopBanner from "./VineShopBanner";
import { vinesLoad } from "../redux/vinesLoad";
import PagesLinks from "./PagesLinks";
import PagesRouter from "../routes/PagesRouter";

function VineShop() {

  const dispatch = useDispatch();

  (function() {
    dispatch(vinesLoad);
  })();

  return (
    <Fragment>
      <VineShopHeader />
      <VineShopBanner />
      <PagesLinks />
      <PagesRouter />
    </Fragment>
  );
}

export default VineShop;