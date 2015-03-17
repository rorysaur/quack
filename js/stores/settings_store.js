var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/app_dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

var _settings = {
  cmd: ":"
};

var SettingsStore = assign({}, EventEmitter.prototype, {
  commandCharacter: function() {
    return _settings.cmd;
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
