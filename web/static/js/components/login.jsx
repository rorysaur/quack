var React = require('react');
var Actions = require('../actions/actions');
var History = require('react-router').History;
var KeyCodes = require('../utils/keycodes');

var About = React.createClass({
  mixins: [History],
  render: function () {
    return (
      <article className="login">
        <input placeholder="nick" onChange={this._onChange} onKeyDown={this._onKeyDown}></input>
        <a className="quack" onClick={this._onClick} href="#">Talk about things</a>
      </article>
    );
  },

  getInitialState: function() {
    return {nick: "guest"};
  },

  _onChange: function(e) {
    e.preventDefault();
    this.setState({nick: e.target.value});
  },

  _onClick: function(e) {
    e.preventDefault();
    this.setNick();
  },

  _onKeyDown: function(event) {
    if (event.keyCode === KeyCodes.enter) {
      event.preventDefault();
      this.setNick();
    }
  },

  setNick: function() {
    Actions.renameLocalUser(this.state.nick);
    this.history.pushState(null, '/chat');
  }
});

module.exports = About;
