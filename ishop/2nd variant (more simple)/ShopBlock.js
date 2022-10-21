var ShopBlock = React.createClass({
  displayName: "ShopBlock",

  propTypes: {
    name: React.PropTypes.string.isRequired,
    items: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        itemImgUrl: React.PropTypes.string.isRequired,
        itemName: React.PropTypes.string.isRequired,
        itemYear: React.PropTypes.number.isRequired,
        itemMemory: React.PropTypes.number.isRequired,
        itemPrice: React.PropTypes.number.isRequired,
        itemRest: React.PropTypes.number.isRequired,
        itemCode: React.PropTypes.number.isRequired,
      })
    ),
  },

  render: function() {
    var itemsCode = this.props.items.map( v =>
      React.DOM.tr({key: v.itemCode}, 
        React.DOM.td({className: "item-cell"},
          React.DOM.img({className: "item-img", src: v.itemImgUrl, title: v.itemName, alt: v.itemName})),
        React.DOM.td({className: "item-cell"}, `Название: ${v.itemName}`),
        React.DOM.td({className: "item-cell"}, `Год: ${v.itemYear}`),
        React.DOM.td({className: "item-cell"}, `Объем памяти: ${v.itemMemory} ГБ`),
        React.DOM.td({className: "item-cell"}, `Цена: ${v.itemPrice} бел.руб.`),
        React.DOM.td({className: "item-cell"}, `Остаток: ${v.itemRest} шт.`),
      )
    );
    return React.DOM.div({className: "shop-block"}, 
      React.DOM.h1({className: "shop-name"}, this.props.name),
      React.DOM.table({className: "items-table"}, 
        React.DOM.tbody(null, itemsCode))
    );
  }
})