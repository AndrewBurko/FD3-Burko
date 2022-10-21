var ShopName = React.createClass({
  displayName: "ShopName",

  propsType: {name: React.PropTypes.string.isRequired},

  render: function() {
    return React.DOM.h1({className: "shop-name"}, this.props.name);
  },
})