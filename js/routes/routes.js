var routes = (
  <Route handler={App}>
    <Route name="login" handler={Login}/>
  </Route>
);

Router.run(routes, function(handler) {
  React.render(<Handler/>, document.body);
});

