import React from "react";

import "./WineShopBanner.css";

function WineShopBanner() {
  return (
    <div className="banner-block">
      <div className="banner-shadow-block">
        <div className="banner-text-wrap">
          <div className="banner-title-text">
            Огромный выбор вина<br />
            со всего мира
            <div className="banner-title-shadow-text">
              Огромный выбор вина<br />
              со всего мира
            </div>
          </div>
          <div className="banner-slogan-shadow-block"></div>
          <div className="banner-slogan-block">
            <span className="banner-slogan-text">Цены приятно удивят!</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WineShopBanner;