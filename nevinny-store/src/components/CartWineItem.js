import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { changeItemAmount, deleteItemFromCart } from "../redux/winesSlice";

import "./CartWineItem.css";

function CartWineItem( {amount, item} ) {

  const [currentPrice, setCurrentPrice] = useState(amount * item.price);

  const dispatch = useDispatch();

  function increaseAmount() {
    const newAmount = amount + 1;
    setCurrentPrice(newAmount * item.price);
    dispatch(changeItemAmount( {currentItemId: item.id, currentAmount: newAmount} ));
  };

  function decreaseAmount(event) {
    const newAmount = amount - 1;
    if (newAmount > 0) {
      setCurrentPrice(newAmount * item.price);
      dispatch(changeItemAmount( {currentItemId: item.id, currentAmount: newAmount} ));
    } else {
      deleteItem(event);
    }
  };

  function deleteItem(event) {
    event.nativeEvent.path[4].classList.add("deleted-item");
    setTimeout( () => {
      dispatch(deleteItemFromCart(item.id));
    }, 500);
  };

  return(
    <div className="cart-item-block">
      <div className="cart-item-img-block">
        <img className="cart-item-img" src={item.imgSmall} title={item.name} alt={item.name} />
      </div>
      <div className="cart-item-wrap">
        <div className="cart-item-info-block">
          <h2 className="cart-item-title">{item.name}</h2>
          <p className="cart-item-par">Тип: {item.type}, {item.sugar}</p>
          <p className="cart-item-par">Регион: {item.region.join(", ")}</p>
        </div>
        <div className="cart-item-btns-wrap">
          <div className="cart-item-count-block">
            <input className="cart-item-count-btn" type="button" value="-" onClick={decreaseAmount} />
            <span className="cart-item-count-text">{amount}</span>
            <input className="cart-item-count-btn" type="button" value="+" onClick={increaseAmount} />
          </div>
          <div className="cart-item-price-block">
            {currentPrice.toFixed(2)} &#8364;
          </div>
          <div className="cart-item-del-block">
            <input className="cart-item-del-btn" type="button" onClick={deleteItem} />
          </div>
        </div>
      </div>
    </div>
  );
}

CartWineItem.propTypes = {
  amount: PropTypes.number.isRequired,
  item: PropTypes.shape({
    alcohol: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    grapeSort: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
    imgBig: PropTypes.string.isRequired,
    imgSmall: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    production: PropTypes.string.isRequired,
    raiting: PropTypes.number.isRequired,
    region: PropTypes.array.isRequired,
    sugar: PropTypes.string.isRequired,
    volume: PropTypes.number.isRequired,
  }),
};

export default CartWineItem;