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

var DispatchHandler = {};

DispatchHandler[ActionTypes.NEW_MESSAGE] = function(data) {
  var message = {
    id:  MessageStore.all().length,
    timestamp: data.timestamp,
    user: data.user,
    text: data.text,
    local: data.local
  };
  _messages.push(message);
};

DispatchHandler[ActionTypes.EDIT_LAST_MESSAGE] = function(data) {
  var localMessages = MessageStore.local();
  if (localMessages.length === 0) {
    return;
  }
  var lastMessage = localMessages[localMessages.length - 1];
  lastMessage.text = lastMessage.text.replace(data.find, data.replaceWith);
};

MessageStore.dispatchToken = AppDispatcher.register(function(action) {
   DispatchHandler[action.type](action.data);
   MessageStore.emit('change');
});
module.exports = MessageStore;
