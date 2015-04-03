var React = require('react');

var About = React.createClass({
  render: function () {
    return (
      <div className="about">
        A humble but ambitious clone of Slack, the chat app, using React, Flux, and Firebase.
      </div>
    );
  }
});

module.exports = About;
