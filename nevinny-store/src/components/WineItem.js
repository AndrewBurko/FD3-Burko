import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { addItemToCart, changeItemAmount, deleteItemFromCart } from "../redux/winesSlice";

import "./WineItem.css";

function WineItem( {item} ) {

  const [itemAmount, setItemAmount] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(null);

  const itemsInCart = useSelector(state => state.wines.cart);
  const dispatch = useDispatch();

  useEffect( () => {
    const cartItem = itemsInCart.find( v => v.item.id === item.id);
    if (cartItem) {
      setItemAmount(cartItem.amount);
      setCurrentPrice(cartItem.amount * item.price);
    } else {
      setItemAmount(0);
      setCurrentPrice(null);
    }
  }, [itemsInCart]);

  function productSelected() {
    const itemInCart = {
      item: item,
      amount: 1,
    };
    dispatch(addItemToCart(itemInCart));
  };

  function increaseItemAmount() {
    const amount = itemAmount + 1;
    dispatch(changeItemAmount( {currentItemId: item.id, currentAmount: amount} ));
  };

  function decreaseItemAmount() {
    const amount = itemAmount - 1;
    dispatch(changeItemAmount( {currentItemId: item.id, currentAmount: amount} ));
    if (amount === 0) {
      dispatch(deleteItemFromCart(item.id));
    }
  };

  const memoizeedRenderResult = useMemo( () => {

    return (
      <div className="item-card">
        <div className="item-img-block">
          <img className="item-img" src={item.imgSmall} title={item.name} alt={item.name} />
        </div>
        <div className="item-raiting-block">
          {item.raiting.toFixed(1)}
        </div>
        <div className="item-info-block">
          <p className="item-info-str">{item.alcohol.toFixed(1)}%</p>
          <p className="item-info-str">{item.volume} л</p>
          <p className="item-info-str">{item.region[0]}</p>
        </div>
        <div className={itemAmount > 0 ? "item-sticker" : "item-sticker_hidden"}>{itemAmount}</div>
        <div className="item-description-block">
          <h2 className="item-description-title">{item.name}</h2>
          <div className="item-description-par">
            <div className="item-description-icon"></div>
            {item.type} {item.sugar}
          </div>
          <div className="item-description-par">
            <div className="item-description-icon"></div>
            {item.grapeSort.length === 1 ? item.grapeSort[0] : (item.grapeSort[0] + " +")}
          </div>

          <div className="item-controls-wrap">
            {itemAmount === 0 ?
              <div className="item-controls-block">
                <p className="item-controls-par">
                  {item.price} &#8364;
                </p>
                <div className="item-controls-btn" onClick={productSelected}>
                  В корзину
                  <div className="item-controls-icon"></div>
                </div>
              </div>
              :
              <div className="item-controls-block">
                <input className="item-controls-increment-btn" type="button" value="-" onClick={decreaseItemAmount} />
                <p className="item-controls-par">
                  {currentPrice.toFixed(2)} &#8364;
                </p>
                <input className="item-controls-increment-btn" type="button" value="+" onClick={increaseItemAmount} />
              </div>
            }
          </div>
        </div>
      </div>
    );
  }, [itemAmount]
  );
  return memoizeedRenderResult;
}

WineItem.propTypes = {
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

export default WineItem;