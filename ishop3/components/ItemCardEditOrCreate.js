import React from "react";
import PropTypes from "prop-types";

import "./ItemCardEditOrCreate.css";

class ItemCardEditOrCreate extends React.Component{
  displayName = "ItemCardEditOrCreate";

  static propTypes = {
    item: PropTypes.shape({
      itemImgUrl: PropTypes.string,
      itemName: PropTypes.string,
      itemYear: PropTypes.number,
      itemMemory: PropTypes.number,
      itemPrice: PropTypes.number,
      itemRest: PropTypes.number,
      itemID: PropTypes.number,
    }),
    newItemID: PropTypes.number,
    workMode: PropTypes.number.isRequired,
    cbUpdateBtns: PropTypes.func.isRequired,
    cbCancelChanges: PropTypes.func.isRequired,
    cbSaveItem: PropTypes.func.isRequired,
  }

  state = {
    header: (this.props.workMode === 2 ? "Изменить товар" : "Добавить новый товар"),
    name: (this.props.workMode === 2 ? this.props.item.itemName : ""),
    year: (this.props.workMode === 2 ? this.props.item.itemYear : ""),
    memory: (this.props.workMode === 2 ? this.props.item.itemMemory : ""),
    price: (this.props.workMode === 2 ? this.props.item.itemPrice : ""),
    url: (this.props.workMode === 2 ? this.props.item.itemImgUrl : ""),
    quantity: (this.props.workMode === 2 ? this.props.item.itemRest : ""),
    ID: (this.props.workMode === 2 ? this.props.item.itemID : this.props.newItemID),
    errorNameText: "",
    errorYearText: "",
    errorMemoryText: "",
    errorPriceText: "",
    errorUrlText: "",
    errorQuantityText: "",
    itemCardChanged: false,
    saveBtnDisabled: (this.props.workMode === 2 ? false : true),
  }

  nameChanged = (event) => {
    this.disableBtns();

    this.setState({name: event.target.value});
    let errorText;

    event.target.value.length > 3 ? errorText = "" : errorText = "Заполните поле, введите название больше 3 символов!";

    this.setState({errorNameText: errorText});

    this.state.year && this.state.memory && this.state.price && this.state.url && this.state.quantity &&
    this.state.errorYearText === "" && this.state.errorMemoryText === "" && this.state.errorPriceText === "" &&
    this.state.errorUrlText === "" && this.state.errorQuantityText === "" && errorText === "" ?
    this.setState({saveBtnDisabled: false}) : this.setState({saveBtnDisabled: true});
  }

  yearChanged = (event) => {
    this.disableBtns();

    this.setState({year: event.target.value});
    let errorText;

    event.target.value % 1 === 0 && event.target.value >= 2010 && event.target.value <= new Date().getFullYear() ?
    errorText = "" : errorText = "Заполните поле, введите год от 2010 и до текущего!";

    this.setState({errorYearText: errorText});

    this.state.name && this.state.memory && this.state.price && this.state.url && this.state.quantity &&
    this.state.errorNameText === "" && this.state.errorMemoryText === "" && this.state.errorPriceText === "" &&
    this.state.errorUrlText === "" && this.state.errorQuantityText === "" && errorText === "" ?
    this.setState({saveBtnDisabled: false}) : this.setState({saveBtnDisabled: true});
  }

  memoryChanged = (event) => {
    this.disableBtns();

    this.setState({memory: event.target.value});
    let errorText;

    event.target.value > 0 ? errorText = "" : errorText = "Заполните поле, введите число больше 0!";

    this.setState({errorMemoryText: errorText});

    this.state.name && this.state.year && this.state.price && this.state.url && this.state.quantity &&
    this.state.errorNameText === "" && this.state.errorYearText === "" && this.state.errorPriceText === "" &&
    this.state.errorUrlText === "" && this.state.errorQuantityText === "" && errorText === "" ?
    this.setState({saveBtnDisabled: false}) : this.setState({saveBtnDisabled: true});
  }

  priceChanged = (event) => {
    this.disableBtns();

    this.setState({price: event.target.value});
    let errorText;

    event.target.value > 0 ? errorText = "" : errorText = "Заполните поле, введите число больше 0!";

    this.setState({errorPriceText: errorText});

    this.state.name && this.state.year && this.state.memory && this.state.url && this.state.quantity &&
    this.state.errorNameText === "" && this.state.errorYearText === "" && this.state.errorMemoryText === "" &&
    this.state.errorUrlText === "" && this.state.errorQuantityText === "" && errorText === "" ?
    this.setState({saveBtnDisabled: false}) : this.setState({saveBtnDisabled: true});
  }

