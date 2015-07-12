var Phoenix = require('../phoenix');
var ChannelRoom = require('./channel_room').Room;

var socket = new Phoenix.Socket('ws://' + location.host + '/ws');
socket.connect();
socket.onClose(function(e) { console.log("Close", e); });

var QuackSocket = {
  socket: socket,

  join: function(roomName) {
    new ChannelRoom(socket.chan('rooms:' + roomName, {}));
  }
}; 

module.exports = QuackSocket;
