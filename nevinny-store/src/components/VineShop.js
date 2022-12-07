import React, { Fragment } from "react";

import VineShopHeader from "./VineShopHeader";
import VineShopBanner from "./VineShopBanner";
import PagesLinks from "./PagesLinks";
import PagesRouter from "../routes/PagesRouter";

function VineShop() {
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