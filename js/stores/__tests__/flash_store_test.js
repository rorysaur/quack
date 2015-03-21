jest.dontMock('../flash_store');
jest.dontMock('object-assign');
jest.dontMock('react/lib/keyMirror');

describe('FlashStore', function() {
  var AppDispatcher;
  var FlashStore;
  var callback;
  
  var ActionTypes = require('../../constants/constants').ActionTypes;
  
  beforeEach(function() {
    AppDispatcher = require('../../dispatcher/app_dispatcher');
    FlashStore = require('../flash_store');
    callback = AppDispatcher.register.mock.calls[0][0];
  });


});
