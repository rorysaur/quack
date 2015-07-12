var React = require('react');
var RoomStore = require('../stores/room_store');

var RoomList = React.createClass({
  render: function() {
    roomNodes = this.state.rooms.map(function(room) {
      return(
        <li key={room} onClick={this._onClick}>{room}</li>
      );
    }.bind(this));
    return(
      <div className="room-list">
        <h4>Channels</h4>
        <ul>
          {roomNodes}
        </ul>
      </div>
    );
  },

  getInitialState: function() {
    return {
      rooms: RoomStore.allNames(),
      activeRoom: 'bestcohort'
    };
  },

  _onClick: function(event) {
    event.preventDefault();
    roomName = event.target.textContent;
    this.setState({activeRoom: roomName});
    this.props.activeRoomChangeCallback(roomName);
  }
});
module.exports = RoomList;
