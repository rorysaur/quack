var React = require('react');
var ChannelMessages = require('./channel_messages.jsx');
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
        </div>
        <Flash></Flash>
      </div>
    );
  }

});

module.exports = Quack;
