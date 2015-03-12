var React = require('react');
var Quack = require('./components/quack.jsx');

// bootstrap entire application and render into DOM
React.render(
  <Quack />,
  document.getElementById('react')
);
