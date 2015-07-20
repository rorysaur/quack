var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/app_dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

var _localUser = {
  id: 3,
  name: null
};

var UserStore = assign({}, EventEmitter.prototype, {
  localUser: function() {
    return _localUser;
  },

  renameLocalUser: function(newName) {
    var oldUser = _localUser;
    _localUser = {
      id: oldUser.id,
      name: newName
    };
    this.emit('change');
  }
});

UserStore.dispatchToken = AppDispatcher.register(function(action) {
  if (action.type === ActionTypes.RENAME_LOCAL_USER) {
    UserStore.renameLocalUser(action.data.newName);
  }
});

module.exports = UserStore;
