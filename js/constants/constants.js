var keyMirror = require('react/lib/keyMirror');

module.exports = {
  ActionTypes: keyMirror({
    NEW_MESSAGE: null,
    NEW_MESSAGE_SUCCESS: null,
    NEW_MESSAGE_ERROR: null,
    RENAME_LOCAL_USER: null,
    CHANGE_SETTING: null,
    CLEAR_FLASH: null,
    EDIT_LAST_MESSAGE: null,
    NOTIFY: null
  })
};
