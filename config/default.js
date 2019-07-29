const path = require('path');
const assetsRoot = path.join(__dirname,'../dist');
module.exports={
  assetsRoot,
  client:{
    assetsRoot: path.join(assetsRoot, '/client/static'),
    assetsPublicPath: '/',
    assetsSubDirectory: '',
    index: path.join(assetsRoot, '/client/index.hbs')
  },
  server:{
    assetsRoot: path.join(assetsRoot, '/server'),
    port: 8000
  }
}