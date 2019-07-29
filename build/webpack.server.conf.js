'use strict'
const path = require('path')
const webpack = require('webpack')
const config = require('config')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const nodeExternals = require('webpack-node-externals');
const utils = require('./utils')
const getBaseWebpackConfig = require('./webpack.base.conf')
const isProd = process.env.NODE_ENV === 'production';
const devPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new FriendlyErrorsPlugin({
    compilationSuccessInfo: {
      messages: [`server build successfully`],
    },
    onErrors: config.client.notifyOnErrors
    ? utils.createNotifierCallback()
    : undefined
  })
];
const prodPlugins = [];
module.exports = merge(getBaseWebpackConfig('server'), {
  entry:'./app/index.js',
  output:{
    path:config.server.assetsRoot,
    filename:'[name].js'
  },
  module: {
    rules: utils.styleLoaders({type:'server',sourceMap: config.server.cssSourceMap, usePostCSS: true })
  },
  target:'node',
  mode:isProd?'production':'development',
  devtool: config.server.devtool,
  externals:[nodeExternals()],
  plugins: isProd?prodPlugins:devPlugins
})
