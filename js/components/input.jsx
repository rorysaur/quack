var React = require('react');
var AppDispatcher = require('../dispatcher/app_dispatcher')

var Input = React.createClass({
  render: function() {
    var style = {
      width: "1000px"
    };

    return (
      <input
        type="text"
        style={style}
        value={this.state.message}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
      />
    );
  },

  getInitialState: function() {
    return {message: ''};
  },

  _onChange: function(event) {
    this.setState({message: event.target.value})
  },

  _onKeyDown: function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      AppDispatcher.dispatch({
        type: "NewMessage",
        text: this.state.message
      })
      this.setState({message: ''})
    }
  }
});

module.exports = Input;
