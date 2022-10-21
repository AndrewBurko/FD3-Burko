var ShopItem = React.createClass({
  displayName: "ShopItem",

  propTypes: {
    itemPhotoUrl: React.PropTypes.string.isRequired,
    itemName: React.PropTypes.string.isRequired,
    itemYear: React.PropTypes.number.isRequired,
    itemMemory: React.PropTypes.number.isRequired,
    itemPrice: React.PropTypes.number.isRequired,
    itemRest: React.PropTypes.number.isRequired,
    itemCode: React.PropTypes.number.isRequired,
  },

  render: function() {
    return React.DOM.tr(null, 
      React.DOM.td({className: "item-cell"}, 
        React.DOM.img({className: "item-img", src: this.props.itemPhotoUrl, title: this.props.itemName, alt: this.props.itemName})),
      React.DOM.td({className: "item-cell"}, `Название: ${this.props.itemName}`),
      React.DOM.td({className: "item-cell"}, `Год: ${this.props.itemYear}`),
      React.DOM.td({className: "item-cell"}, `Объем памяти: ${this.props.itemMemory} ГБ`),
      React.DOM.td({className: "item-cell"}, `Цена: ${this.props.itemPrice} бел. руб.`),
      React.DOM.td({className: "item-cell"}, `Остаток: ${this.props.itemRest} шт.`),
    );
  },
})