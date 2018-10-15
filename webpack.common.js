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
  entry: {
    index: path.resolve(__dirname, 'project', 'static', 'src', 'index.jsx'),
    account: path.resolve(__dirname, 'project', 'static', 'src', 'pages', 'AccountPage.jsx'),
    compose: path.resolve(__dirname, 'project', 'static', 'src', 'pages', 'ComposePage.jsx'),
    home: path.resolve(__dirname, 'project', 'static', 'src', 'pages', 'HomePage.jsx'),
    roadmap: path.resolve(__dirname, 'project', 'static', 'src', 'pages', 'RoadmapPage.jsx'),
  },
  output: {
    path: path.resolve(__dirname, 'project', 'static', 'dist'),
    chunkFilename: '[chunkhash].bundle.js',
    filename: '[name].[contenthash].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    }
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
