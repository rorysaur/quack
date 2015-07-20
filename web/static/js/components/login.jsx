var React = require('react');
var Actions = require('../actions/actions');
var Navigation = require('react-router').Navigation;

var About = React.createClass({
  mixins: [Navigation],
  render: function () {
    return (
      <article className="login">
        <input placeholder="nick" onChange={this._nickChange}></input>
        <a className="quack" onClick={this._submitHandler} href="#">Talk about things</a>
      </article>
    );
  },

  getInitialState: function() {
    return {nick: "guest"};
  },

  _nickChange: function(e) {
    e.preventDefault();
    this.setState({nick: e.target.value});
  },

  _submitHandler: function(e) {
    e.preventDefault();
    Actions.renameLocalUser(this.state.nick);
    this.transitionTo('chat');
  }
});

module.exports = About;
