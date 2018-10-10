import _ from 'lodash'
import http from '../utils/http'

const API_URL={
  fetchUserInfo:{
    method:'GET',
    url:'/api/user'
  },
  fetchAuthorInfo:{
    method:'GET',
    url:'/api/author'
  }
}


const API = {}
_.keys(API_URL).forEach(key=>{
  const item = API_URL[key]
  switch(item.method){
    case 'GET':
      API[key]=function(params){
        return http.get(item.url,params)
      }
      break;
    case 'POST':
      API[key]=function(params){
        return http.post(item.url,params)
      }
      break;
    case 'DELETE':
      API[key]=function(params){
        return http.delete(item.url,params)
      }
      break;
    default:
      API[key]=function(params){
        return http.get(item.url,params)
      }
  } 
})


export default API