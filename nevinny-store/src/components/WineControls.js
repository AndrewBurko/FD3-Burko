import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

import "./WineControls.css";

function WineControls( {cbChangedFilter, cbChangedSort, cbChangeOutputType} ) {

  const [filterValue, setFilterValue] = useState("all");
  const [sortValue, setSortValue] = useState("all");
  const [isShowPages, setIsShowPages] = useState("all");

  const location = useLocation();

  useEffect( () => {
    setFilterValue("all");
    setSortValue("all");
  }, [location]
  );

  function switchFilter(event) {
    cbChangedFilter(event.target.value);
    setFilterValue(event.target.value);
  };

  function switchSort(event) {
    cbChangedSort(event.target.value);
    setSortValue(event.target.value);
  };

  function switchIsShowPages(event) {
    const state = event.target.value === "page" ? true : false;
    setIsShowPages(event.target.value);
    cbChangeOutputType(state);
  };

  return (
    <div className="filter-and-sort-block">
      <div className="filter-select-wrap">
        <select name="filter-select" value={filterValue} onChange={switchFilter}>
          <option value="all">Без фильтра</option>
          <optgroup label="Цвет">
            <option value="red">Красное вино</option>
            <option value="white">Белое вино</option>
          </optgroup>
          <optgroup label="Тип">
            <option value="dry">Сухое</option>
            <option value="semi-dry">Полусухое</option>
            <option value="semi-sweet">Полусладкое</option>
            <option value="sweet">Сладкое</option>
          </optgroup>
        </select>
      </div>

      <div className="sort-select-wrap">
        <select name="sort-select" value={sortValue} onChange={switchSort}>
          <option value="all">Без сортировки</option>
          <option value="raiting-decrease">По убыванию рейтинга</option>
          <option value="raiting-increase">По возрастанию рейтинга</option>
          <option value="price-decrease">По убыванию цены</option>
          <option value="price-increase">По возрастанию цены</option>
        </select>
      </div>

      <div className="show-pages-wrap">
        <select name="show-pages-select" value={isShowPages} onChange={switchIsShowPages}>
          <option value="all">Показать весь список</option>
          <option value="page">Показать страницами</option>
        </select>
      </div>
    </div>
  );
}

WineControls.propTypes = {
  cbChangedFilter: PropTypes.func.isRequired,
  cbChangedSort: PropTypes.func.isRequired,
  cbChangeOutputType: PropTypes.func.isRequired,
};

export default WineControls;