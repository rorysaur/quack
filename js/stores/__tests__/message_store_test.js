jest.dontMock('../message_store');
jest.dontMock('object-assign');
jest.dontMock('react/lib/keyMirror');
jest.dontMock('../../utils/help');

describe('MessageStore', function() {

  var AppDispatcher;
  var MessageStore;
  var callback;
  
  var ActionTypes = require('../../constants/constants').ActionTypes;

  var messageData = {
    user: 'Ajax',
    text: "Hello, everyone I'm nw.",
    timestamp: new Date().getTime(),
    local: true,
    clientId: 'l34j32349d0sjdf1kl00.0dsofjdsfjdsp'
  };

  var incomingMessageData = {
    user: 'Breakfast',
    test: "Me too",
    timestamp: new Date().getTime(),
    clientId: 'sdif903409rjodfg02923.dsf9020934u8391'
  };

  var actionCreateMessage = {
    type: ActionTypes.CREATE_MESSAGE,
    data: messageData
  };

  var actionCreateMessageSuccess = {
    type: ActionTypes.CREATE_MESSAGE_SUCCESS,
    data: messageData
  };

  var actionIncomingMessage = function(data) {
    return {
      type: ActionTypes.INCOMING_MESSAGE,
      data: data
    };
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

  it('initially marks a new message as pending', function() {
    callback(actionCreateMessage);
    var message = MessageStore.all().pop();
    expect(message.status).toBe("Pending");
  });

  it('it updates a messages to successful', function() {
    callback(actionCreateMessage);
    callback(actionCreateMessageSuccess);
    var message = MessageStore.all().pop();
    expect(message.status).toBe("Success");
  });

  it("it ignores incoming message for the client's own pending messages", function() {
    callback(actionCreateMessage);
    var messages = MessageStore.all();
    var originalMessageCount = messages.length;
    callback(actionIncomingMessage(messageData));
    expect(MessageStore.all().length).toBe(originalMessageCount);
  });

  it('adds an incoming message if that message is not locally pending', function() {
    callback(actionCreateMessage);
    var messages = MessageStore.all();
    var originalMessageCount = messages.length;
    callback(actionIncomingMessage(incomingMessageData));
    expect(MessageStore.all().length).toBe(originalMessageCount + 1);
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
