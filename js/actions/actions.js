var AppDispatcher = require('../dispatcher/app_dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;
var UserStore = require('../stores/user_store')

module.exports = {
  createMessage: function(text) {
    AppDispatcher.dispatch({
      type: ActionTypes.NEW_MESSAGE,
      text: text,
      user: UserStore.localUser().name,
      timestamp: new Date().getTime()
    })
  },

  userCommand: function(text) {
    //Determine the action based on the user command. Eventually this shouldn't be an action
    //and the logic should go somewhere else
    switch(text.split(" ")[0].slice(1)) {
      case "nick":
        this.renameLocalUser(text.split(" ")[1]);
        break;
    }
  },

  renameLocalUser: function(newName) {
    AppDispatcher.dispatch({
      type: ActionTypes.RENAME_LOCAL_USER,
      newName: newName
    })
  }
}
