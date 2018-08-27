let webpack = require('webpack');
let merge = require('webpack-merge');
let common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'PRISTINE_MODE': '"production"',
      }
    })
  ],
});
