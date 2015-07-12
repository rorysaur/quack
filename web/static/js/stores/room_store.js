var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/app_dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

_rooms = {};

RoomStore = {};

RoomStore.dispatchToken = AppDispatcher.register(function(action) {
  if (action.type === ActionTypes.ROOM_JOINED) {
    _rooms[action.data.topic] = action.data;
  }
});

module.exports = RoomStore;

