var React = require('react');
var TimePresenter = require('../utils/time_presenter');

var Message = React.createClass({
  render: function() {
    var message = this.props.message;
    var time  = this.props.displayTime;
    var className = 'message';
    if (message.status === 'Pending' && time !== TimePresenter.initialMessage) {
      className = className + ' pending';
    }
    return (
      <div className={className}>
        <div className="sender-stamp">
          <div className="message-sender">{message.user}</div>
          <div className="message-time">{time}</div>
        </div>
        <div className="message-text">{message.text}</div>
      </div>
    );
  },
});

module.exports = Message;

