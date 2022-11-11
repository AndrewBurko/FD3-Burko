import React, { Fragment } from "react";
import PropTypes from "prop-types";

import "./ShopBlock.css";

import ShopItem from "./ShopItem";
import ItemCardReadOnly from "./ItemCardReadOnly";
import ItemCardEditOrCreate from "./ItemCardEditOrCreate";

class ShopBlock extends React.Component{

  displayName = "ShopBlock";

  static propTypes = {
    name: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        itemImgUrl: PropTypes.string.isRequired,
        itemName: PropTypes.string.isRequired,
        itemYear: PropTypes.number.isRequired,
        itemMemory: PropTypes.number.isRequired,
        itemPrice: PropTypes.number.isRequired,
        itemRest: PropTypes.number.isRequired,
        itemID: PropTypes.number.isRequired,
      })
    ),
  };

  state = {
    currentItems: this.props.items,
    selectedItem: null,
    selectedItemID: null,
    deletedItem: null,
    workMode: 0, //0-show only items, 1-show item card, 2-edit item, 3-add new item
    itemCardChanged: false,
    newItemID: null,
  };

  selectItem = (id) => {
    if (!this.state.itemCardChanged) {
      const selectedItem = this.state.currentItems.find( v => v.itemID === id);
      this.setState({selectedItem: selectedItem, selectedItemID: id, workMode: 1});
    }
  };

  deleteItem = (id) => {
    if (confirm("Вы действительно хотите удалить данный товар?")) {
      this.setState({currentItems: this.state.currentItems.filter( v => 
        v.itemID !== id), selectedItem: null, selectedItemID: null, workMode: 0});
    }
  };

  editItem = () => {
    this.setState({workMode: 2});
  };

  updateBtns = (v) => {
    this.setState({itemCardChanged: v});
  };

  cancelChanges = () => {
    this.setState({workMode: 0, itemCardChanged: false, selectItem: null, selectedItemID: null});
  };

  saveItem = (obj) => {
    if (this.state.workMode === 2) {
      const currentItem = this.state.currentItems.find( v => v.itemID === obj.itemID);
      currentItem.itemImgUrl = obj.itemImgUrl;
      currentItem.itemName = obj.itemName;
      currentItem.itemYear = obj.itemYear;
      currentItem.itemMemory = obj.itemMemory;
      currentItem.itemPrice = obj.itemPrice;
      currentItem.itemRest = obj.itemRest;
    }
    else {
      this.state.currentItems.push(obj);
    }
    this.setState({workMode: 0, itemCardChanged: false});
  };

  addNewItem = () => {
    this.setState({workMode: 3, selectedItem: null, selectedItemID: null, itemCardChanged: true,
      newItemID: this.state.currentItems[this.state.currentItems.length-1].itemID+1});
  };

  render() {
    const itemsCode = this.state.currentItems.map( v =>
      <ShopItem 
        itemImgUrl = {v.itemImgUrl} 
        itemName = {v.itemName} 
        itemYear = {v.itemYear} 
        itemMemory = {v.itemMemory} 
        itemPrice = {v.itemPrice} 
        itemRest = {v.itemRest} 
        key = {v.itemID}
        itemID = {v.itemID} 
        cbSelectItem = {this.selectItem} 
        selectedItemID = {this.state.selectedItemID}
        cbDeleteItem = {this.deleteItem}
        cbEditItem = {this.editItem}
        btnsState = {this.state.itemCardChanged}
      />
    );

    return (
      <Fragment>
        <h1 className="shop-name">{this.props.name}</h1>
        <div className="wrap">
          <div className="shop-block">
            <table className="items-table">
              <thead>
                <tr>
                  <th>Фото</th>
                  <th>Название</th>
                  <th>Год</th>
                  <th>Объем памяти</th>
                  <th>Цена</th>
                  <th>Остаток</th>
                  <th>Управление</th>
                </tr>
              </thead>
              <tbody>{itemsCode}</tbody>
            </table>
            <input className="add-item-btn" type="button" value="Новый продукт" disabled={this.state.itemCardChanged}
            onClick={this.addNewItem} />
          </div>

          {
          this.state.selectedItem && this.state.workMode === 1 &&
            <ItemCardReadOnly
            item={this.state.selectedItem}
            />
          }

          {
          (this.state.workMode === 2 || this.state.workMode === 3) &&
            <ItemCardEditOrCreate
            item={this.state.selectedItem}
            newItemID={this.state.newItemID}
            workMode={this.state.workMode}
            cbUpdateBtns={this.updateBtns}
            key={this.state.selectedItemID}
            cbCancelChanges={this.cancelChanges}
            cbSaveItem={this.saveItem}
            />
          }
        </div>
      </Fragment>
    );
  }
}

export default ShopBlock;