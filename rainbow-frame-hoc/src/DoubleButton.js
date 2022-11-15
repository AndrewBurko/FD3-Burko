import React from "react";
import PropTypes from "prop-types";

class DoubleButton extends React.Component{

  static propTypes = {
    caption1: PropTypes.string.isRequired,
    caption2: PropTypes.string.isRequired,
    cbPressed: PropTypes.func.isRequired,
  };

  btnPressed = (event) => this.props.cbPressed(event.target.name);

  render() {
    return (
      <div className="doublebtn-block">
        <input type="button" value={this.props.caption1} name={1} onClick={this.btnPressed} />
          {this.props.children}
        <input type="button" value={this.props.caption2} name={2} onClick={this.btnPressed} />
      </div>
    )
  };
}

export default DoubleButton;