var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/app_dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;
var SettingsStore = require('./settings_store');

var _message = '';

var FlashStore = assign({}, EventEmitter.prototype, {
  message: function() {
    return _message;
  },

});

FlashStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.CHANGE_SETTING:
      AppDispatcher.waitFor([SettingsStore.dispatchToken]);
      _message = "Command character is now '" + SettingsStore.commandCharacter() + "'";
      FlashStore.emit('change');
      break;
    case ActionTypes.CLEAR_FLASH:
      _message = '';
      FlashStore.emit('change');
      break;
  }
});

module.exports = FlashStore;
