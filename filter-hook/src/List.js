import React from "react";
import PropTypes from "prop-types";

import "./List.css";

function List( {wordList} ) {

  const listCode = wordList.map( v => <option value={v} key={v} label={v}></option>);

  return (
    <select className="result-block" multiple={true} size={6}>
      {listCode}
    </select>
  )
};

List.propTypes = {
  wordList: PropTypes.array.isRequired
};

export default List;