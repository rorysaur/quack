var sassPaths = require("node-neat").includePaths.map(function(sassPath) {
    return "includePaths[]=" + sassPath;
}).join("&");

module.exports = {
  entry: './web/static/js/app.js',
  output: {
    path: './priv/static/js',
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.jsx$|app.js$|routes\/routes.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          stage: 0
        }
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass?sourceMap&' + sassPaths
      }
    ]
  }
};
