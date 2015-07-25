var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/app_dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;
var Help = require('../utils/help');
var QuackSocket = require('../data/socket');

var _rooms = {
  subscribed: {

  },

  unsubscribed: {

  }
};

var RoomStore = assign({}, EventEmitter.prototype, {
  byName: function(name) {
    if (subscribed[name] !== null) {
      return _rooms.subscribed[name];
    } else if (unsubscribed[name] !== null) {
      return _rooms.unsubscribed[name];
    }
  },

  subscribed: function() {
    return Object.keys(_rooms.subscribed);
  },

  unsubscribed: function() {
    return Object.keys(_rooms.unsubscribed);
  },

  subscribe: function(roomName) {
    if (this.subscribed().indexOf(roomName) !== -1) {
      return null;
    }
    delete _rooms.unsubscribed[roomName];
    _rooms.subscribed[roomName] = QuackSocket.createRoom(roomName);
  },

  unsubscribe: function(roomName) {
    if (this.subscribed().indexOf(roomName) !== -1) {
      room = _rooms.subscribed[roomName];
      room.leave();
      _rooms.unsubscribed[roomName] = room;
      delete _rooms.subscribed[roomName];
    }
  }
});

var DispatchHandler = {};
DispatchHandler[ActionTypes.SUBSCRIBE] = function(data) {
  RoomStore.subscribe(data);
  RoomStore.emit('change');
};

DispatchHandler[ActionTypes.UNSUBSCRIBE] = function(data) {
  RoomStore.unsubscribe(data);
  RoomStore.emit('change');
};

DispatchHandler[ActionTypes.USER_LIST_CHANGE] = function(data) {
  RoomStore.emit('change' + data.roomName);
};

RoomStore.dispatchToken = AppDispatcher.register(function(action) {
  if (DispatchHandler.hasOwnProperty(action.type)) {
    DispatchHandler[action.type](action.data);
  }
});

module.exports = RoomStore;

