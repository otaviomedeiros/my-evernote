var path = require('path');

module.exports = {
  watchOptions: {
    poll: true
  },
  entry: {
    application: "./src/js/bootstrap.js"
  },
  output: {
    path: path.resolve("./public/assets"),
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js/, loader: "babel", exclude: /node_modules/ },
      { test: /\.css/, loader: "style!css" }
    ]
  }
}
