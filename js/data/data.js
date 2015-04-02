var Firebase = require('firebase');
var FirebaseUtils = require('../utils/firebase');

// TODO put the uri in a constant / env var
var FirebaseRef = new Firebase('https://quack.firebaseio.com');

module.exports = {
  create: function(resourceType, options) {
    if (!options) {
      console.log('No options specified.');
      return;
    }

    var handlers = {
      message: function() {
        if (!options.message) {
          console.log('No message specified.');
          if (options.error) {
            options.error();
          }
          return;
        }

        // hard-code "bestcohort" for now
        var messagesRef = FirebaseRef.child('messages/bestcohort');
        messagesRef.push(
          options.message,
          function(err) {
            if (err) {
              if (options.error) {
                options.error(err);
              }
              return;
            }

            if (options.success) {
              options.success();
            }
          }
        );
      }
    };

    if (handlers[resourceType]) {
      handlers[resourceType]();
    }
  },

  get: function(resourceType, options) {
    if (!options) {
      console.log('No options specified.');
      return;
    }

    var handlers = {
      messages: function() {
        if (!options.channel) {
          console.log('No channel specified.');
          if (options.error) {
            options.error();
          }
          return;
        }

        if (!options.success) {
          console.log('No success callback specified.');
          if (options.error) {
            options.error();
          }
          return;
        }

        var messagesRef = FirebaseRef.child('messages/' + options.channel);
        messagesRef.once(
          'value',
          function(snapshot) {
            var messageObjs = snapshot.val();
            var messages = FirebaseUtils.toArray(messageObjs);
            options.success(messages);
            return;
          },
          function(err) {
            if (options.error) {
              options.error(err);
            }
            return;
          }
        );
      }
    };

    if (handlers[resourceType]) {
      handlers[resourceType]();
    }
  },

  off: function(eventName, options) {
    if (!options) {
      console.log('No options specified.');
      return;
    }

    var handlers = {
      incoming_message: function() {
        if (!options.channel) {
          console.log('No channel specified.');
          return;
        }

        var messagesRef = FirebaseRef.child('messages/' + options.channel);
        messagesRef.off('child_added');
      }
    };

    if (handlers[eventName]) {
      handlers[eventName]();
    }
  },

  on: function(eventName, options) {
    if (!options) {
      console.log('No options specified.');
      return;
    }

    var handlers = {
      incoming_message: function() {
        if (!options.channel) {
          console.log('No channel specified.');
          return;
        }

        if (!options.success) {
          console.log('No success callback specified.');
          return;
        }

        var messagesRef = FirebaseRef.child('messages/' + options.channel);
        messagesRef.on('child_added', function(snapshot) {
          var newMessage = snapshot.val();
          newMessage.key = snapshot.key();
          options.success(newMessage);
        });
      }
    };

    if (handlers[eventName]) {
      handlers[eventName]();
    }
  }
};
