jest.dontMock('../user_store');
jest.dontMock('object-assign');
jest.dontMock('react/lib/keyMirror');

describe('UserStore', function() {
  var AppDispatcher;
  var UserStore;
  var callback;

  var ActionTypes = require('../../constants/constants').ActionTypes;
  var actionRenameLocalUser = {
    type: ActionTypes.RENAME_LOCAL_USER,
    data: {
      id: 1,
      newName: "Butterscotch"
    }
  };

  beforeEach(function() {
    AppDispatcher = require('../../dispatcher/app_dispatcher');
    UserStore = require('../user_store');
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('changes a the local users name', function() {
    var oldName = UserStore.localUser().name;
    callback(actionRenameLocalUser);
    var newName = UserStore.localUser().name;
    expect(newName).toNotBe(oldName);
    expect(newName).toBe(actionRenameLocalUser.data.newName);
  });
});
