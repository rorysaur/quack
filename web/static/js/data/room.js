var ActionTypes = require('../constants/constants').ActionTypes;
var AppDispatcher = require('../dispatcher/app_dispatcher');
var UserStore = require("../stores/user_store");

var dispatch = function(type, data) {
  AppDispatcher.dispatch({
    type: type,
    data: data
  });
};

var DispatchHandler = {};
DispatchHandler[ActionTypes.CREATE_MESSAGE] = function(message, room) {
  if (message.roomName == room.name) {
    room.chan.push('msg:new', message);
  }
};

DispatchHandler[ActionTypes.RENAME_LOCAL_USER] = function(data, room) {
  room.chan.push('user:nickchange', data);
};

var Room  = function(phoenixChan) {
  this.chan = phoenixChan;
  this.chan.params.user = UserStore.localUser();
  this.name = this.chan.topic.split(':')[1];
  this.users = [];
  this.chan.join()
      .receive('ignore', function() { console.log('auth error'); })
      .receive('error', function(e) { console.log('errr', e);})
      .receive('ok', function(roomUsers) {
        this.users = roomUsers;
        dispatch(ActionTypes.USER_JOINED, {roomName: this.name});
      }.bind(this));

  this.dispatchToken = AppDispatcher.register(function(action) {
    if (DispatchHandler.hasOwnProperty(action.type)) {
      DispatchHandler[action.type](action.data, this);
    }
  }.bind(this));

  this.chan.onError(function(e) {
     console.log('something went wrong', e);
  });

  this.chan.onClose(function(e) {
    console.log('channel closed', e);
  });

  this.chan.on('msg:new', function(msg) {
    msg.roomName = this.name;
    dispatch(ActionTypes.INCOMING_MESSAGE, msg);
  }.bind(this));

  this.chan.on('user:joined', function(msg) {
    this.users = msg.users;
    dispatch(ActionTypes.USER_LIST_CHANGE, {roomName: this.name});
  }.bind(this));

  this.chan.on('user:left', function(msg) {
    this.users = msg.users;
    dispatch(ActionTypes.USER_LIST_CHANGE, {roomName: this.name});
  }.bind(this));

  this.chan.on('user:nickchange', function(msg) {
    this.users = msg.users;
    dispatch(ActionTypes.USER_LIST_CHANGE, {roomName: this.name});
  }.bind(this));
};

Room.prototype.leave = function() {
  this.chan.leave();
};


module.exports = Room;
