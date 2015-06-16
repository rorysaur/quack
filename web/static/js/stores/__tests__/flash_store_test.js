jest.dontMock('../flash_store');
jest.dontMock('object-assign');
jest.dontMock('react/lib/keyMirror');

describe('FlashStore', function() {
  var AppDispatcher;
  var FlashStore;
  var callback;
  
  var ActionTypes = require('../../constants/constants').ActionTypes;

  var actionChangeSetting = {
    type: ActionTypes.CHANGE_SETTING,
    data: {
      variable: "the Self-Destruct Code"
    }
  };
  
  beforeEach(function() {
    AppDispatcher = require('../../dispatcher/app_dispatcher');
    FlashStore = require('../flash_store');
    callback = AppDispatcher.register.mock.calls[0][0];

  });

  it('adds a message about a settings variable change', function() {
   var SettingsStore = require('../settings_store');
   SettingsStore.get.mockReturnValue('password1');
   callback(actionChangeSetting);
   expect(FlashStore.message()).toBe("the Self-Destruct Code is now 'password1'");
  });

  it('clears the flash message', function() {
    callback(actionChangeSetting);
    expect(FlashStore.message()).toNotBe('');
    callback({type: ActionTypes.CLEAR_FLASH});
    expect(FlashStore.message()).toBe('');
  });

});
