import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

import Controls from "./Controls";
import List from "./List";
import "./Filter.css";

function Filter( {wordList} ) {

  const [currentList, setCurrentList] = useState(wordList);
  const [isSort, setIsSort] = useState(false);
  const [filterText, setFilterText] = useState("");

  const switchSort = (state) => setIsSort(state);
  const memoizedSwitchSort = useCallback(switchSort, []);

  const changeFilterText = (text) => setFilterText(text);
  const memoizedChangeFilterText = useCallback(changeFilterText, []);

  const clearAll = () => {
    setIsSort(false);
    setFilterText("");
  }
  const memoizedClearAll = useCallback(clearAll, []);

  useEffect( () => {
    let words;

    if (filterText) {
      words = wordList.filter( v => v.includes(filterText));
    } else {
      words = [...wordList];
    }

    if (isSort) {
      words.sort();
    }

    setCurrentList(words);
    },
    [isSort, filterText, wordList]
  );

  return (
    <div className="filter-block">
      <Controls
        sort={isSort}
        cbSwitchSort={memoizedSwitchSort}
        currentFilterText={filterText}
        cbChangeFilterText={memoizedChangeFilterText}
        cbClearAll={memoizedClearAll}
      />
      <List
        wordList={currentList}
      />
    </div>
  )
};

Filter.propTypes = {
  wordList: PropTypes.array.isRequired
};

export default Filter;