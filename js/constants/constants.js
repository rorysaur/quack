var keyMirror = require('react/lib/keyMirror');

module.exports = {
  ActionTypes: keyMirror({
    NEW_MESSAGE: null,
    RENAME_LOCAL_USER: null,
    CHANGE_SETTING: null,
    CLEAR_FLASH: null
  })
};
