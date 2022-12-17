import React, { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import "./WineShopHeader.css";

function WineShopHeader() {

  const [itemsAmount, setItemsAmount] = useState(0);

  const itemsInCart = useSelector(state => state.wines.cart);

  const amount = itemsInCart.reduce( (r, v) => r + v.amount, 0);
  if (itemsAmount !== amount) {
    setItemsAmount(amount);
  };

  const memoizeedRenderResult = useMemo( () => {

    return (
      <header>
        <NavLink to="/" className="header-title">Невинный</NavLink>

        <div className="header-contacts-block">
          <div className="header-contacts-icon-block">
            <div className="header-contacts-icon">
              <svg width="16" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M1.99329 3.249C2.20417 2.89915 3.36678 1.62917 4.19526 1.66751C4.44311 
                1.68873 4.66222 1.83798 4.84024 2.01187H4.84092C5.249 2.4117 6.41982 3.92062 6.48555 4.23829C6.64782 5.01739 5.7187 5.46651 
                6.00284 6.25178C6.72725 8.02428 7.97544 9.27236 9.74879 9.99602C10.5334 10.2808 10.9826 9.35246 11.7618 9.51404C12.0795 
                9.58045 13.5892 10.7505 13.9884 11.1592V11.1592C14.1616 11.3365 14.3123 11.5563 14.3328 11.8041C14.3636 12.677 13.0148 
                13.8553 12.7518 14.0059C12.1315 14.4502 11.3222 14.442 10.3356 13.9833C7.58243 12.8379 3.1826 8.52132 2.01588 5.66437C1.56946 
                4.6833 1.53934 3.86859 1.99329 3.249Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.71027 1.83331C12.1783 2.10731 14.1269 4.05398 14.4043 6.52131" stroke="white" strokeLinecap="round" 
                strokeLinejoin="round"/>
                <path d="M9.71027 4.19531C10.8903 4.42531 11.8123 5.34731 12.0423 6.52731" stroke="white" strokeLinecap="round" 
                strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <p className="header-contacts-title">
            Контакты:
          </p>
          <a className="header-contacts-phone" href="tel: +375291111111">+375 (29) 111-11-11</a>
        </div>

        <NavLink to="/cart" className="header-cart-link">
          <div className="header-cart-block">
            <div className="header-cart-text">
              Корзина
            </div>
            <div className="header-cart-line"></div>
            <div className="header-cart-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M7.42245 19.8203C7.84445 19.8203 8.18745 20.1633 8.18745 20.5853C8.18745 
                21.0073 7.84445 21.3493 7.42245 21.3493C7.00045 21.3493 6.65845 21.0073 6.65845 20.5853C6.65845 20.1633 7.00045 19.8203 
                7.42245 19.8203Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M18.6749 19.8203C19.0969 19.8203 19.4399 20.1633 19.4399 20.5853C19.4399 
                21.0073 19.0969 21.3493 18.6749 21.3493C18.2529 21.3493 17.9099 21.0073 17.9099 20.5853C17.9099 20.1633 18.2529 19.8203 
                18.6749 19.8203Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2.75 3.25L4.83 3.61L5.793 15.083C5.871 16.018 6.652 16.736 7.59 16.736H18.502C19.398 16.736 20.158 16.078 20.287 
                15.19L21.236 8.632C21.353 7.823 20.726 7.099 19.909 7.099H5.164" stroke="white" strokeWidth="1.5" strokeLinecap="round" 
                strokeLinejoin="round"/>
                <path d="M14.1255 10.795H16.8985" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className={itemsAmount > 0 ? "header-cart-sticker" : "header-cart-sticker_hidden"}>
                {itemsAmount}
              </div>
            </div>
          </div>
        </NavLink>
      </header>
    );
  }, [itemsAmount]
  );

  return memoizeedRenderResult;
}

export default WineShopHeader;