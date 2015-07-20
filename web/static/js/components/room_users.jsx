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
    UserStore.on('change', this.userStoreChange);
  },

  componentWillUnmount: function () {
    UserStore.removeListener('change', this.userStoreChange);
  },

  userStoreChange: function() {
    this.setState({users: UserStore.all()});
  }
});
module.exports = RoomUsers;
