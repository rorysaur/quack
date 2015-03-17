var React = require('react');
var FlashStore = require('../stores/flash_store');
var Actions = require('../actions/actions');

var Flash = React.createClass({
  render: function() {
    return (
      <div className='flash'>
        {this.state.message}
      </div>
    );
  },

  getInitialState: function() {
    return {message: FlashStore.message()};
  },

  componentDidMount: function() {
    FlashStore.on('change', this.setFlashMessage);
  },

  componentDidUpdate: function() {
    setTimeout(function() {
      Actions.clearFlash();
    }, 5000);
  },

  setFlashMessage: function() {
    this.setState({message: FlashStore.message()});
  }
});

module.exports = Flash;
