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
    return this.all().filter(function(message) {
      return message.local === true;
    });
  },

  forRoom: function(roomName) {
    var messages = this.all().filter(function(message) {
      return message.roomName == roomName;
    });

    var sorted = messages.sort(function(message1, message2) {
      return message1.timestamp - message2.timestamp;
    });
    return sorted;
  },

  pending: function() {
    return Help.toArray(_pendingMessages);
  }
});

var DispatchHandler = {};

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

DispatchHandler[ActionTypes.INCOMING_MESSAGE] = function(message) {
  delete _pendingMessages[message.clientId];
  message.timestamp = parseInt(message.timestamp);
  message.status = "Success";
  _savedMessages.push(message);
};

DispatchHandler[ActionTypes.CREATE_MESSAGE_ERROR] = function(data) {
  _pendingMessages[message.clientId].status = "Failed";
};

MessageStore.dispatchToken = AppDispatcher.register(function(action) {
  if (DispatchHandler.hasOwnProperty(action.type)) {
    DispatchHandler[action.type](action.data);
    MessageStore.emit('change:' + action.data.roomName);
  }
});
module.exports = MessageStore;
