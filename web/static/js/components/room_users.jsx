var React = require('react');
var RoomStore = require('../stores/room_store');
var UserStore = require('../stores/user_store');

var RoomUsers = React.createClass({
  render: function() {
    names = this.state.users.map(function(user, index) {
      return(
        <li key={index}>{user}</li>
      );
    });
    return(
      <ul className="room-users">
        {names}
      </ul>
    );
  },

  getInitialState: function() {
    return {users: RoomStore.byName(this.props.roomName).users};
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({users: RoomStore.byName(this.props.roomName).users});
  },

  componentDidMount: function() {
    RoomStore.on('change' + this.props.roomName, this.roomStoreChange);
  },

  componentWillUnmount: function () {
    RoomStore.removeListener('change' + this.props.roomName, this.roomStoreChange);
  },

  roomStoreChange: function() {
    this.setState({users: RoomStore.byName(this.props.roomName).users});
  }
});
module.exports = RoomUsers;
