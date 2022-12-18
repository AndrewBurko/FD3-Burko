import React from "react";
import PropTypes from "prop-types";

import "./WinePaginator.css";

function WinePaginator( {winesPerPage, totalWines, cbPaginate, currentPage} ) {

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalWines / winesPerPage); i++) {
    pageNumbers.push(i);
  };

  function setPage(event) {
    event.preventDefault();
    cbPaginate(Number(event.target.innerText));
  };

  const paginatorCode = pageNumbers.map( number => (
    <li key={number} className="paginator-item">
      <a className={currentPage == number ? "paginator-link paginator-link_active" : "paginator-link"}
        href="#" onClick={setPage}>
          {number}
      </a>
    </li>
  ));

  return (
    <ul className="paginator-block">
      {paginatorCode}
    </ul>
  );
}

WinePaginator.propTypes = {
  winesPerPage: PropTypes.number.isRequired,
  totalWines: PropTypes.number.isRequired,
  cbPaginate: PropTypes.func.isRequired, 
  currentPage: PropTypes.number.isRequired,
};

export default WinePaginator;