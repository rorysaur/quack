jest.dontMock('../time_presenter');

describe('TimePresenter', function() {
  var TimePresenter;
  var messageTime = 1427604441289; 
  var thirtySeconds = 30000;
  var fortyFiveMinutes = 2700000;
  var oneHour = 3600000;
  var oneDay = 86400000;
  var oneWeek = 604800000;

  beforeEach(function() {
    TimePresenter = require('../time_presenter');
  });

  it("displays times within the last minute as 'just now'", function() {
    var displayTime = TimePresenter.presentMessageTime(messageTime, new Date(messageTime + thirtySeconds));
    expect(displayTime).toBe('just now');
  });

  it("displays times from within the hour as 'x minutes ago'", function() {
    var displayTime = TimePresenter.presentMessageTime(messageTime, new Date(messageTime + fortyFiveMinutes));
    expect(displayTime).toBe('45 minutes ago');
  });

  it('displays times from earlier in the day with the time', function() {
    var displayTime = TimePresenter.presentMessageTime(messageTime, new Date(messageTime + (oneHour * 2)));
    expect(displayTime).toBe('9:47 PM');
  });

  it("displays times from yesterday with 'Yesterday at X:XX'", function() {
    var displayTime = TimePresenter.presentMessageTime(messageTime, new Date(messageTime + (oneHour * 5)));
    expect(displayTime).toBe('Yesterday 9:47 PM');
  });

  it('displays the day and time after more than two days have passed', function() {
    var displayTime = TimePresenter.presentMessageTime(messageTime, new Date(messageTime + (oneDay * 3)));
    expect(displayTime).toBe('Saturday 9:47 PM');
  });

  it('displays the date and month after more than a week has passed', function() {
    var displayTime = TimePresenter.presentMessageTime(messageTime, new Date(messageTime + (oneWeek * 2)));
    expect(displayTime).toBe('March 28');
  });
});
