var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/app_dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

var _users = [
  {
    id: 1,
    name: 'rory'
  },
  {
    id: 2,
    name: 'iz'
  },
  {
    id: 3,
    name: 'jack'
  }
];

var _localUser = {
  id: 3,
  name: 'jack'
};

var UserStore = assign({}, EventEmitter.prototype, {
  localUser: function() {
    return _localUser;
  },

  all: function() {
    return _users;
  },

  find: function(id) {
    for (var i in _users) {
      if (_users[i].id === id) {
        return _users[i];
      }
    }
  },

  renameLocalUser: function(newName) {
    var oldUser = _localUser;
    _localUser = {
      id: oldUser.id,
      name: newName
    };
    this.find(oldUser.id).name = newName;
    this.emit("change");
  }
});

UserStore.dispatchToken = AppDispatcher.register(function(action) {
  if (action.type === ActionTypes.RENAME_LOCAL_USER) {
    UserStore.renameLocalUser(action.data.newName);
  }
});

module.exports = UserStore;
