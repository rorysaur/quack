var RoomStore = require('../stores/room_store');

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

      set: function() {
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
      },

      join: function() {
        if (args[0] === undefined) {
          actions.flashNotify('Must pass room name to /join, i.e. `/join bestcohort`');
        } else {
          actions.subscribe(args[0]);
        }
      },

      leave: function() {
        var room;
        if (args[0] !== undefined) {
          room = args[0];
        } else {
          room = RoomStore.activeRoom();
        }

        actions.unsubscribe(room);
      },

      me: function() {
        actions.chatAction(args.join(" "));
      }
    };

    if (userCommandRouter.hasOwnProperty(command)) {
      userCommandRouter[command]();
    } else {
      actions.flashNotify('Unknown command: ' + command);
    }
  }
};
