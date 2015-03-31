var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/app_dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

var _settings = {
  cmd: ':',
  escape: '\\'
};

var SettingsStore = assign({}, EventEmitter.prototype, {
  get: function(key) {
    if (_settings.hasOwnProperty(key)) {
      return _settings[key];
    } else {
      throw new Error(key + " is not a key in the settings store!");
    }
  }
});

SettingsStore.dispatchToken = AppDispatcher.register(function(action) {
  if (action.type === ActionTypes.CHANGE_SETTING) {
    if (_settings.hasOwnProperty(action.data.variable)) {
      _settings[action.data.variable] = action.data.value;
      SettingsStore.emit("change");
    }
  }
});

module.exports = SettingsStore;
