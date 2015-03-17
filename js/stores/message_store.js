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
    var message = {
      id:  MessageStore.all.length,
      timestamp: action.data.timestamp,
      user: action.data.user,
      text: action.data.text
    };
    _messages.push(message);
    MessageStore.emit('change');
  }
});
module.exports = MessageStore;
