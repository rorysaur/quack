var React = require('react');
var UserStore = require('../stores/user_store');

var RoomUsers = React.createClass({
  render: function() {
    names = this.state.users.map(function(user, index) {
      return(
        <li key={index}>{user.name}</li>
      );
    });
    return(
      <ul className="room-users">
        {names}
      </ul>
    );
  },

  getInitialState: function() {
    return {users: UserStore.all()};
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
