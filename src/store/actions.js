import {CHANGE_USER_NAME} from './actionTypes';

export const fecthUserName=(params)=> async (dispatch,getState,{API})=>{
  const response =await API.fetchUserInfo(params);
  const {success,data} = response;
  if(success){
    dispatch({
      type:CHANGE_USER_NAME,
      payload:data
    });
  }
}