var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/app_dispatcher')
var _messages = []
var MessageStore = assign({}, EventEmitter.prototype, {

  all: function() {
    return _messages
  },

  setInitialMessages: function(messages) {
    _messages = messages
  }
});

MessageStore.dispatchToken = AppDispatcher.register(function(action) {
  if (action.type === "NewMessage") {
    message = {
      id: MessageStore.all().length + 1,
      timestamp: new Date().getTime(),
      user: 'jack',
      text: action.text
    }
    _messages.push(message)
    MessageStore.emit("change")
  }
})
module.exports = MessageStore;
