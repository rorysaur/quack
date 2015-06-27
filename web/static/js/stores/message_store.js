var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/app_dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;
var Help = require('../utils/help');

var _savedMessages = [];
var _pendingMessages = {};

var MessageStore = assign({}, EventEmitter.prototype, {

  all: function() {
    var messages = _savedMessages.concat(this.pending());
    var sorted = messages.sort(function(message1, message2) {
      return message1.timestamp - message2.timestamp;
    });

    return sorted;
  },

  local: function() {
    var all = _savedMessages.concat(this.pending());
    return all.filter(function(message) {
      return message.local === true;
    });
  },

  pending: function() {
    return Help.toArray(_pendingMessages);
  }
});

var DispatchHandler = {};

DispatchHandler[ActionTypes.LOAD_CHANNEL_MESSAGES_SUCCESS] = function(messages) {
  _savedMessages = messages;
};

DispatchHandler[ActionTypes.EDIT_LAST_MESSAGE] = function(data) {
  var localMessages = MessageStore.local();
  if (localMessages.length === 0) {
    return;
  }
  var lastMessage = localMessages[localMessages.length - 1];
  lastMessage.text = lastMessage.text.replace(data.find, data.replaceWith);
};

DispatchHandler[ActionTypes.CREATE_MESSAGE] = function(message) {
  var messageCopy = Help.clone(message);
  messageCopy.status = "Pending";
  messageCopy.key = messageCopy.clientId;
  _pendingMessages[message.clientId] = messageCopy;
};

DispatchHandler[ActionTypes.CREATE_MESSAGE_SUCCESS] = function(message) {
  delete _pendingMessages[message.clientId];
  message.status = "Success";
  _savedMessages.push(message);
};

DispatchHandler[ActionTypes.INCOMING_MESSAGE] = function(message) {
  if (!_pendingMessages.hasOwnProperty(message.clientId)) { //Filter out local client messages
    _savedMessages.push(message);
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
