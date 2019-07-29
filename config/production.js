const path = require('path');
module.exports={
  client:{
    sourceMap: true,
    devtool: 'source-map'
  },
  server:{
    devtool:'source-map',
    proxy:{
      target:'http://127.0.0.1:3000'
    }
  }
}