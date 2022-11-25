import React from "react";
import Filter from "./Filter";

const wordListArr = ['california', 'everything', 'aboveboard', 'washington', 'basketball', 'weathering', 'characters', 'literature', 
  'contraband', 'appreciate'];

function App() {
  return (
    <Filter wordList={wordListArr} />
  );
}

export default App;