import React from "react";
import PropTypes from "prop-types";
import "./BR2JSX.css";

class BR2JSX extends React.Component{

  static propTypes = {
    text: PropTypes.string.isRequired,
  };

  render() {
    // variant 1
    //const textArr = this.props.text.split("<").map( v => v.slice(v.indexOf(">")+1));

    // variant 2
    const textArr = this.props.text.replaceAll("<br/>", "<br>").replaceAll("<br />", "<br>").split("<br>");

    const newArr = [];
    for (let i = 0; i < textArr.length; i++) {
      newArr.push(textArr[i]);
      if (i !== textArr.length-1) {
        newArr.push(<br key={i} />);
      }
    }
    return (
      <div className="br2jsx">
        {newArr}
      </div>
    )
  };
}

export default BR2JSX;