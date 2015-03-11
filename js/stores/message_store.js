var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var MessageStore = assign({}, EventEmitter.prototype, {
});

module.exports = MessageStore;
