var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/app_dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

var _settings = {
  command: ":"
};

var SettingsStore = assign({}, EventEmitter.prototype, {
  commandCharacter: function() {
    return _settings.command;
  }
});

SettingsStore.dispatchToken = AppDispatcher.register(function(action) {
  if (action.type === ActionTypes.CHANGE_SETTING) {
    if (_settings.hasOwnProperty(action.data.variable)) {
      _settings[action.data.variable] = action.data.value;
    }
  }
});

module.exports = SettingsStore;
