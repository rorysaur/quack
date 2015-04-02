var React = require('react');
var Quack = require('./components/quack.jsx');
require('../stylesheets/app.scss');

var Router = require('react-router');
var routes = require('./routes/routes');

// bootstrap entire application and render into DOM
Router.run(routes, function (Handler) {
  React.render(
    <Handler/>, 
    document.getElementById('react')
  );
});
