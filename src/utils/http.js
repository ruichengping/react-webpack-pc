import axios from 'axios'
const instance=axios.create({
  //超时时间
  timeout:3000,
  //响应前处理
  transformResponse:(data)=>{
    console.log(data)
  }
})

export default {
  get:(url,params,option)=>{
    return instance.get(url,Object.assign({
      params
    },option));
  },
  post:(url,params,option)=>{
    return instance.post(url,params,option); 
  },
  delete:(url,params,option)=>{
    return instance.delete(url,Object.assign({
      params
    },option));
  }
}