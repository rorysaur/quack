var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/app_dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

var _successfulMessages = [];
var _pendingMessages = {};

var MessageStore = assign({}, EventEmitter.prototype, {

  all: function() {
    var messages = _successfulMessages.concat(this.pending());
    var sorted = messages.sort(function(message1, message2) {
      return message1.timestamp - message2.timestamp;
    });

    return sorted;
  },

  local: function() {
    var localMessages = [];
    _successfulMessages.concat(this.pending()).forEach(function(message) {
      if (message.local === true) {
        localMessages.push(message);
      }
    });

    return localMessages;
  },

  pending: function() {
    var messages = [];
    for (var key in _pendingMessages) {
      if (_pendingMessages.hasOwnProperty(key)) {
        messages.push(_pendingMessages[key]);
      }
    }

    return messages;
  }
});

var DispatchHandler = {};

DispatchHandler[ActionTypes.LOAD_CHANNEL_MESSAGES_SUCCESS] = function(messages) {
  _successfulMessages = messages;
};

DispatchHandler[ActionTypes.EDIT_LAST_MESSAGE] = function(data) {
  var localMessages = MessageStore.local();
  if (localMessages.length === 0) {
    return;
  }
  var lastMessage = localMessages[localMessages.length - 1];
  lastMessage.text = lastMessage.text.replace(data.find, data.replaceWith);
};

DispatchHandler[ActionTypes.NEW_MESSAGE] = function(message) {
  messageCopy = JSON.parse(JSON.stringify(message)); // Cloning the object
  messageCopy.status = "Pending";
  messageCopy.key = messageCopy.clientId;
  _pendingMessages[message.clientId] = messageCopy;
};

DispatchHandler[ActionTypes.CREATE_MESSAGE_SUCCESS] = function(message) {
  delete _pendingMessages[message.clientId];
  message.status = "Success";
  _successfulMessages.push(message);
};

DispatchHandler[ActionTypes.INCOMING_MESSAGE] = function(message) {
  if (!_pendingMessages.hasOwnProperty(message.clientId)) { //Filter out local client messages
    _successfulMessages.push(message);
  }
};

DispatchHandler[ActionTypes.CREATE_MESSAGE_ERROR] = function(data) {
  _pendingMessages[message.clientId].status = "Failed";
};

MessageStore.dispatchToken = AppDispatcher.register(function(action) {
  if (DispatchHandler.hasOwnProperty(action.type)) {
    DispatchHandler[action.type](action.data);
    MessageStore.emit('change');
  }
});
module.exports = MessageStore;
