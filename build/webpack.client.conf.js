'use strict'
const path = require('path');
const config = require('config')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const getBaseWebpackConfig = require('./webpack.base.conf')
const utils = require('./utils')


const devPlugins = [
  new HtmlWebpackPlugin({
    filename: config.client.index,
    template: 'index.hbs',
    inject: true
  }),
  new webpack.HotModuleReplacementPlugin(),
  new FriendlyErrorsPlugin({
    compilationSuccessInfo: {
      messages: [`client build successfully`]
    },
    onErrors: config.client.notifyOnErrors
    ? utils.createNotifierCallback()
    : undefined
  })
];
const prodPlugins = [
  new MiniCssExtractPlugin({
    filename: utils.assetsPath('css/[name].[contenthash].css'),
    chunkFilename: utils.assetsPath('css/[id].css')
  }),
  new HtmlWebpackPlugin({
    filename: config.client.index,
    template: 'index.hbs',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    },
    chunksSortMode: 'dependency'
  }),
  new webpack.HashedModuleIdsPlugin()
];
const isProd = process.env.NODE_ENV === 'production';
const clientWebpackConfig = merge(getBaseWebpackConfig('client'),{
  entry: {
    app: './src/main.js'
  },
  output:{
    path: config.client.assetsRoot,
    filename: isProd?utils.assetsPath('js/[name].[chunkhash].js'):'[name].js',
    publicPath:config.client.assetsPublicPath,
    chunkFilename: isProd?utils.assetsPath('js/[id].[chunkhash].js'):undefined
  },
  mode:isProd?'production':'development',
  devtool: config.client.sourceMap || process.env.NODE_ENV === 'development'? config.client.devtool : false,
  optimization:isProd?{
    splitChunks:{
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    },
    minimizer:[
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: config.client.sourceMap
          ? { safe: true, map: { inline: false } }
          : { safe: true }
      }),
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false
          }
        },
        cache:true,
        parallel: true,
        sourceMap: config.client.sourceMap
      }),
    ]
  }:{},
  module: {
    rules: utils.styleLoaders({type:'client',sourceMap: config.client.sourceMap, usePostCSS: true })
  },
  plugins:[new CopyWebpackPlugin([
    {
      from: path.resolve(__dirname, '../static'),
      to: config.client.assetsSubDirectory,
      ignore: ['.*']
    }
  ])].concat(isProd?prodPlugins:devPlugins)
})
module.exports = clientWebpackConfig;