var React = require('react');
var Message = require('./message.jsx');
var MessageStore = require('../stores/message_store');
var Input = require('./input.jsx')
var ChannelUsers = require('./channel_users.jsx');

var ChannelMessages = React.createClass({
  render: function() {
    var messageNodes = this.state.messages.map(function(message) {
      return (
        <Message message={message}>
        </Message>
      );
    });
    return (
      <div>
        <div className='channel-messages' ref='chan'>
          <h1>You are in a Quack channel.</h1>
          {messageNodes}
        </div>
        <ChannelUsers/>
        <div>
          <Input
            onSubmit={this.autoScroll}
          />
        </div>
      </div>
    );
  },

  getInitialState: function() {
    return {messages: MessageStore.all()};
  },

  componentDidMount: function() {
    MessageStore.on('change', this.messageStoreChange);
  },

  messageStoreChange: function() {
    this.setState({messages: MessageStore.all()});
  },

  autoScroll: function(){
    var node = this.refs.chan.getDOMNode();
    node.scrollTop = node.scrollHeight;
  }
});

module.exports = ChannelMessages;
