var React = require('react');
var ChannelMessages = require('./channel_messages.jsx');
var Input = require('./input.jsx');

var Quack = React.createClass({
  render: function() {
    return (
      <div className="quack">
        <ChannelMessages messages={this.props.data.messages}>
        </ChannelMessages>
        <Input>
        </Input>
      </div>
    );
  }
});

module.exports = Quack;
