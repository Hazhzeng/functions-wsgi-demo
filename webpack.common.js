/* eslint-disable */
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

let staticPath = path.resolve(__dirname, 'project', 'static');

module.exports = {
  resolve: {
    alias: {
      base: path.resolve(staticPath, 'src'),
    },
    extensions: ['.js', '.jsx']
  },
  entry: {
    index: path.resolve(staticPath, 'src', 'index.jsx'),
    account: path.resolve(staticPath, 'src', 'pages', 'AccountPage.jsx'),
    compose: path.resolve(staticPath, 'src', 'pages', 'ComposePage.jsx'),
    home: path.resolve(staticPath, 'src', 'pages', 'HomePage.jsx'),
    roadmap: path.resolve(staticPath, 'src', 'pages', 'RoadmapPage.jsx'),
    information: path.resolve(staticPath, 'src', 'pages', 'InformationPage.jsx'),
  },
  output: {
    path: path.resolve(staticPath, 'dist'),
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
