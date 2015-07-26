var React = require('react');
var Actions = require('../actions/actions');
var Navigation = require('react-router').Navigation;
var KeyCodes = require('../utils/keycodes');

var Register = React.createClass({
  mixins: [Navigation],

  render: function () {
    return (
      <article className="register">
        <input type="text" placeholder="email" onChange={this._onChange.bind(this, 'email')} onKeyDown={this._onKeyDown} />
        <input type="password" placeholder="password" onChange={this._onChange.bind(this, 'password')} onKeyDown={this._onKeyDown} />
        <a className="quack" onClick={this._onClick} href="#">Register</a>
      </article>
    );
  },

  getInitialState: function() {
    return {
      email: "",
      password: ""
    };
  },

  _onChange: function(field, event) {
    event.preventDefault();
    var newState = {};
    newState[field] = event.target.value;
    this.setState(newState);
  },

  _onClick: function(e) {
    e.preventDefault();
    this._setNick();
  },

  _onKeyDown: function(event) {
    if (event.keyCode === KeyCodes.enter) {
      event.preventDefault();
      this._register();
    }
  },

  _register: function() {
    Actions.registerUser({
      email: this.state.email,
      password: this.state.password
    });

    // this.transitionTo('chat');
  }

});

module.exports = Register;
