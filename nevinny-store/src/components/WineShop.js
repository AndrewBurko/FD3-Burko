import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { winesLoad } from "../redux/winesLoad";
import { updateCart, setPageWines} from "../redux/winesSlice";
import WineShopHeader from "./WineShopHeader";
import PagesRouter from "../routes/PagesRouter";
import WineItem from "./WineItem";

function WineShop() {

  const location = useLocation();
  const dispatch = useDispatch();
  const wines = useSelector(state => state.wines);

  const [initialWinesArr, setInitialWinesArr] = useState(null);
  const [winesArr, setWinesArr] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [winesPerPage] = useState(12);
  const [isShowPages, setIsShowPages] = useState(false);

  if (wines.dataLoadState === 0) {
    dispatch(winesLoad);
  };

  // save info from localStorage
  useEffect( () => {
    if (localStorage.getItem("nevinnyShopCartData")) {
      const cartFromLocalStorage = JSON.parse(localStorage.getItem("nevinnyShopCartData"));
      dispatch(updateCart(cartFromLocalStorage));
    }
  }, []
  );

  // catch event before page reload and save current cart to localStorage
  window.addEventListener("beforeunload", saveCartToLocalStorage);

  function saveCartToLocalStorage() {
    localStorage.setItem("nevinnyShopCartData", JSON.stringify(wines.cart));
  };

  useEffect( () => {
    if (wines.dataLoadState === 2) {
      switch (location.pathname) {
        case "/italy":
          getItalyWines();
          break;
        case "/spain":
          getSpainWines();
          break;
        case "/france":
          getFranceWines();
          break;
        case "/new-world":
          getNewWorldWines();
          break;
        case "/":
          getAllWines();
          break;
        default:
          break;
      }
    };
  }, [location.pathname, wines.dataLoadState]
  );

  function getItalyWines() {
    const italyWines = wines.initialData.filter( v => v.region[0].toLowerCase() === "италия");
    dispatch(setPageWines(italyWines));
  };

  function getSpainWines() {
    const spainWines = wines.initialData.filter( v => v.region[0].toLowerCase() === "испания");
    dispatch(setPageWines(spainWines));
  };

  function getFranceWines() {
    const franceWines = wines.initialData.filter( v => v.region[0].toLowerCase() === "франция");
    dispatch(setPageWines(franceWines));
  };

  function getNewWorldWines() {
    const countries = ["аpгентина", "австралия", "чили", "новая зеландия", "юар", "сша"];
    const newWorldWines = [];
    for (let i = 0; i < wines.initialData.length; i++) {
      for (let j = 0; j < countries.length; j++) {
        if (wines.initialData[i].region[0].toLowerCase() === countries[j]) {
          newWorldWines.push(wines.initialData[i]);
        }
      }
    }
    dispatch(setPageWines(newWorldWines));
  };

  function getAllWines() {
    dispatch(setPageWines(wines.initialData));
  };

  useEffect( () => {
    if (wines.dataLoadState === 2) {
      setInitialWinesArr(wines.data);
      setWinesArr(wines.data);
    }
  }, [wines]
  );

  useEffect( () => {
    setCurrentPage(1);
  }, [location]
  );

  function changedFilter(filterText) {
    setCurrentPage(1);
    switch (filterText) {
      case "red":
        setWinesArr(initialWinesArr.filter( v => v.type.toLowerCase() === "красное"));
        break;
      case "white":
        setWinesArr(initialWinesArr.filter( v => v.type.toLowerCase() === "белое"));
        break;
      case "dry":
        setWinesArr(initialWinesArr.filter( v => v.sugar.toLowerCase() === "сухое"));
        break;
      case "semi-dry":
        setWinesArr(initialWinesArr.filter( v => v.sugar.toLowerCase() === "полусухое"));
        break;
      case "semi-sweet":
        setWinesArr(initialWinesArr.filter( v => v.sugar.toLowerCase() === "полусладкое"));
        break;
      case "sweet":
        setWinesArr(initialWinesArr.filter( v => v.sugar.toLowerCase() === "сладкое"));
        break;
      case "all":
        setWinesArr(initialWinesArr);
        break;
      default:
        break;
    }
  };

  function changedSort(sortType) {
    const sortedArr = [...winesArr];
    switch (sortType) {
      case "raiting-decrease":
        setWinesArr(sortedArr.sort( (a,b) => b.raiting - a.raiting));
        break;
      case "raiting-increase":
        setWinesArr(sortedArr.sort( (a,b) => a.raiting - b.raiting));
        break;
      case "price-decrease":
        setWinesArr(sortedArr.sort( (a,b) => b.price - a.price));
        break;
      case "price-increase":
        setWinesArr(sortedArr.sort( (a,b) => a.price - b.price));
        break;
      case "all":
        setWinesArr(initialWinesArr);
        break;
      default:
        break;
    }
  };

  function changeOutputType(state) {
    setIsShowPages(state);
  };

  function paginate(number) {
    setCurrentPage(number);
  };

  let wineItemCode;
  if (winesArr) {
    if (isShowPages) {
      const lastWineIndex = currentPage * winesPerPage;
      const firstWineIndex = lastWineIndex - winesPerPage;
      const currentPageWines = winesArr.slice(firstWineIndex, lastWineIndex);
      wineItemCode = currentPageWines.map( v =>
        <WineItem 
          key={v.id}
          item={v}
        />
      );
    } else {
      wineItemCode = winesArr.map( v =>
        <WineItem 
          key={v.id}
          item={v}
        />
      );
    }
  };

  return (
    <Fragment>
      <WineShopHeader />
      <PagesRouter
        cbChangedFilter={changedFilter}
        cbChangedSort={changedSort}
        cbChangeOutputType={changeOutputType}
        loadState={wines.dataLoadState}
        wineItemCode={wineItemCode}
        loadError={wines.dataLoadError}
        isShowPages={isShowPages}
        winesArrLength={winesArr ? winesArr.length : null}
        winesPerPage={winesPerPage}
        cbPaginate={paginate}
        currentPage={currentPage}
      />
    </Fragment>
  );
}

export default WineShop;