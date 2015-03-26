var AppDispatcher = require('../dispatcher/app_dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;
var QuackData = require('../data/data');
var UserStore = require('../stores/user_store');
var UserCommandHandler = require('../utils/user_command_handler');

module.exports = {
  createMessage: function(text) {
    var timestamp = new Date().getTime();
    var message = {
      text: text,
      timestamp: timestamp,
      user: 'guest' // hard-code for now
    };

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

    QuackData.create('message', {
      message: message,
      success: function() {
        AppDispatcher.dispatch({
          type: ActionTypes.NEW_MESSAGE_SUCCESS
        });
      },
      error: function(err) {
        AppDispatcher.dispatch({
          type: ActionTypes.NEW_MESSAGE_ERROR
        });
        console.log(err);
      }
    });
  },

  loadChannelMessages: function(channelName) {
    QuackData.get('messages', {
      channel: channelName,
      success: function(messages) {
        AppDispatcher.dispatch({
          type: ActionTypes.LOAD_CHANNEL_MESSAGES_SUCCESS,
          data: messages
        });
      },
      error: function(err) {
        AppDispatcher.dispatch({
          type: ActionTypes.LOAD_CHANNEL_MESSAGES_ERROR
        });
        console.log(err);
      }
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
