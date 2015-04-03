var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var About = require('../components/about.jsx');
var Quack = require('../components/quack.jsx');
var Chat = require('../components/chat.jsx');

var routes = (
  <Route path='/' handler={Quack}>
    <DefaultRoute name="chat" handler={Chat} />
    <Route name="about" handler={About}/>
  </Route>
);

module.exports = routes;
