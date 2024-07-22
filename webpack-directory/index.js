const path = require("path");
const webpack = require("webpack");

const addYarnPnpConfig = (file, options) => {
  const { makeResolver } = require('pnp-webpack-plugin/resolver')
  const findPnpApi = require('module').findPnpApi

  // console.log(makeResolver)
  // console.log(findPnpApi)
  // console.log(file)

  if (findPnpApi && file) {
    const pnpapi = findPnpApi(file)

    // console.log(pnpapi)
    if (pnpapi) {
      const PnpPlugin = {
        apply: makeResolver({ pnpapi }),
      }

      webpackOptions.resolve.plugins.push(PnpPlugin)
    }
  }
}

const entry = path.resolve("../pnp-directory/target_file.js")
const webpackOptions = {
  mode: "development",
  devtool: "inline-source-map",
  entry: [entry],
  output: {
    path: path.resolve("../pnp-directory/dist/"),
    filename: "output.js",
  },
  resolve: {
    plugins: []
  }
};

if (process.versions.pnp) {
  // pnp path
  // addYarnPnpConfig(entry, webpackOptions)
}

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
