const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const build_dir = path.resolve(__dirname, './project/static/dist');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
  entry: {
    'app': path.resolve(__dirname, './project/static/js/index_prod.js'),
  },
  plugins: [
    new UglifyJsPlugin({
      test: /\.js$/,
      exclude: ['/node_modules/', build_dir],
      parallel: false,
      sourceMap: false,
      cache: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
  ],
});
