var React = require('react');
var Actions = require('../actions/actions');
var SettingsStore = require('../stores/settings_store');
var KeyCodes = {
  enter: 13
};

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
      commandCharacter: this.state.commandCharacter
    });
  },

  _onKeyDown: function(event) {
    if (event.keyCode === KeyCodes.enter) {
      event.preventDefault();
      if (this.state.message[0] === this.state.commandCharacter) {
        Actions.userCommand(this.state.message);
      } else {
        Actions.createMessage(this.state.message);
      }
      this.setState({message: ''});
    }
  },

  settingsStoreChange: function() {
    this.setState({
      message: this.state.message,
      commandCharacter: SettingsStore.get("cmd")
    });
  }
});

module.exports = Input;
