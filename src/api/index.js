import {keys} from 'lodash'
import http from '@/utils/http'
import API_URL from './url';

function mapUrlObjToFuncObj(urlObj){
  const API = {};
  keys(urlObj).forEach((key)=>{
    const item = urlObj[key]
    API[key]=function(params,options){
      return http[item.method](item.url,params,options)
    }
  });
  return API;
}

function mapUrlObjToStrObj(urlObj){
  const Url = {};
  keys(urlObj).forEach((key)=>{
    const item = urlObj[key]
    Url[key]=item.url
  });
  return Url;
}

export const API = mapUrlObjToFuncObj(API_URL);
export const URL = mapUrlObjToStrObj(API_URL);
   