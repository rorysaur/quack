jest.dontMock('../help');

describe('Help', function() { 
  var Help;
  var testObject = {
    name: 'Ajax',
    skill: 'Jumping'
  };

  beforeEach(function() {
    Help = require('../help');
  });

  it('converts object values to array', function() {
    expect(Help.toArray(testObject)).toEqual(['Ajax', 'Jumping']);
  });

  it('clones objects', function() {
    cloneObject = Help.clone(testObject);
    expect(cloneObject).toEqual(testObject);
    expect(cloneObject).toNotBe(testObject);
    cloneObject.skill = 'Grey-eyed';
    expect(testObject.skill).toNotBe('Grey-eyed');
  });

});
