var React = require('react');
require('../../stylesheets/message.scss');
var TimePresenter = require('../utils/time_presenter');

var Message = React.createClass({
  render: function() {
    var message = this.props.message;
    var displayTime = TimePresenter.presentMessageTime(message.timestamp, this.state.currentTime);
    return (
      <div className="message">
        <div className="sender-stamp">
          <div className="message-sender">{message.user}</div>
          <div className="message-time">{displayTime}</div>
        </div>
        <div className="message-text">{message.text}</div>
      </div>
    );
  },

  getInitialState: function() {
    return { currentTime: new Date() };
  },

  componentDidMount: function() {
    setInterval(function() {
      this.setState({currentTime: new Date()});
    }.bind(this), 60000);
  }
});

module.exports = Message;

