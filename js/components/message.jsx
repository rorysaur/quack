var React = require('react');
var TimePresenter = require('../utils/time_presenter');

var Message = React.createClass({
  render: function() {
    var message = this.props.message;
    var className = (message.status === 'Pending') ? 'message pending' : 'message';
    return (
      <div className={className}>
        <div className="sender-stamp">
          <div className="message-sender">{message.user}</div>
          <div className="message-time">{this.props.displayTime}</div>
        </div>
        <div className="message-text">{message.text}</div>
      </div>
    );
  },
});

module.exports = Message;

