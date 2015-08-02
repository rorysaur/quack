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
    FlashStore.on('change', this._setFlashMessage);
  },

  componentWillUnmount: function() {
    FlashStore.removeListener('change', this._setFlashMessage)
  },

  componentDidUpdate: function() {
    setTimeout(function() {
      Actions.clearFlash();
    }, 5000);
  },

  _setFlashMessage: function() {
    this.setState({message: FlashStore.message()});
  }
});

module.exports = Flash;
