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

var DispatchHandler = {}

DispatchHandler[ActionTypes.CHANGE_SETTING] = function(data) {
  AppDispatcher.waitFor([SettingsStore.dispatchToken]);
  _message = data.variable + " is now '" + SettingsStore.get(data.variable) + "'";
};

DispatchHandler[ActionTypes.CLEAR_FLASH] = function() {
  _message = '';
};

FlashStore.dispatchToken = AppDispatcher.register(function(action) {
  DispatchHandler[action.type](action.data);
  FlashStore.emit('change');
});

module.exports = FlashStore;
