module.exports = {
  toArray: function(obj) {
    var results = [];
    for (var id in obj) {
      if (obj.hasOwnProperty(id)) {
        results.push(obj[id]);
      }
    }
    return results;
  },

  clone: function(obj) {
    return JSON.parse(JSON.stringify(obj)); 
  }
};
