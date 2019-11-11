import {CHANGE_USER_INFO} from './actionTypes';

export const fecthUserInfo=(params)=> async (dispatch,getState,{API})=>{
  const response =await API.fetchUserInfo(params);
  const {success,data} = response;
  if(success){
    dispatch({
      type:CHANGE_USER_INFO,
      payload:data
    });
  }
}