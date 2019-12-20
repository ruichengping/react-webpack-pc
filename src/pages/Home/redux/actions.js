import {CHANGE_AUTHOR_INFO} from './actionTypes';

export const fetchAuthorData=(params)=>async (dispatch,getState,{API})=>{
  const response= await API.fetchAuthorInfo(params);
  const {success,data} = response;
  if(success){
    dispatch({
      type:CHANGE_AUTHOR_INFO,
      payload:data
    });
  }
}