var React = require('react');
var Actions = require('../actions/actions');
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
    MessageStore.on('change', this._messageStoreChange);
    Actions.loadChannelMessages('bestcohort'); // TODO use channel name
    Actions.listenForNewMessages('bestcohort');
  },

  componentWillUnmount: function() {
    Actions.unlistenForNewMessages('bestcohort');
  },

  _messageStoreChange: function() {
    this.setState({messages: MessageStore.all()});
  }
});

module.exports = ChannelMessages;
