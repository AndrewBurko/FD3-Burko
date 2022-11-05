var FilterBlock = React.createClass ({

  displayName: "FilterBlock",

  propTypes: {
    wordList: React.PropTypes.arrayOf(
      React.PropTypes.string).isRequired,
  },

  getInitialState: function() {
    return {
      startWordList: this.props.wordList,
      currentWordList: this.props.wordList,
      isSortOn: false,
      filterStr: "",
    };
  },

  filterChanged: function(event) {
    this.setState({filterStr: event.target.value}, this.getResult);
  },

  sortList: function(event) {
    this.setState({isSortOn: event.target.checked}, this.getResult);
  },

  clearResult: function(event) {
    this.setState({filterStr: ""});
    this.setState({isSortOn: false}, this.getResult);
  },

  getResult: function() {
    var arr = [];
    this.state.startWordList.map( (v) => arr.push(v));

    if (this.state.isSortOn) {
      arr.sort( (a,b) => a.localeCompare(b));
    };

    var arrAfterSort = [];

    if (this.state.filterStr) {
      arr.filter( (v) => (v.indexOf(this.state.filterStr) >= 0) ? arrAfterSort.push(v) : null);
    } else {
      arr.map( (v) => arrAfterSort.push(v));
    };

    this.setState({currentWordList: arrAfterSort});
  },

  render: function() {
    var wordListCode = this.state.currentWordList.map(v =>
      React.DOM.option({value: v, label: v, key: v}));

    return React.DOM.div({className: "FilterBlock"}, 
      React.DOM.input({type: "checkbox", checked: this.state.isSortOn, onClick: this.sortList}),
      React.DOM.input({type: "text", value: this.state.filterStr, onChange: this.filterChanged}),
      React.DOM.input({className: "clearBtn", type: "button", value: "сброс", onClick: this.clearResult}),
      React.DOM.select({className: "resultBlock", multiple: true, size: 6}, wordListCode)
    )
  },
});