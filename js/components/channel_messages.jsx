var React = require('react');
var Message = require('./message.jsx');

var ChannelMessages = React.createClass({
  render: function() {
    var messageNodes = this.props.messages.map(function(message) {
      return (
        <Message message={message}>
        </Message>
      );
    });
    return (
      <div className="channel-messages">
        <h1>You are in a Quack channel.</h1>
        {messageNodes}
      </div>
    );
  }
});

module.exports = ChannelMessages;
