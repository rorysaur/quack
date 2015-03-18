var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/app_dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

var _messages = [
  {
    id: 1,
    timestamp: new Date().getTime(),
    user: 'rory',
    text: 'hihi',
    local: false
  },
  {
    id: 2,
    timestamp: new Date().getTime(),
    user: 'iz',
    text: 'omg hi',
    local: false
  }
];
var MessageStore = assign({}, EventEmitter.prototype, {

  all: function() {
    return _messages;
  },

  local: function() {
    var localMessages = [];
    _messages.forEach(function(message) {
      if (message.local === true) {
        localMessages.push(message);
      }
    });

    return localMessages;
  }
});

MessageStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.NEW_MESSAGE:
      var message = {
        id:  MessageStore.all().length,
        timestamp: action.data.timestamp,
        user: action.data.user,
        text: action.data.text,
        local: action.data.local
      };
      _messages.push(message);
      MessageStore.emit('change');
      break;

    case ActionTypes.EDIT_LAST_MESSAGE:
      var localMessages = MessageStore.local();
      var lastMessage = localMessages[localMessages.length - 1];
      lastMessage.text = lastMessage.text.replace(action.data.find, action.data.replaceWith);
      MessageStore.emit('change');
      break;
  }
});
module.exports = MessageStore;
