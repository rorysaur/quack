var AppDispatcher = require('../dispatcher/app_dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;
var UserStore = require('../stores/user_store');

module.exports = {
  createMessage: function(text) {
    AppDispatcher.dispatch({
      type: ActionTypes.NEW_MESSAGE,
      data: {
        text: text,
        user: UserStore.localUser().name,
        timestamp: new Date().getTime()
      }
   });
  },

  userCommand: function(text) {
    //Determine the action based on the user command. Eventually this shouldn't be an action
    //and the logic should go somewhere else
    var args = text.split(" ");
    var command = args[0].slice(1);
    switch(command) {
      case "nick":
        this.renameLocalUser(args[1]);
        break;
      case "config":
        this.changeSetting({variable: args[1], value: args[2]});
        break;
    }
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
  }
};
