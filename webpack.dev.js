/* eslint-disable */
let webpack = require('webpack');
let merge = require('webpack-merge');
let common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval',
  cache: true,
  parallelism: 2,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'PRISTINE_MODE': '"development"',
      }
    })
  ]
});
