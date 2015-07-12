jest.dontMock('../user_command_handler');
jest.dontMock('object-assign');
jest.dontMock('react/lib/keyMirror');

describe('UserCommandHandler', function() {
  var UserCommandHandler;
  var Actions;

  beforeEach(function() {
    UserCommandHandler = require('../user_command_handler');
    Actions = require('../../actions/actions');
  });

  it('triggers the renameLocalUser action with nick', function() {
    UserCommandHandler.handle('/nick Micky', Actions);
    expect(Actions.renameLocalUser.mock.calls[0][0]).toBe('Micky');
  });

  it('triggers the changeSetting action with config', function() {
    UserCommandHandler.handle('/set cmd :', Actions);
    expect(Actions.changeSetting.mock.calls[0][0]).toEqual({variable: 'cmd', value: ':'});
  });

  it('triggers the editLastMessage action with s', function() {
    UserCommandHandler.handle('/s/delimeter/delimiter', Actions);
    expect(Actions.editLastMessage.mock.calls[0][0]).toEqual({find: 'delimeter', replaceWith: 'delimiter'});
  });
});
