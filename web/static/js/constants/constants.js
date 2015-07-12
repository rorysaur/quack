var keyMirror = require('react/lib/keyMirror');

module.exports = {
  ActionTypes: keyMirror({
    CREATE_MESSAGE: null,
    CREATE_MESSAGE_SUCCESS: null,
    CREATE_MESSAGE_ERROR: null,
    RENAME_LOCAL_USER: null,
    CHANGE_SETTING: null,
    CLEAR_FLASH: null,
    EDIT_LAST_MESSAGE: null,
    INCOMING_MESSAGE: null,
    NOTIFY: null,
  })
};
