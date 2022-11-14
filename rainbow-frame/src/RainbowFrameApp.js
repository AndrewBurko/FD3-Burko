import React from "react";
import RainbowFrame from "./RainbowFrame";

class RainbowFrameApp extends React.Component{
  displayName = "RainbowFrameApp";

  colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];

  render() {
    return (
      <RainbowFrame colors={this.colors}>
        Hello!
      </RainbowFrame>
    );
  }
}

export default RainbowFrameApp;