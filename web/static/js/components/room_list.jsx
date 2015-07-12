var React = require('react');
var RoomStore = require('../stores/room_store');

var RoomList = React.createClass({
  render: function() {
    roomNodes = this.state.rooms.map(function(room) {
      return(
        <li key={room} onClick={this._onClick} className={this.props.active == room ? 'active' : ''}>{room}</li>
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
    };
  },

  _onClick: function(event) {
    event.preventDefault();
    roomName = event.target.textContent;
    this.props.activeRoomChangeCallback(roomName);
  }
});
module.exports = RoomList;
