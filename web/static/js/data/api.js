var $ = require('jquery');

var QuackAPI = {
  post: function(params) {
    $.ajax({
      type: 'post',
      url: '/api/register',
      data: params,
      success: function() {
        console.log('Success!');
      },
      error: function() {
        console.log('Error! :(');
      }
    });
  }
};

module.exports = QuackAPI;
