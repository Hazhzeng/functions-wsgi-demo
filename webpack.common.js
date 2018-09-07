/* eslint-disable */
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  resolve: {
    alias: {
      base: path.resolve(__dirname, 'project', 'static', 'src'),
    },
    extensions: ['.js', '.jsx']
  },
  entry: path.resolve(__dirname, 'project', 'static', 'src', 'index.jsx'),
  output: {
    path: path.resolve(__dirname, 'project', 'static', 'dist'),
    chunkFilename: '[name].bundle.js',
    filename: '[name].[hash].js'
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
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|ico)$/,
        loader: 'file-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
};
