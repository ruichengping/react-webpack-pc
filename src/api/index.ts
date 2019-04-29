import _ from 'lodash'
import http from '@/utils/http'
import API_URL from './url';

type UrlObj = {
  [key:string]:{
    method:string,
    url:string
  }
}
function mapUrlObjToFuncObj(urlObj:UrlObj){
  const API: {
    [key:string]:Function
  } = {};
  _.keys(urlObj).forEach((key:string)=>{
    const item = urlObj[key]
    API[key]=function(params:any){
      return http[item.method](item.url,params)
    }
  });
  return API;
}

function mapUrlObjToStrObj(urlObj:UrlObj){
  const Url:{
    [key:string]:string
  } = {};
  _.keys(urlObj).forEach((key:string)=>{
    const item = urlObj[key]
    Url[key]=item.url
  });
  return Url;
}

export const API = mapUrlObjToFuncObj(API_URL);
export const URL = mapUrlObjToStrObj(API_URL);
   