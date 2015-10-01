var Phoenix = require('../phoenix');
var QuackRoom = require('./room');

var socket = new Phoenix.Socket('ws://' + location.host + '/ws');
socket.connect();
socket.onClose(function(e) { console.log("Close", e); });

var QuackSocket = {
  socket: socket,
  createRoom: function(roomName) {
    chan = socket.channel('rooms:' + roomName, {});
    return new QuackRoom(chan);
  }
}; 
module.exports = QuackSocket;
