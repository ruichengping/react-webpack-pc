import {keys} from 'lodash'
import http from '@/utils/http'
import {Api,ApiModel} from './url';


function mapUrlObjToFuncObj(apiModel:Api){
  const API: {
    [propName:string]:Function
  } = {};
  keys(apiModel).forEach((key:string)=>{
    const item = apiModel[key]
    API[key]=function(params:any){
      return http[item.method](item.url,params)
    }
  });
  return API;
}

function mapUrlObjToStrObj(apiModel:Api){
  const Url:{
    [propName:string]:string
  } = {};
  keys(apiModel).forEach((key:string)=>{
    const item = apiModel[key]
    Url[key]=item.url
  });
  return Url;
}

export const API = mapUrlObjToFuncObj(ApiModel);
export const URL = mapUrlObjToStrObj(ApiModel);
   