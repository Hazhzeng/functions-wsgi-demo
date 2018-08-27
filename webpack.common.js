let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  entry: path.resolve(__dirname, 'project', 'static', 'ts', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'project', 'static', 'dist'),
    chunkFilename: '[name].bundle.js',
    filename: '[name].[contenthash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'project', 'static', 'index.html'),
      template: path.resolve(__dirname, 'project', 'templates', 'layout.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|ico)$/,
        loader: 'file-loader',
      },
    ]
  },
};
