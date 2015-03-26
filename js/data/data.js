var Firebase = require('firebase');
var FirebaseUtils = require('../utils/firebase');

// TODO put the uri in a constant / env var
var FirebaseRef = new Firebase('https://quack.firebaseio.com');

module.exports = {
  create: function(resourceType, options) {
    var handlers = {
      message: function() {
        if (!options || !options.message) {
          console.log('No message specified.');
          if (options && options.error) {
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
              if (options && options.error) {
                options.error(err);
              }
              return;
            }

            if (options && options.success) {
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
    var handlers = {
      messages: function() {
        if (!options || !options.channel) {
          console.log('No channel specified.');
          if (options && options.error) {
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
            if (options && options.success) {
              options.success(messages);
            }
            return;
          },
          function(err) {
            if (options && options.error) {
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
  }
};
