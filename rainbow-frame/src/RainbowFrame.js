import React from "react";
import PropTypes from "prop-types";
import "./RainbowFrame.css";

class RainbowFrame extends React.Component{
  displayName = "RainbowFrame";

  static propTypes = {
    colors: PropTypes.array.isRequired,
  };

  render() {
    let frameCode = this.props.children;

    for (let i of this.props.colors) {
      frameCode = <div className="rainbow-div" style={{borderColor: i}}>{frameCode}</div>;
    }

    return frameCode;
  }
}

export default RainbowFrame;