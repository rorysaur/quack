var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/app_dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;
var Help = require('../utils/help');
var QuackSocket = require('../data/socket');

var _rooms = {
 "bestcohort": QuackSocket.createRoom('bestcohort'),
 "otherroom" : QuackSocket.createRoom('otherroom')
};

var RoomStore = {
  allNames: function() {
   return Object.keys(_rooms);
  }
};

RoomStore.dispatchToken = AppDispatcher.register(function(action) {
});

module.exports = RoomStore;

