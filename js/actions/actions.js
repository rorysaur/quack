var AppDispatcher = require('../dispatcher/app_dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;
var Firebase = require('firebase');
var UserStore = require('../stores/user_store');
var UserCommandHandler = require('../utils/user_command_handler');
var FirebaseUtils = require('../utils/firebase');

var FirebaseRef = new Firebase('https://quack.firebaseio.com');

module.exports = {
  createMessage: function(text) {
    var timestamp = new Date().getTime();

    // optimistic dispatch
    AppDispatcher.dispatch({
      type: ActionTypes.NEW_MESSAGE,
      data: {
        text: text,
        user: 'guest', // hard-code for now
        timestamp: timestamp,
        local: true
      }
    });

    // hard-code "bestcohort" for now
    var messagesRef = FirebaseRef.child('messages/bestcohort');
    messagesRef.push({
      text: text,
      timestamp: timestamp,
      user: 'guest' // hard-code for now
    }, function(error) {
      if (error) {
        AppDispatcher.dispatch({
          type: ActionTypes.NEW_MESSAGE_ERROR
        });
        console.log(error);
        return;
      }

      AppDispatcher.dispatch({
        type: ActionTypes.NEW_MESSAGE_SUCCESS
      });
    });
  },

  loadChannelMessages: function(channelName) {
    var messagesRef = FirebaseRef.child('messages/' + channelName);
    messagesRef.on('value', function(snapshot) {
      var messages = snapshot.val();
      AppDispatcher.dispatch({
        type: ActionTypes.LOAD_CHANNEL_MESSAGES,
        data: FirebaseUtils.toArray(messages)
      });
    });
  },

  userCommand: function(text) {
    UserCommandHandler.handle(text, this);
  },

  renameLocalUser: function(newName) {
    AppDispatcher.dispatch({
      type: ActionTypes.RENAME_LOCAL_USER,
      data: {
        newName: newName
      }
    });
  },

  changeSetting: function(change) {
    AppDispatcher.dispatch({
      type: ActionTypes.CHANGE_SETTING,
      data: {
        variable: change.variable,
        value: change.value
      }
    });
  },

  clearFlash: function() {
    AppDispatcher.dispatch({
      type: ActionTypes.CLEAR_FLASH
    });
  },

  editLastMessage: function(edits) {
    AppDispatcher.dispatch({
      type: ActionTypes.EDIT_LAST_MESSAGE,
      data: {
        find: edits.find,
        replaceWith: edits.replaceWith
      }
    });
  },

  flashNotify: function(message) {
    AppDispatcher.dispatch({
      type: ActionTypes.NOTIFY,
      data: {
        message: message
      }
    });
  }
};
