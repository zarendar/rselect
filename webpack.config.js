const path = require('path');

module.exports = {
  entry: './examples/index.js',
  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  },
  output: {
    path: path.resolve(__dirname, 'examples'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  }
};
