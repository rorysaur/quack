var React = require('react');
var ChannelMessages = require('./channel_messages.jsx');
var ChannelUsers = require('./channel_users.jsx');
var Input = require('./input.jsx');
var Flash = require('./flash.jsx');
var Chat = React.createClass({
  render: function() {
    return (
      <div className="chat">
        <div className="channel-list">
          <h4>Channels</h4>
          <ul>
            <li>#fakechannel</li>
          </ul>
        </div>
        <div className="channel-box">
          <ChannelMessages channelName="bestcohort">
          </ChannelMessages>
          <ChannelUsers>
          </ChannelUsers>
          <Input channelName="bestcohort">
          </Input>
        </div>
        <Flash></Flash>
      </div>
    );
  }

});

module.exports = Chat;

