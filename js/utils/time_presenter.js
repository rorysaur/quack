var oneHour = 3600000;
var oneDay = 86400000;
var oneWeek = 604800000;
var daysOfTheWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

var monthsOfTheYear = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

var TimePresenter = {
  presentMessageTime: function(timestamp, currentTime) {
    var messageTime = new Date(timestamp);
    var elapsed = currentTime - messageTime;
    if (elapsed < oneHour) {
      return this._inMinutes(elapsed);
    } else if (elapsed < oneDay * 2) {
      return this._handleLastTwoDays(currentTime, messageTime);
    } else if (elapsed < oneWeek) {
      return this._dayAndTime(messageTime);
    } else if (elapsed > oneWeek) {
      return this._dateAndMonth(messageTime);
    }
  },

  _handleLastTwoDays: function(currentTime, messageTime) {
    var apart = this._daysApart(currentTime, messageTime);
    if (apart === 0) {
      return this._justTime(messageTime);
    } else if (apart === 1) {
      return 'Yesterday ' + this._justTime(messageTime);
    } else {
      return this._dayAndTime(messageTime);
    }
  },

  _daysApart: function(date1, date2) {
    // This nonsense is because JavaScript doesn't have a real modulus operator
    return (date1.getDay() - date2.getDay() + 7) % 7;
  },

  _inMinutes: function(milliseconds) {
    var seconds = milliseconds/1000;
    var minutes = Math.floor(seconds/60);
    if (minutes <= 1) {
      return 'just now';
    } else {
      return minutes + ' minutes ago';
    }
  },

  _justTime: function(date) {
   return date.getHours() % 12  + ':' + date.getMinutes() + ' ' + this._amOrPm(date);
  },

  _amOrPm: function(date) {
    if (date.getHours() < 12) {
      return 'AM';
    } else {
      return 'PM';
    }
  },

  _dayAndTime: function(date) {
    return daysOfTheWeek[date.getDay()] + ' ' + this._justTime(date);
  },

  _dateAndMonth: function(date) {
    return monthsOfTheYear[date.getMonth()] + ' ' + date.getDate();
  }
};

module.exports = TimePresenter;
