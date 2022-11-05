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

  getInitialState: function() {
    return {
      currentItems: this.props.items,
      selectedItem: null,
      deletedItem: null,
    };
  },

  selectItem: function(itemCode) {
    this.setState({selectedItem: itemCode});
  },

  deleteItem: function(itemCode) {
    confirm("Вы действительно хотите удалить данный товар?") ? this.setState({deletedItem: itemCode}, this.updateItems) : null;
  },

  updateItems: function() {
    var arr = [];
    this.state.currentItems.map( v => 
      v.itemCode === this.state.deletedItem ? null : arr.push(v));
    this.setState({currentItems: arr});
  },

  render: function() {
    var itemsCode = this.state.currentItems.map( v =>
      React.createElement(ShopItem, {
        itemImgUrl: v.itemImgUrl,
        itemName: v.itemName,
        itemYear: v.itemYear,
        itemMemory: v.itemMemory,
        itemPrice: v.itemPrice,
        itemRest: v.itemRest,
        key: v.itemCode,
        itemCode: v.itemCode,
        cbSelectItem: this.selectItem,
        selectedItem: this.state.selectedItem,
        cbDeleteItem: this.deleteItem,
      }),
    );

    return React.DOM.div({className: "shop-block"}, 
      React.DOM.h1({className: "shop-name"}, this.props.name),
      React.DOM.table({className: "items-table"}, 
        React.DOM.tbody(null, itemsCode))
    );
  }
})