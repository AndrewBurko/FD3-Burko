import React from "react";
import PropTypes from "prop-types";

import "./ItemCardReadOnly.css";

class ItemCardReadOnly extends React.Component{

  displayName = "ItemCardReadOnly";

  static propTypes = {
    item: PropTypes.shape({
      itemImgUrl: PropTypes.string.isRequired,
      itemName: PropTypes.string.isRequired,
      itemYear: PropTypes.number.isRequired,
      itemMemory: PropTypes.number.isRequired,
      itemPrice: PropTypes.number.isRequired,
      itemRest: PropTypes.number.isRequired,
      itemID: PropTypes.number.isRequired,
    }).isRequired,
  }

  render() {
    return (
      <div className="itemcard-block">
        <h2 className="itemcard-header">{this.props.item.itemName}</h2>
        <img className="itemcard-img" src={this.props.item.itemImgUrl} title={this.props.item.itemName} alt={this.props.item.itemName} />
        <p className="itemcard-paragraph">Год выпуска: {this.props.item.itemYear}</p>
        <p className="itemcard-paragraph">Встроенная память: {this.props.item.itemMemory} ГБ</p>
        <p className="itemcard-paragraph">Цена: {this.props.item.itemPrice} бел. руб.</p>
      </div>
    )
  }
}

export default ItemCardReadOnly;