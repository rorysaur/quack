var ActionTypes = require('../constants/constants').ActionTypes;
var AppDispatcher = require('../dispatcher/app_dispatcher');
var RoomStore = require('../stores/room_store');

var dispatch = function(type, data) {
  AppDispatcher.dispatch({
    type: type,
    data: data
  });
};

var DispatchHandler = {};
DispatchHandler[ActionTypes.CREATE_MESSAGE] = function(message, chan) {
  chan.push('new:msg', message);
};

QuackChannel = {};

QuackChannel.Room = function(phoenixChan) {
  this.chan = phoenixChan;
  this.roomName = this.chan.topic.split(':')[1];
  this.chan.join()
      .receive('ignore', function() { console.log('auth error'); })
      .receive('error', function(e) { console.log('errr', e);})
      .receive('ok', function(chan) {
        dispatch(ActionTypes.ROOM_JOINED, this);
      }.bind(this));

  this.dispatchToken = AppDispatcher.register(function(action) {
    if (DispatchHandler.hasOwnProperty(action.type)) {
      DispatchHandler[action.type](action.data, this.chan);
    }
  }.bind(this));

  this.chan.onError(function(e) {
     console.log('something went wrong', e);
  });

  this.chan.onClose(function(e) {
     console.log('channel closed', e);
  });

  this.chan.on('new:msg', function(msg) {
    msg.roomName = this.roomName;
    dispatch(ActionTypes.INCOMING_MESSAGE, msg);
  }.bind(this));
};


module.exports = QuackChannel;
