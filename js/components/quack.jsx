var React = require('react');
var ChannelMessages = require('./channel_messages.jsx');
var ChannelUsers = require('./channel_users.jsx');
var Input = require('./input.jsx');
var Flash = require('./flash.jsx');
var Quack = React.createClass({
  render: function() {
    return (
      <div className="quack">
        <div className="channel-list">
          <h4>Channels</h4>
          <ul>
            <li>#fakechannel</li>
          </ul>
        </div>
        <div className="channel-box">
          <ChannelMessages>
          </ChannelMessages>
          <ChannelUsers>
          </ChannelUsers>
          <Input>
          </Input>
        </div>
        <Flash></Flash>
      </div>
    );
  }

});

module.exports = Quack;
