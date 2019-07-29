module.exports={
  client:{
    sourceMap: false,
    devtool:' cheap-module-eval-source-map',
    notifyOnErrors:true
  },
  server:{
    devtool:' cheap-module-eval-source-map',
    proxy:{
      target:'http://127.0.0.1:3000'
    }
  }
}