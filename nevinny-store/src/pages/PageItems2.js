import React, { Fragment } from "react";

import VineShopBanner from "../components/VineShopBanner";
import VineShop from "../components/VineShop";
import PagesLinks from "../components/PagesLinks";

export const PageItems2 = () => {
  return (
    <Fragment>
      <h1>Это страница с вином №2</h1>
      <VineShopBanner />
      <PagesLinks />
      <VineShop />
    </Fragment>
  );
}