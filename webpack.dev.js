/* eslint-disable */
let path = require('path');
let webpack = require('webpack');
let merge = require('webpack-merge');
let common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  cache: true,
  parallelism: 2,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'PRISTINE_MODE': '"development"',
      }
    }),
    new webpack.SourceMapDevToolPlugin({
      test: /\.(js|jsx)$/,
      filename: '[name].js.map',
      include: path.resolve(__dirname, 'project', 'static', 'src'),
      exclude: path.resolve(__dirname, 'node_modules'),
    }),
  ]
});
