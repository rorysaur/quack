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
      user: 'Bob',
      text: "Hello, everyone I'm nw.",
      timestamp: new Date().getTime(),
      local: true
    }
  };

  var actionEditLastMessage = {
    type: ActionTypes.EDIT_LAST_MESSAGE,
    data: {
      find: 'nw',
      replaceWith: 'new'
    }
  };

  beforeEach(function() {
    AppDispatcher = require('../../dispatcher/app_dispatcher');
    MessageStore = require('../message_store');
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('creates a new message', function() {
    var oldMessageLength = MessageStore.all().length;
    callback(actionCreateMessage);
    var messages = MessageStore.all();
    expect(messages.length - oldMessageLength).toBe(1);
    var lastMessage = messages[messages.length - 1];
    expect(lastMessage.user).toBe(actionCreateMessage.data.user);
    expect(lastMessage.text).toBe(actionCreateMessage.data.text);
  });

  it('edits the previous message', function() {
    callback(actionCreateMessage);
    var messages = MessageStore.all();
    var oldSpelling = messages[messages.length - 1].text;
    expect(oldSpelling).toBe("Hello, everyone I'm nw.");
    callback(actionEditLastMessage);
    var newMessages = MessageStore.all();
    var newSpelling = newMessages[newMessages.length - 1].text;
    expect(newSpelling).toBe("Hello, everyone I'm new.");
  });

  it('does not do anything if there is no message to edit', function() {
    expect(function() { callback(actionEditLastMessage); }).not.toThrow();
  });
});
