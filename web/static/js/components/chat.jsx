var React = require('react');
var Flash = require('./flash.jsx');
var ActiveRoom = require('./active_room.jsx');
var RoomList = require('./room_list.jsx');
var Navigation = require('react-router').Navigation;
var UserStore = require('../stores/user_store');
var Actions = require('../actions/actions');
var RoomStore = require('../stores/room_store');

var Chat = React.createClass({
  mixins: [Navigation],

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
    Actions.changeActiveRoom(room);
  },

  getInitialState: function() {
    return {
      activeRoom: RoomStore.activeRoom()
    };
  },

  componentWillMount: function() {
    if (UserStore.localUser().name === null) {
      this.transitionTo('login');
    } else {
      Actions.subscribe(this.state.activeRoom);
    }
  },

  componentDidMount: function() {
    RoomStore.on('change', this._roomStoreChange);
  },

  componentWillUnmount: function() {
    RoomStore.removeListener('change', this._roomStoreChange);
  },

  _roomStoreChange: function() {
    this.setState({
      activeRoom: RoomStore.activeRoom()
    });
  }
});

module.exports = Chat;

