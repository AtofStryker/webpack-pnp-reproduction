const path = require("path");
const webpack = require("webpack");

const webpackOptions = {
  mode: "development",
  devtool: "inline-source-map",
  entry: [path.resolve("../pnp-directory/target_file.js")],
  output: {
    path: path.resolve("../pnp-directory/dist/"),
    filename: "output.js",
  },
};

console.log(webpackOptions);

const compiler = webpack(webpackOptions);

var handle = function (err, stats) {
  if (err) {
    throw err;
  }
  var jsonStats = stats.toJson();
  // these stats are really only useful for debugging
  console.log(jsonStats);
};

compiler.run(handle);
