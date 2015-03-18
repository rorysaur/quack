jest.dontMock('../message_store');
jest.dontMock('object-assign');
jest.dontMock('react/lib/keyMirror');

describe('MessageStore', function() {

  var AppDispatcher;
  var MessageStore;
  var callback;
  
  var ActionTypes = require('../../constants/constants').ActionTypes;

  var actionCreateMessage = {
    type: ActionTypes.NEW_MESSAGE,
    data: {
      user: "Bob",
      text: "Hello, everyone I'm new.",
      timestamp: new Date().getTime()
    }
  };

  beforeEach(function() {
    AppDispatcher = require('../../dispatcher/app_dispatcher');
    MessageStore = require('../message_store');
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('creates a new message', function() {
    callback(actionCreateMessage);
    var messages = MessageStore.all();
    expect(messages.length).toBe(3);
    var lastMessage = messages[messages.length - 1];
    expect(lastMessage.user).toBe(actionCreateMessage.data.user);
    expect(lastMessage.text).toBe(actionCreateMessage.data.text);
  });

});
