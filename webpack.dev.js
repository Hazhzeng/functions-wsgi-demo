let webpack = require('webpack');
let merge = require('webpack-merge');
let common = require('./webpack.common.js');
let path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'PRISTINE_MODE': '"development"',
      }
    })
  ],
});
