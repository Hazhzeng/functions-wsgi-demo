const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const build_dir = path.resolve(__dirname, './project/static/dist');

module.exports = merge(common, {
  devtool: 'source-map',
  devServer: {
    contentBase: build_dir,
    hot: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE:ENV': '"development"',
    })
  ],
});
