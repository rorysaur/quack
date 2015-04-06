var React = require('react');

var About = React.createClass({
  render: function () {
    return (
      <article className="about">
        <p>
          A humble but ambitious clone of Slack, the chat app, using React, Flux, and Firebase.
        </p>
      </article>
    );
  }
});

module.exports = About;
