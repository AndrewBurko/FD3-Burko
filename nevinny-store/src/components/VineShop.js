import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { vinesLoad } from "../redux/vinesLoad";
import VineItem from "./VineItem";
import { updateCart } from "../redux/vinesSlice";

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

  // обрабатываем событие перед перезагрузкой страницы или закрытии вкладки
  window.addEventListener("beforeunload", saveCartToLocalStorage);

  function saveCartToLocalStorage() {
    localStorage.setItem("nevinnyShopCartData", JSON.stringify(vines.cart));
  };

  // если LocalStorage не пустой сохраняем информацию в корзину
  useEffect( () => {
    if (localStorage.getItem("nevinnyShopCartData")) {
      const cartFromLocalStorage = JSON.parse(localStorage.getItem("nevinnyShopCartData"))
      dispatch(updateCart(cartFromLocalStorage));
    }
  },[]);

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