var Phoenix = require('../phoenix');
var Channel = require('./channel');

var socket = new Phoenix.Socket('ws://' + location.host + '/ws');
socket.connect();
socket.onClose(function(e) { console.log("Close", e); });

var QuackSocket = {
  socket: socket,

  join: function(channelName) {
    new Channel.Room(socket.chan('rooms:' + channelName, {}));
  }
}; 

module.exports = QuackSocket;
