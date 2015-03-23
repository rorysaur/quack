var AppDispatcher = require('../dispatcher/app_dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;
var UserStore = require('../stores/user_store');
var UserCommandHandler = require('../utils/user_command_handler');

module.exports = {
  createMessage: function(text) {
    AppDispatcher.dispatch({
      type: ActionTypes.NEW_MESSAGE,
      data: {
        text: text,
        user: UserStore.localUser().name,
        timestamp: new Date().getTime(),
        local: true
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
