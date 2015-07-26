var AppDispatcher = require('../dispatcher/app_dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;
var QuackSocket = require('../data/socket');
var UserStore = require('../stores/user_store');
var UserCommandHandler = require('../utils/user_command_handler');
var SettingsStore = require('../stores/settings_store');
var UUID = require('../utils/uuid');

var dispatch = function(type, data) {
  AppDispatcher.dispatch({
    type: type,
    data: data
  });
};

module.exports = {
  createMessage: function(roomName, text) {
    var timestamp = new Date().getTime();
    if (text[0] === SettingsStore.get('escape')) {
      text = text.slice(1);
    }
    var message = {
      roomName: roomName,
      text: text,
      timestamp: timestamp,
      user: UserStore.localUser().name,
      clientId: UUID.generate()
    };
    dispatch(ActionTypes.CREATE_MESSAGE, message);
  },

  userCommand: function(text) {
    UserCommandHandler.handle(text, this);
  },

  renameLocalUser: function(newName) {
    dispatch(
      ActionTypes.RENAME_LOCAL_USER,
      { newName: newName, oldName: UserStore.localUser().name }
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

  subscribe: function(roomName) {
    dispatch(ActionTypes.SUBSCRIBE, roomName);
    this.flashNotify('Joining ' + roomName);
  },

  unsubscribe: function(roomName) {
    dispatch(ActionTypes.UNSUBSCRIBE, roomName);
    this.flashNotify('Leaving ' + roomName);
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
  },

  changeActiveRoom: function(room) {
    dispatch(
      ActionTypes.CHANGE_ACTIVE_ROOM,
      {
        room: room
      }
    )
  }
};
