import React from "react";
import { Route, Routes} from "react-router-dom";

import { PageMain } from "../pages/PageMain";
import { PageItems1 } from "../pages/PageItems1";
import { PageItems2 } from "../pages/PageItems2";
import { PageItems3 } from "../pages/PageItems3";
import { PageItems4 } from "../pages/PageItems4";
import { PageCart } from "../pages/PageCart";

function PagesRouter() {
  return (
    <Routes>
      <Route path="/" element={<PageMain/>} />
      <Route path="/items-page1" element={<PageItems1/>} />
      <Route path="/items-page2" element={<PageItems2/>} />
      <Route path="/items-page3" element={<PageItems3/>} />
      <Route path="/items-page4" element={<PageItems4/>} />
      <Route path="/cart" element={<PageCart/>} />
    </Routes>
  );
}

export default PagesRouter;