  urlChanged = (event) => {
    this.disableBtns();

    this.setState({url: event.target.value});
    let errorText;
    const regUrl = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

    regUrl.test(event.target.value) ? errorText = "" : errorText = "Заполните поле, введите корректный URL!";

    this.setState({errorUrlText: errorText});

    this.state.name && this.state.year && this.state.memory && this.state.price && this.state.quantity &&
    this.state.errorNameText === "" && this.state.errorYearText === "" && this.state.errorMemoryText === "" &&
    this.state.errorPriceText === "" && this.state.errorQuantityText === "" && errorText === "" ?
    this.setState({saveBtnDisabled: false}) : this.setState({saveBtnDisabled: true});
  }

  quantityChanged = (event) => {
    this.disableBtns();

    this.setState({quantity: event.target.value});
    let errorText;

    event.target.value > 0 && event.target.value % 1 === 0 ? errorText = "" : errorText = "Заполните поле, введите целое число больше 0!";

    this.setState({errorQuantityText: errorText});

    this.state.name && this.state.year && this.state.memory && this.state.price && this.state.url &&
    this.state.errorNameText === "" && this.state.errorYearText === "" && this.state.errorMemoryText === "" &&
    this.state.errorPriceText === "" && this.state.errorUrlText === "" && errorText === "" ?
    this.setState({saveBtnDisabled: false}) : this.setState({saveBtnDisabled: true});
  }

  disableBtns = () => {
    this.state.itemCardChanged ? null : (this.setState({itemCardChanged: true}), this.props.cbUpdateBtns(true));
  }

  cancelChanges = () => {
    this.props.cbCancelChanges();
  }

  saveItem = () => {
    const item = {
      itemImgUrl: this.state.url,
      itemName: this.state.name,
      itemYear: Number(this.state.year),
      itemMemory: Number(this.state.memory),
      itemPrice: Number(this.state.price),
      itemRest: Number(this.state.quantity),
      itemID: this.state.ID,
    }

    this.props.cbSaveItem(item);
  }

  render() {
    return (
      <div className="edit-itemcard-block">

        <h2 className="edit-itemcard-header">{this.state.header}</h2>

        <p className="edit-itemcard-paragraph">ID: {this.state.ID}</p>

        <label className="edit-itemcard-label" htmlFor="name">Название
          <input className="edit-itemcard-input" id="name" value={this.state.name} onChange={this.nameChanged} />
        </label>
        <span className="edit-itemcard-error">{this.state.errorNameText}</span>

        <label className="edit-itemcard-label" htmlFor="year">Год выпуска
          <input className="edit-itemcard-input" id="year" value={this.state.year} onChange={this.yearChanged} />
        </label>
        <span className="edit-itemcard-error">{this.state.errorYearText}</span>

        <label className="edit-itemcard-label" htmlFor="memory">Объем памяти
          <input className="edit-itemcard-input" id="memory" value={this.state.memory} onChange={this.memoryChanged} />
        </label>
        <span className="edit-itemcard-error">{this.state.errorMemoryText}</span>

        <label className="edit-itemcard-label" htmlFor="price">Цена
          <input className="edit-itemcard-input" id="price" value={this.state.price} onChange={this.priceChanged} />
        </label>
        <span className="edit-itemcard-error">{this.state.errorPriceText}</span>

        <label className="edit-itemcard-label" htmlFor="url">URL
          <input className="edit-itemcard-input" id="url" value={this.state.url} onChange={this.urlChanged} />
        </label>
        <span className="edit-itemcard-error">{this.state.errorUrlText}</span>

        <label className="edit-itemcard-label" htmlFor="quantity">Количество
          <input className="edit-itemcard-input" id="quantity" value={this.state.quantity} onChange={this.quantityChanged} />
        </label>
        <span className="edit-itemcard-error">{this.state.errorQuantityText}</span>

        <input className="edit-itemcard-save-btn" type="button" value={this.props.workMode === 2 ? "Изменить" : "Добавить"}
        disabled={this.state.saveBtnDisabled} onClick={this.saveItem} />
        <input className="edit-itemcard-cancel-btn" type="button" value="Отмена" onClick={this.cancelChanges} />
      </div>
    )
  }
}

export default ItemCardEditOrCreate;