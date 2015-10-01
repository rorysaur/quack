var React = require('react');
var About = require('./about.jsx');
var Chat = require('./chat.jsx');
var Router = require('react-router');
var Link = Router.Link;

var Quack = React.createClass({
  render: function () {
    return (
      <div className='quack'>
        <nav>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/chat">Chat</Link></li>
          </ul>
        </nav>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Quack;

