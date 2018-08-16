import * as actionTypes from './actionTypes';
import API from '../api';
import http from '../utils/http';

export const fecthUserName=(params)=> async (dispatch,getState)=>{
  const response =await http.get(API.USER_INFO,params);
  const {success,data} = response;
  if(success){
    dispatch({
      type:actionTypes.CHANGE_USER_NAME,
      payload:data
    });
  }
}