import express from 'express';
import config from 'config';
import chalk from 'chalk';
import utils from '../build/utils';
import proxy from 'http-proxy-middleware';
import hbs from 'hbs';
import render from './render';
const app = express();
hbs.registerHelper('safe_string',(code)=>{
  return new hbs.SafeString(code);
})
app.set('views','dist/client');
app.set('view engine', 'hbs');
app.use(express.static('dist/client/static'));
app.use('/api',function(req,res,next){
  proxy({
    target:config.server.proxy.target,
    changeOrigin: true })(req,res,next);
})
app.get('*',(req,res)=>{
  console.log(req.url);
  render(req,res);
});

app.listen(config.server.port,()=>{
  if(process.env.NODE_ENV === 'production') console.log(chalk.green(`Your application is running here: http://${utils.getLocalIPAdress()}:${config.server.port}`)) 
});