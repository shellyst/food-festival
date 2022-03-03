const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const WebpackPwaManifest = require("webpack-pwa-manifest");

// Create the main configuration object.
// Write objects within this objec that tell webpack what to do.

// Three basic properties: entry, output and mode.
module.exports = {
  // Take code, bundle it and put it into folder we specify.
  entry: {
    app: "./assets/js/script.js",
    events: "./assets/js/events.js",
    schedule: "./assets/js/schedule.js",
    tickets: "./assets/js/tickets.js",
  },

  // Build step creates a series of bundled files, one for each listing in entry object.
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.jpg$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              name(file) {
                return "[path][name].[ext]";
              },
              publicPath: function (url) {
                return url.replace("../", "/assets/");
              },
            },
          },
          {
            loader: "image-webpack-loader",
          },
        ],
      },
    ],
  },

  //   Inside array, tell webpack which plugin we want to use.
  //   providePuglin to define jQuery variables.
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static", // the report outputs to an HTML file in the dist folder
    }),
    // new invokes a constructor function.
    new WebpackPwaManifest({
      name: "Food Event",
      short_name: "Foodies",
      description: "An app that allows you to view upcoming food events.",
      // Homepage for the PWA relative to the location of the manifest file.
      start_url: "../index.html",
      background_color: "#01579b",
      theme_color: "#ffffff",
      // Specific to manifest plugin.
      fingerprints: false,
      // Determines whether the link to the manifest.json is added to the HTML.
      inject: false,
      // Array of objects.
      icons: [
        {
          src: path.resolve("assets/img/icons/icon-512x512.png"),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join("assets", "icons"),
        },
      ],
    }),
  ],
};
