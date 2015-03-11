var React = require('react');

var Input = React.createClass({
  render: function() {
    var style = {
      width: "1000px"
    };

    return (
      <input type="text" style={style} />
    );
  }
});

module.exports = Input;
