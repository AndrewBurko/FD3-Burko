import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import CartWineItem from "./CartWineItem";
import CartResultBlock from "./CartResultBlock";
import PagesLinks from "./PagesLinks";

import "./WineCart.css";

function WineCart() {

  const [itemsAmount, setItemsAmount] = useState(0);

  const itemsInCart = useSelector(state => state.wines.cart);

  const amount = itemsInCart.reduce( (r, v) => r + v.amount, 0);
  if (itemsAmount !== amount) {
    setItemsAmount(amount);
  };

  let cartItemsCode;
  if (itemsInCart.length > 0) {
    cartItemsCode = itemsInCart.map( v =>
      <CartWineItem
        key={v.item.id}
        amount={v.amount}
        item={v.item}
      />
    );
  };

  return (
    <Fragment>
      <PagesLinks />

      <div className="cart-header">
        <NavLink to="/" className="cart-link">&#65124; к выбору вина</NavLink>
        <div className="cart-decoration-block"></div>
        <h1 className="cart-title">Корзина</h1>
        <span className="cart-title-info">(товаров в корзине: {itemsAmount})</span>
      </div>

      <div className="cart-items-block">
        {cartItemsCode}
      </div>

      <CartResultBlock />
    </Fragment>
  );
}

export default WineCart;