const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const build_dir = path.resolve(__dirname, './project/static/dist');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
  plugins: [
    new UglifyJsPlugin({
      test: /\.js$/,
      exclude: ['/node_modules/', build_dir],
      parallel: true,
      parallel: 2,
      sourceMap: true,
      cache: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
  ],
});
