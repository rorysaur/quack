var React = require('react');
var Actions = require('../actions/actions');
var Message = require('./message.jsx');
var MessageStore = require('../stores/message_store');
var TimePresenter = require('../utils/time_presenter');

var ChannelMessages = React.createClass({
  render: function() {
    var messageNodes = this.state.messages.map(function(message) {
      var displayTime = TimePresenter.presentMessageTime(message.timestamp, this.state.currentTime);
      return (
        <Message key={message.key} message={message} displayTime={displayTime}>
        </Message>
      );
    }.bind(this));
    return (
      <div className='channel-messages'>
        <h1>You are in a Quack channel.</h1>
        {messageNodes}
      </div>
    );
  },

  getInitialState: function() {
    return {
      messages: MessageStore.all(),
      currentTime: new Date()
    };
  },

  componentDidMount: function() {
    MessageStore.on('change', this._messageStoreChange);
    Actions.listenForNewMessages('bestcohort'); // TODO use channel name

    this._startClock();
  },

  componentWillUnmount: function() {
    clearInterval(this.clockId);
    Actions.unlistenForNewMessages('bestcohort');
  },

  _messageStoreChange: function() {
    this.setState({messages: MessageStore.all()});
  },

  _startClock: function() {
    this.clockId = setInterval(function() {
      this.setState({currentTime: new Date()});
    }.bind(this), 60000);
  }
});

module.exports = ChannelMessages;
