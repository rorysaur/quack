var React = require('react');
var RoomMessages = require('./room_messages.jsx');
var RoomUsers = require('./room_users.jsx');
var Input = require('./input.jsx');


var ActiveRoom = React.createClass({
  render: function() {
    return (
      <div className="active-room">
        <RoomMessages roomName = {this.props.roomName}>
        </RoomMessages>
        <RoomUsers>
        </RoomUsers>
        <Input roomName = {this.props.roomName}>
        </Input>
      </div>
    );
  }
}); 

module.exports = ActiveRoom;

