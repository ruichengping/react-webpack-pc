'use strict'
require('../build/check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('config')
const clientWebpackConfig = require('../build/webpack.client.conf')
const serverWebpackConfig = require('../build/webpack.server.conf')
const promises = []
const spinner = ora('building for production...')
spinner.start()
rm(config.assetsRoot, err => {
  if (err) throw err
  //client webpack
  promises.push(new Promise((resolve,reject)=>{
    webpack(clientWebpackConfig, (err, stats) => {
      if (err) reject(err)
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')
      if (stats.hasErrors()) {
        console.log(chalk.red('  Client Build failed with errors.\n'))
        process.exit(1)
      }
      resolve()
    })
  }))
  //server webpack
  promises.push(new Promise((resolve,reject)=>{
    webpack(serverWebpackConfig, (err, stats) => {
      if (err) reject(err)
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')
      if (stats.hasErrors()) {
        console.log(chalk.red('  Server Build failed with errors.\n'))
        process.exit(1)
      }
      resolve()
    })
  }))

  Promise.all(promises).then(()=>{
    spinner.stop()
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n'
    ))
  }).catch((err)=>{
    spinner.stop()
    throw err;
  })
})
