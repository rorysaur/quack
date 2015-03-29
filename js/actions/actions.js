var AppDispatcher = require('../dispatcher/app_dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;
var QuackData = require('../data/data');
var UserStore = require('../stores/user_store');
var UserCommandHandler = require('../utils/user_command_handler');

var dispatch = function(type, data) {
  AppDispatcher.dispatch({
    type: type,
    data: data
  });
};

module.exports = {
  createMessage: function(text) {
    var timestamp = new Date().getTime();
    var message = {
      text: text,
      timestamp: timestamp,
      user: 'guest' // hard-code for now
    };

    QuackData.create('message', {
      message: message,
      success: function() {
        dispatch(ActionTypes.CREATE_MESSAGE_SUCCESS);
      },
      error: function(err) {
        dispatch(ActionTypes.CREATE_MESSAGE_ERROR);
        console.log(err);
      }
    });
  },

  listenForNewMessages: function(channelName) {
    QuackData.on('new_message', {
      channel: channelName,
      success: function(message) {
        dispatch(
          ActionTypes.NEW_MESSAGE,
          message
        );
      }
    });
  },

  loadChannelMessages: function(channelName) {
    QuackData.get('messages', {
      channel: channelName,
      success: function(messages) {
        dispatch(
          ActionTypes.LOAD_CHANNEL_MESSAGES_SUCCESS,
          messages
        );
      },
      error: function(err) {
        dispatch(ActionTypes.LOAD_CHANNEL_MESSAGES_ERROR);
        console.log(err);
      }
    });
  },

  unlistenForNewMessages: function(channelName) {
    QuackData.off('new_message', {
      channel: channelName
    });
  },

  userCommand: function(text) {
    UserCommandHandler.handle(text, this);
  },

  renameLocalUser: function(newName) {
    dispatch(
      ActionTypes.RENAME_LOCAL_USER,
      { newName: newName }
    );
  },

  changeSetting: function(change) {
    dispatch(
      ActionTypes.CHANGE_SETTING,
      {
        variable: change.variable,
        value: change.value
      }
    );
  },

  clearFlash: function() {
    dispatch(ActionTypes.CLEAR_FLASH);
  },

  editLastMessage: function(edits) {
    dispatch(
      ActionTypes.EDIT_LAST_MESSAGE,
      {
        find: edits.find,
        replaceWith: edits.replaceWith
      }
    );
  },

  flashNotify: function(message) {
    dispatch(
      ActionTypes.NOTIFY,
      { message: message }
    );
  }
};
