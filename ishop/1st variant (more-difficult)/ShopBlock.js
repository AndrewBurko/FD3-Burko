var ShopBlock = React.createClass({
  displayName: "ShopBlock",

  propTypes: {
    name: React.PropTypes.string.isRequired,
    itemsArr: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        itemPhotoUrl: React.PropTypes.string.isRequired,
        itemName: React.PropTypes.string.isRequired,
        itemYear: React.PropTypes.number.isRequired,
        itemMemory: React.PropTypes.number.isRequired,
        itemPrice: React.PropTypes.number.isRequired,
        itemRest: React.PropTypes.number.isRequired,
        itemCode: React.PropTypes.number.isRequired,
      })
    )
  },

  render: function() {
    var itemsCode = this.props.items.map( v =>
      React.createElement(ShopItem,
        {itemPhotoUrl: v.itemPhotoUrl,
         itemName: v.itemName,
         itemYear: v.itemYear,
         itemMemory: v.itemMemory,
         itemPrice: v.itemPrice,
         itemRest: v.itemRest,
         key: v.itemCode,
        itemCode: v.itemCode})
    );

    return React.DOM.div({className: "shop-block"}, 
      React.createElement(ShopName, {name: this.props.name}),
      React.DOM.table({className: "items-table"},
        React.DOM.tbody(null, itemsCode))
    );
  }
})