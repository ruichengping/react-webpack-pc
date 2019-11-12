import intl from 'react-intl-universal';
import {CHANGE_USER_INFO,CHANGE_SYSTEM_LANGUAGE} from './actionTypes';
import { Dispatch } from 'redux';
//拉取用户信息
export const fecthUserInfo=(params?:Params)=> async (dispatch:Dispatch,getState:()=>State,{API}:any)=>{
  const response =await API.fetchUserInfo(params);
  const {success,data} = response;
  if(success){
    dispatch({
      type:CHANGE_USER_INFO,
      payload:data
    });
  }
}
//修改系统语言
export const changeSystemLanguage = (language:string) => async (dispatch:Dispatch,getState:()=>State,{constants}:any) => {
  const {languages}  = constants;
  const finalLanguage = /^en/.test(language)?'en-us':language;
  const locales:any = {};
  languages.forEach((lang:Language)=>{
    const {value,locale} = lang;
    locales[value] = locale;
  });
  await intl.init({
    currentLocale:finalLanguage,
    locales
  })
  localStorage.setItem('lang',finalLanguage)
  dispatch({
    type: CHANGE_SYSTEM_LANGUAGE,
    payload: finalLanguage
  })
}