const path = require('path');
const webpack = require('webpack');
const build_dir = path.resolve(__dirname, './project/static/dist');

module.exports = {
  output: {
    path: build_dir,
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
    {
      enforce: 'pre',
      test: /\.js$/,
      exclude: ['/node_modules/', build_dir],
      loader: 'eslint-loader',
      options: {
        quite: true,
      },
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets:['es2015', 'react', 'stage-0', 'stage-3'],
        plugins: ['react-hot-loader/babel'],
      },
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }
    ]
  },
};
