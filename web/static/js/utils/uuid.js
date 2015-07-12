var randomHex = function() {
  return (Math.random() * 1000000000000).toString(16); 
};

module.exports = {
  generate: function() {
     return randomHex() + '-' + randomHex() + '-' + randomHex();
  }
};
