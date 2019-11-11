import {CHANGE_USER_INFO} from './actionTypes';
import { Dispatch } from 'redux';

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