var Help = require('../utils/help');
var Phoenix = require('../phoenix');
var ActionTypes = require('../constants/constants').ActionTypes;
var AppDispatcher = require('../dispatcher/app_dispatcher');
var socket = new Phoenix.Socket('ws://' + location.host + '/ws');

var DispatchHandler = {};
DispatchHandler[ActionTypes.CREATE_MESSAGE] = function(message, chan) {
  chan.push('new:msg', message);
};
var channelEventHandler = function(chan) {
   chan.onError(function(e) {
     console.log('something went wrong', e);
   });
   chan.onClose(function(e) {
     console.log('channel closed', e);
   });
   chan.on('new:msg', function(msg) {
     dispatch(ActionTypes.INCOMING_MESSAGE, msg);
   });
};

var dispatch = function(type, data) {
  AppDispatcher.dispatch({
    type: type,
    data: data
  });

};

QuackSocket = {};

module.exports = {
  join: function(channelName) {
    socket.connect();
    socket.onClose(function(e) { console.log("Close", e); });
    chan = socket.chan('rooms:' + channelName, {});
    chan.join()
      .receive('ignore', function() { console.log('auth error'); })
      .receive('error', function(e) { console.log("errr", e);})
      .receive('ok', function(chan) { console.log("ok!"); });
    QuackSocket.dispatchToken = AppDispatcher.register(function(action) {
      if (DispatchHandler.hasOwnProperty(action.type)) {
        DispatchHandler[action.type](action.data, chan);
      }
    });
    channelEventHandler(chan);
  }
};
