var React = require('react');
var Message = require('./message.jsx');
var MessageStore = require('../stores/message_store');

var ChannelMessages = React.createClass({
  render: function() {
    var messageNodes = this.state.messages.map(function(message) {
      return (
        <Message message={message}>
        </Message>
      );
    });
    return (
      <div className='channel-messages'>
        <h1>You are in a Quack channel.</h1>
        {messageNodes}
      </div>
    );
  },

  getInitialState: function() {
    return {messages: MessageStore.all()};
  },

  componentDidMount: function() {
    MessageStore.on('change', this.handleMessageChange);
  },

  messageStoreChange: function() {
    this.setState({messages: MessageStore.all()});
  },

  handleMessageChange: function(){
    this.messageStoreChange();
    this.autoScroll();
  },

  autoScroll: function(){
    var node = this.getDOMNode();
    node.scrollTop = node.scrollHeight;
  }

});

module.exports = ChannelMessages;
