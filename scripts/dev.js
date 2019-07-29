'use strict'
process.env.NODE_ENV = 'development'
const webpack = require('webpack');
const path = require('path');
const config = require('config');
const nodemon = require('nodemon');
const ora = require('ora')
const rm = require('rimraf')
const utils = require('../build/utils')
const clientWebpackConfig = require('../build/webpack.client.conf');
const serverWebpackConfig = require('../build/webpack.server.conf');

const clientCompiler = webpack(clientWebpackConfig);
const serverCompiler = webpack(serverWebpackConfig);
const promises = [];
const clientBuildSpinner = ora('client webpack building ...')
const serverBuildSpinner = ora('server webpack building ...')
rm(config.assetsRoot,(err)=>{
  if (err) throw err;
  //client webpack
  promises.push(new Promise((resolve,reject)=>{
    clientBuildSpinner.start();
    clientCompiler.watch({
      poll:false
    },(err, stats)=>{
      clientBuildSpinner.stop();
      if(err) reject(err);
      resolve();
    })
  }));
  //server webpack
  promises.push(new Promise((resolve,reject)=>{
    serverBuildSpinner.start();
    serverCompiler.watch({
      poll:false
    },(err, stats)=>{
      serverBuildSpinner.stop();
      if(err) reject(err);
      resolve();
    })
  }));
  Promise.all(promises).then(()=>{
    nodemon({
      script:path.resolve(__dirname,'../dist/server/main.js')
    }).on('start',()=>{
      console.log()
      console.log(`Your application is running here: http://localhost:${config.server.port}`)
    }).on('restart',(files)=>{
      console.log('App restarted due to: ', files);
    }).on('quit', function () {
      console.log('App has quit');
      process.exit();
    });
  }).catch((err)=>{
    throw err;
  });
});
