const os = require('os')
export const getLocalIpAdress = function (){
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