module.exports = {
  entry: "./test/entry.js",
  output: {
    path: __dirname + "/test",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  }
};
