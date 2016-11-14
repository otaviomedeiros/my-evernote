"use strict";

var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config");

gulp.task("watch", (callback) => {
  webpack(devWebpackConfig(), (err, stats) => {
    if(err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString());
    callback();
  });
});


const devWebpackConfig = () => {
  let devConfig = webpackConfig;
  devConfig.watch = true;
  devConfig.watchOptions = { poll: true };
  return devConfig;
}
