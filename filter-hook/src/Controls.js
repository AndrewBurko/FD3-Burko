import React, { Fragment } from "react";
import PropTypes from "prop-types";

import "./Controls.css";

function Controls( {sort, cbSwitchSort, currentFilterText, cbChangeFilterText, cbClearAll} ) {

  return (
    <Fragment>
      <input type="checkbox" checked={sort} onChange={ (event) => cbSwitchSort(event.target.checked) } />
      <input type="text" value={currentFilterText} onInput={ (event) => cbChangeFilterText(event.target.value) } />
      <input type="button" className="clear-btn" value="сброс" onClick={cbClearAll} />
    </Fragment>
  )
};

Controls.propTypes = {
  sort: PropTypes.bool.isRequired,
  cbSwitchSort: PropTypes.func.isRequired,
  currentFilterText: PropTypes.string.isRequired,
  cbChangeFilterText: PropTypes.func.isRequired,
  cbClearAll: PropTypes.func.isRequired
};

export default Controls;