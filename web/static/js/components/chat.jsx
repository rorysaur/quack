var React = require('react');
var Flash = require('./flash.jsx');
var ActiveRoom = require('./active_room.jsx');

var Chat = React.createClass({
  render: function() {
    return (
      <div className="chat">
        <div className="room-list">
          <h4>Channels</h4>
          <ul>
            <li>#fakechannel</li>
          </ul>
        </div>
        <ActiveRoom roomName="bestcohort">
        </ActiveRoom>
        <Flash></Flash>
      </div>
    );
  }

});

module.exports = Chat;

