import React, { Fragment } from "react";
import PropTypes from "prop-types";

import WineShopBanner from "../components/WineShopBanner";
import PagesLinks from "../components/PagesLinks";
import WineControls from "../components/WineControls";
import WinePaginator from "../components/WinePaginator";

export const PageMain = ( {cbChangedFilter, cbChangedSort, cbChangeOutputType, loadState, wineItemCode, loadError, isShowPages,
  winesArrLength, winesPerPage, cbPaginate, currentPage} ) => {

    return (
      <Fragment>
        <WineShopBanner />
        <PagesLinks />
        <WineControls
          cbChangedFilter={cbChangedFilter}
          cbChangedSort={cbChangedSort}
          cbChangeOutputType={cbChangeOutputType}
        />

        <main className="main-items-block">
          { (loadState === 0) && <p className="main-inf-text">Нет информации о товарах</p> }
          { (loadState === 1) && <p className="main-inf-text">Загрузка информации...</p> }
          { (loadState === 2) &&  wineItemCode }
          { (loadState === 3) && <p className="main-inf-text">Error: {loadError}</p> }
        </main>

        { (isShowPages && winesArrLength > 12) && 
          <WinePaginator winesPerPage={winesPerPage} totalWines={winesArrLength} cbPaginate={cbPaginate} currentPage={currentPage} /> }
      </Fragment>
    );
  }

PageMain.propTypes = {
  cbChangedFilter: PropTypes.func.isRequired,
  cbChangedSort: PropTypes.func.isRequired,
  cbChangeOutputType: PropTypes.func.isRequired,
  loadState: PropTypes.number.isRequired,
  wineItemCode: PropTypes.array,
  loadError: PropTypes.string,
  isShowPages: PropTypes.bool.isRequired,
  winesArrLength: PropTypes.number,
  winesPerPage: PropTypes.number.isRequired,
  cbPaginate: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};