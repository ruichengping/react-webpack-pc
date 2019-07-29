'use strict'
const path = require('path')
const os = require('os')
const config = require('config')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const packageConfig = require('../package.json')
const theme=require('../theme')

const devMode = process.env.NODE_ENV !== 'production'

exports.getLocalIPAdress = function (){
  const interfaces = os.networkInterfaces();
  let localIpAdress = '';
  Object.keys(interfaces).forEach((devName)=>{
    const iface = interfaces[devName];
    iface.forEach((alias)=>{
      if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
        localIpAdress = alias.address;
      }
    });
  })
  return localIpAdress;
}
exports.assetsPath = function (_path) {
  return path.posix.join(config.client.assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssModuleLoader = {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      modules:true,
      sourceMap: options.sourceMap
    }
  }
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const styleLoader={
    loader:devMode ? 'style-loader' : MiniCssExtractPlugin.loader
  }
  const isomorphicStyleLoader = {
    loader:'isomorphic-style-loader'
  }
  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaderMapToPreLoaders = {
      css:[styleLoader,cssLoader],
      sass:[isomorphicStyleLoader,cssModuleLoader],
      less:[styleLoader,cssLoader]
    }

    const loaders = loaderMapToPreLoaders[loader]
    if(options.usePostCSS){
      loaders.push(postcssLoader)
    }
    if (loader!=='css') {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    return loaders;
  }
  return {
    css: generateLoaders('css'),
    less: generateLoaders('less',{modifyVars:theme}),
    scss: generateLoaders('sass')
  }
}

exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}


exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
