var React = require('react');
var ChannelMessages = require('./channel_messages.jsx');
var ChannelUsers = require('./channel_users.jsx');
var Input = require('./input.jsx');
var Quack = React.createClass({
  render: function() {
    return (
      <div className='quack'>
        <ChannelMessages>
        </ChannelMessages>
        <ChannelUsers>
        </ChannelUsers>
        <Input>
        </Input>
      </div>
    );
  }
});

module.exports = Quack;
