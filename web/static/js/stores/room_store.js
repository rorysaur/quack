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
    if (_rooms.subscribed[name] !== undefined) {
      return _rooms.subscribed[name];
    } else if (_rooms.unsubscribed[name] !== undefined) {
      return _rooms.unsubscribed[name];
    }
  },

  _activeRoom: "bestcohort",

  activeRoom: function() {
    return this._activeRoom
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

    if (roomName !== this._activeRoom) {
      this._activeRoom = roomName;
      this.emit('change');
    }

  },

  unsubscribe: function(roomName) {
    if (this.subscribed().indexOf(roomName) !== -1) {
      room = _rooms.subscribed[roomName];
      room.leave();
      _rooms.unsubscribed[roomName] = room;
      delete _rooms.subscribed[roomName];

      if (roomName === this._activeRoom && this.subscribed().length > 0) {
        this._activeRoom = this.subscribed()[0];
        this.emit('change');
      }
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
  RoomStore
  RoomStore.emit('change');
};

DispatchHandler[ActionTypes.USER_LIST_CHANGE] = function(data) {
  RoomStore.emit('change');
};

DispatchHandler[ActionTypes.CHANGE_ACTIVE_ROOM] = function(data) {
  RoomStore._activeRoom = data.room
  RoomStore.emit('change');
};


RoomStore.dispatchToken = AppDispatcher.register(function(action) {
  if (DispatchHandler.hasOwnProperty(action.type)) {
    DispatchHandler[action.type](action.data);
  }
});

module.exports = RoomStore;

