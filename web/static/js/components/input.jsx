var React = require('react');
var Actions = require('../actions/actions');
var SettingsStore = require('../stores/settings_store');
var KeyCodes = require('../utils/keycodes');

var Input = React.createClass({
  render: function() {

    return (
      <input
        className='chat-input'
        type='text'
        value={this.state.message}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
      />
    );
  },

  getInitialState: function() {
    return {
      message: '',
      commandCharacter: SettingsStore.get("cmd")
    };
  },

  componentDidMount: function() {
    SettingsStore.on('change', this.settingsStoreChange);
  },

  _onChange: function(event) {
    this.setState({
      message: event.target.value,
    });
  },

  _onKeyDown: function(event) {
    if (event.keyCode === KeyCodes.enter) {
      event.preventDefault();
      if (this.state.message[0] === this.state.commandCharacter) {
        Actions.userCommand(this.state.message);
      } else {
        Actions.createMessage(this.props.roomName, this.state.message);
      }
      this.setState({message: ''});
    }
  },

  settingsStoreChange: function() {
    this.setState({
      commandCharacter: SettingsStore.get("cmd")
    });
  }
});

module.exports = Input;
