import React, { Fragment } from "react";

import VineShopBanner from "../components/VineShopBanner";
import PagesLinks from "../components/PagesLinks";
import VineShop from "../components/VineShop";

export const PageMain = () => {
  return (
    <Fragment>
      <VineShopBanner />
      <PagesLinks />
      <VineShop />
    </Fragment>
  );
}