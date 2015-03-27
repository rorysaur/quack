var React = require('react');
require('../../stylesheets/message.scss');

var Message = React.createClass({
  render: function() {
    var message = this.props.message;
    return (
      <div className="message">
        <div className="message-sender">{message.user}</div>
        <div className="message-time">{this.props.displayTime}</div>
        <div className="message-text">{message.text}</div>
      </div>
    );
  }
});

module.exports = Message;

