var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: {
    application: "./src/js/bootstrap.js",
    vendor: ["angular", "angular-route", "angular-messages", "jquery"]
  },
  output: {
    path: path.resolve("./public/assets"),
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js/, loader: "babel", exclude: /node_modules/ },
      { test: /\.less/, loader: "style!css!less" },
      { test: /\.css/, loader: "style!css" },
      { test: /\.(png|jpg|jpeg|gif|woff|ttf|eot|svg)/, loader: "url-loader" }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
    new webpack.ProvidePlugin({ "window.jQuery": "jquery" })
  ],
  watchOptions: {
    poll: true
  }
}
