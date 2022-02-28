const path = require("path");
const webpack = require("webpack");

// Create the main configuration object.
// Write objects within this objec that tell webpack what to do.

// Three basic properties: entry, output and mode.
module.exports = {
  // Take code, bundle it and put it into folder we specify.
  entry: "./assets/js/script.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.bundle.js",
  },
  //   Insdide array, tell webpack which plugin we want to use.
  //   providePuglin to define jQuery variables.
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],
  // Mode in which we want webpack to run. Default: production.
  mode: "development",
};
