var Parser = {
  delimiters: [" ", "/"],

  parse: function(text) {
    text = text.slice(1); // remove command character
    var delimiter = this.getDelimiter(text);
    var args = text.split(delimiter);
    return {
      command: args[0],
      args: args.slice(1)
    };
  },

  //Find which of the possible delimeters is used
  getDelimiter: function(text) {
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

    var userCommandRouter = {
      nick: function() {
        actions.renameLocalUser(args[0]);
      },

      config: function() {
        actions.changeSetting({
          variable: args[0],
          value: args[1]
        });
      },

      s: function() {
        actions.editLastMessage({
          find: args[0],
          replaceWith: args[1]
        });
      }
    };

    if (userCommandRouter.hasOwnProperty(command)) {
      userCommandRouter[command]();
    } else {
      actions.flashNotify('Unknown command: ' + command);
    }
  }
};
