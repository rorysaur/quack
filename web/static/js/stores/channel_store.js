var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/app_dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;

_channels = {};

ChannelStore = {};

ChannelStore.dispatchToken = AppDispatcher.register(function(action) {
  if (action.type === ActionTypes.CHANNEL_JOINED) {
    _channels[action.data.topic] = action.data;
  }
});

module.exports = ChannelStore;

