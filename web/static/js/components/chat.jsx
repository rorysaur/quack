var React = require('react');
var Flash = require('./flash.jsx');
var ActiveRoom = require('./active_room.jsx');
var RoomList = require('./room_list.jsx');
var Navigation = require('react-router').Navigation;
var UserStore = require('../stores/user_store');
var Actions = require('../actions/actions');

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
    this.setState({activeRoom: room});
  },

  getInitialState: function() {
    return {
      activeRoom: 'bestcohort'
    };
  },

  componentWillMount: function() {
    if (UserStore.localUser().name === null) {
      this.transitionTo('login');
    } else {
      Actions.subscribe(this.state.activeRoom);
    }
  }
});

module.exports = Chat;

