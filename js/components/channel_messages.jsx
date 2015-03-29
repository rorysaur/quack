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
        <div className='channel-messages' ref='chan' onScroll={this._onScroll}>
          <h1>You are in a Quack channel.</h1>
          {messageNodes}
        </div>
        <ChannelUsers/>
        <div>
          <div ref='notifier' className='new-message' />
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
    var notifier = this.refs.notifier.getDOMNode();
    var chan = this.refs.chan.getDOMNode();
    if (chan.clientHeight < chan.scrollHeight){
      if (chan.scrollTop < (chan.scrollHeight - chan.offsetHeight - 10)) {
        notifier.style.display = 'block';
      } else {
        this.autoScroll();
      }
    }
  },

  autoScroll: function() {
    var node = this.refs.chan.getDOMNode();
    node.scrollTop = node.scrollHeight;
  },

  _onScroll: function() {
    var notifier = this.refs.notifier.getDOMNode();
    var chan = this.refs.chan.getDOMNode();
    if (chan.scrollTop >= (chan.scrollHeight - chan.clientHeight - 10)) {
      notifier.style.display = 'none';
    }
  }
});

module.exports = ChannelMessages;
