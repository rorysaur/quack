var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/app_dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

var _messages = [
  {
    id: 1,
    timestamp: new Date().getTime(),
    user: 'rory',
    text: 'hihi'
  },
  {
    id: 2,
    timestamp: new Date().getTime(),
    user: 'iz',
    text: 'omg hi'
  }
];
var MessageStore = assign({}, EventEmitter.prototype, {

  all: function() {
    return _messages;
  },
});

MessageStore.dispatchToken = AppDispatcher.register(function(action) {
  if (action.type === ActionTypes.NEW_MESSAGE) {
    message = {
      id:  action.message_id,
      timestamp: action.timestamp,
      user: action.user,
      text: action.text
    };
    _messages.push(message);
    MessageStore.emit("change");
  }
});
module.exports = MessageStore;
