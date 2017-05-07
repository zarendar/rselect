var path = require("path");
module.exports = {
  entry: "./examples/index.js",
  output: {
    path: path.resolve(__dirname, "examples"),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  }
};
