import * as actionTypes from './actionTypes';

import {Dispatch} from 'redux';

export const fetchAuthorData=(params?:Params)=>async (dispatch:Dispatch,getState:()=>State,{API}:any)=>{
  const response= await API.fetchAuthorInfo(params);
  const {success,data} = response;
  if(success){
    dispatch({
      type:actionTypes.CHANGE_AUTHOR_INFO,
      payload:data
    });
  }
}