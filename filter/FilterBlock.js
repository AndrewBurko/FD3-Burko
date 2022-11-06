var FilterBlock = React.createClass ({

  displayName: "FilterBlock",

  propTypes: {
    wordList: React.PropTypes.arrayOf(
      React.PropTypes.string).isRequired,
  },

  getInitialState: function() {
    return {
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
    this.setState({filterStr: "", isSortOn: false}, this.getResult);
  },

  getResult: function() {
    var words = null;

    if (this.state.filterStr) {
      words = this.props.wordList.filter( (v) => 
      v.includes(this.state.filterStr));
    } else {
      words = [...this.props.wordList];
    }

    if (this.state.isSortOn) {
      words.sort();
    }

    this.setState({currentWordList: words});
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