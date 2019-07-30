import * as actionTypes from './actionTypes';
import { Dispatch } from 'redux';

export const fecthUserName=(params?:Params)=> async (dispatch:Dispatch,getState:()=>State,{API}:any)=>{
  const response =await API.fetchUserInfo(params);
  const {success,data} = response;
  if(success){
    dispatch({
      type:actionTypes.CHANGE_USER_NAME,
      payload:data
    });
  }
}