import React from "react";
import PropTypes from "prop-types";

import "./ShopItem.css";

class ShopItem extends React.Component{

  displayName = "ShopItem";

  static propTypes = {
    itemImgUrl: PropTypes.string.isRequired,
    itemName: PropTypes.string.isRequired,
    itemYear: PropTypes.number.isRequired,
    itemMemory: PropTypes.number.isRequired,
    itemPrice: PropTypes.number.isRequired,
    itemRest: PropTypes.number.isRequired,
    itemID: PropTypes.number.isRequired,
    cbSelectItem: PropTypes.func.isRequired,
    selectedItemID: PropTypes.number,
    cbDeleteItem: PropTypes.func.isRequired,
    cbEditItem: PropTypes.func.isRequired,
    btnsState: PropTypes.bool.isRequired,
  };

  selectItem = (event) => {
    if (event.target.className !== "item-dell-btn") {
      this.props.cbSelectItem(Number(event.currentTarget.dataset.itemcode));
    }
  };

  deleteItem = (event) => {
    this.props.cbDeleteItem(Number(event.target.dataset.itemcode));
  };

  editItem = (event) => {
    event.stopPropagation();
    this.props.cbSelectItem(this.props.itemID);
    this.props.cbEditItem();
  }

  render() {
    return (
      <tr className={this.props.selectedItemID === this.props.itemID ? "shop-item_selected" : null} 
      data-itemcode={this.props.itemID} onClick={this.selectItem}>
        <td className="item-cell">
          <img className="item-img" src={this.props.itemImgUrl} title={this.props.itemName} alt={this.props.itemName} />
        </td>
        <td className="item-cell">{this.props.itemName}</td>
        <td className="item-cell">{this.props.itemYear}</td>
        <td className="item-cell">{this.props.itemMemory} ГБ</td>
        <td className="item-cell">{this.props.itemPrice} бел. руб.</td>
        <td className="item-cell">{this.props.itemRest} шт.</td>
        <td className="item-cell">
          <input className="item-edit-btn" type="button" value="Изменить" disabled={this.props.btnsState} onClick={this.editItem} />
          <input className="item-dell-btn" type="button" value="Удалить" data-itemcode={this.props.itemID} disabled={this.props.btnsState}
          onClick={this.deleteItem} />
        </td>
      </tr>
    );
  }
}

export default ShopItem;