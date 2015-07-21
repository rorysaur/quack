var React = require('react');
var Flash = require('./flash.jsx');
var ActiveRoom = require('./active_room.jsx');
var RoomList = require('./room_list.jsx');

var Chat = React.createClass({
  render: function() {
    return (
      <div className="chat">
        <RoomList activeRoomChangeCallback={this.activeRoomChangeHandler} active={this.state.activeRoom}>
        </RoomList>
        <ActiveRoom roomName={this.state.activeRoom}>
        </ActiveRoom>
        <Flash></Flash>
      </div>
    );
  },

  activeRoomChangeHandler: function(room) {
    this.setState({activeRoom: room});
  },

  getInitialState: function() {
    return {
      activeRoom: 'bestcohort'
    };
  }
});

module.exports = Chat;

