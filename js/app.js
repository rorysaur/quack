var React = require('react');
var Quack = require('./components/quack.jsx');

var data = {
  messages: [
    {
      id: 1,
      timestamp: new Date().getTime(),
      user: 'rory',
      text: 'hihi'
    },
    {
      id: 2,
      timestamp: new Date().getTime(),
      user: 'iz',
      text: 'omg hi'
    }
  ]
};
console.log(data);

// bootstrap entire application and render into DOM
React.render(
  <Quack data={data} />,
  document.getElementById('react')
);
