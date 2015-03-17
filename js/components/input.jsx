var React = require('react');
var Actions = require('../actions/actions');
var KeyCodes = {
  enter: 13
};
var CommandCharacter = ':';

var Input = React.createClass({
  render: function() {
    var style = {
      width: '1000px'
    };

    return (
      <input
        type='text'
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
    this.setState({message: event.target.value});
  },

  _onKeyDown: function(event) {
    if (event.keyCode === KeyCodes.enter) {
      event.preventDefault();
      if (this.state.message[0] === CommandCharacter) {
        Actions.userCommand(this.state.message);
      } else {
        Actions.createMessage(this.state.message);
      }
      this.setState({message: ''});
    }
  }
});

module.exports = Input;
