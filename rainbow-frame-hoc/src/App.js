import React, { Fragment } from "react";
import DoubleButton from "./DoubleButton";
import { withRainbowFrame } from "./withRainbowFrame";
import "./App.css";

class App extends React.Component{

  colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];

  pressed = (number) => alert(number);

  render() {
    const FramedDoubleButton = withRainbowFrame(this.colors)(DoubleButton);
    return (
      <Fragment>
        <DoubleButton
          caption1="Однажды"
          caption2="пору"
          cbPressed={this.pressed}>
            в студёную зимнюю
        </DoubleButton>

        <FramedDoubleButton
          caption1="я из лесу"
          caption2="мороз"
          cbPressed={this.pressed}>
            вышел, был сильный
        </FramedDoubleButton>
      </Fragment>
    )
  };
}

export default App;