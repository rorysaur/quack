var SettingsStore = require('../stores/settings_store');

var Parser = {
  delimiters: [" ", "/"],

  parse: function(text) {
    text = text.slice(1); // remove command character
    var delimiter = this.getDelimeter(text);
    var args = text.split(delimiter);
    return {
      command: args.shift(),
      args: args
    };
  },

  //Find which of the possible delimeters is used
  getDelimeter: function(text) {
    for (var i in text) {
      if (this.delimiters.indexOf(text[i]) > -1) {
        return text[i];
      }
    }
  }
};

module.exports = {
  handle: function(text, actions) {
    var parsed = Parser.parse(text);
    var command = parsed.command;
    var args = parsed.args;

    switch(command) {

      case 'nick':
        actions.renameLocalUser(args[0]);
      break;

      case 'config':
        actions.changeSetting({
        variable: args[0],
        value: args[1]
      });
      break;

      case 's':
        actions.editLastMessage({
        find: args[0],
        replaceWith: args[1]
      });
      break;
    }
  }
};
