var React = require('react');
var Actions = require('../actions/actions');
var Message = require('./message.jsx');
var MessageStore = require('../stores/message_store');
var TimePresenter = require('../utils/time_presenter');

var RoomMessages = React.createClass({
  render: function() {
    var messageNodes = this.state.messages.map(function(message) {
      var displayTime = TimePresenter.presentMessageTime(message.timestamp, this.state.currentTime);
      return (
        <Message key={message.clientId} message={message} displayTime={displayTime}>
        </Message>
      );
    }.bind(this));
    return (
      <div className='room-messages'>
        <h1>{this.props.roomName}</h1>
        {messageNodes}
      </div>
    );
  },

  getInitialState: function() {
    return {
      messages: MessageStore.forRoom(this.props.roomName),
      currentTime: new Date()
    };
  },

  componentDidMount: function() {
    MessageStore.on('change:' + this.props.roomName, this._messageStoreChange);
    this._startClock();
  },

  componentDidUpdate: function(prevProps, prevState) {
    var node = React.findDOMNode(this);
    node.scrollTop = node.scrollHeight;
    if (this.props.roomName != prevProps.roomName) {
      MessageStore.removeListener('change:' + prevProps.roomName, this._messageStoreChange);
      MessageStore.on('change:' + this.props.roomName, this._messageStoreChange);
      this.setState({
        messages: MessageStore.forRoom(this.props.roomName)
      });
    }
  },

  componentWillUnmount: function() {
    MessageStore.removeListener('change:' + this.props.roomName, this._messageStoreChange);
    clearInterval(this.clockId);
  },

  _messageStoreChange: function() {
    this.setState({messages: MessageStore.forRoom(this.props.roomName)});
  },

  _startClock: function() {
    this.clockId = setInterval(function() {
      this.setState({currentTime: new Date()});
    }.bind(this), 60000);
  }
});

module.exports = RoomMessages;
