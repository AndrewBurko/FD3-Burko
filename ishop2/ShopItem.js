var ShopItem = React.createClass({

  displayName: "ShopItem",

  propTypes: {
    itemImgUrl: React.PropTypes.string.isRequired,
    itemName: React.PropTypes.string.isRequired,
    itemYear: React.PropTypes.number.isRequired,
    itemMemory: React.PropTypes.number.isRequired,
    itemPrice: React.PropTypes.number.isRequired,
    itemRest: React.PropTypes.number.isRequired,
    itemCode: React.PropTypes.number.isRequired,
    cbSelectItem: React.PropTypes.func.isRequired,
    selectedItem: React.PropTypes.number,
    cbDeleteItem: React.PropTypes.func.isRequired,
  },

  selectItem: function(event) {
    event.target.className === "item-dell-btn" ? null : this.props.cbSelectItem(Number(event.currentTarget.dataset.itemcode));
  },

  deleteItem: function(event) {
    this.props.cbDeleteItem(Number(event.target.dataset.itemcode));
  },

  render: function() {
    return React.DOM.tr({className: (this.props.selectedItem === this.props.itemCode ? "shop-item_selected" : null), 
    "data-itemcode": this.props.itemCode, onClick: this.selectItem},
      React.DOM.td({className: "item-cell"}, 
        React.DOM.img({className: "item-img", src: this.props.itemImgUrl, title: this.props.itemName, alt: this.props.itemName})),
      React.DOM.td({className: "item-cell"}, `Название: ${this.props.itemName}`),
      React.DOM.td({className: "item-cell"}, `Год: ${this.props.itemYear}`),
      React.DOM.td({className: "item-cell"}, `Объем памяти: ${this.props.itemMemory} ГБ`),
      React.DOM.td({className: "item-cell"}, `Цена: ${this.props.itemPrice} бел. руб.`),
      React.DOM.td({className: "item-cell"}, `Остаток: ${this.props.itemRest} шт.`),
      React.DOM.td({className: "item-cell"}, 
        React.DOM.input({className: "item-dell-btn", type: "button", value: "Удалить", "data-itemcode": this.props.itemCode, 
        onClick: this.deleteItem}))
    );
  }
})