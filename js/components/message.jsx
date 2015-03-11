var React = require('react');

var Message = React.createClass({
  render: function() {
    return (
      <div className="message">
        [{this.props.message.timestamp}]
        {this.props.message.user}:
        {this.props.message.text}
      </div>
    );
  }
});

module.exports = Message;

