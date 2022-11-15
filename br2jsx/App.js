import React from "react";
import ReactDOM from "react-dom";
import BR2JSX from "./src/BR2JSX";

const text = "первый<br>второй<br/>третий<br />последний";

ReactDOM.render(
  <BR2JSX
    text={text}
  />,
  document.querySelector("#root")
);