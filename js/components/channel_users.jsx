var React = require('react');
var UserStore = require('../stores/user_store');

var ChannelUsers = React.createClass({
  render: function() {
    names = this.state.users.map(function(user) {
      return(
        <li>{user.name}</li>
      );
    });
    return(
      <ul className="channel-users">
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

  userStoreChange: function() {
    this.setState({users: UserStore.all()});
  }
});
module.exports = ChannelUsers;
