import * as actionTypes from './actionTypes';
import http from '../../../utils/http';
import API from '../../../api';

export const fetchAuthorData=(params)=>async (dispatch,getState)=>{
  const response= await http.get(API.AUTHOR_INFO,params);
  const {success,data} = response;
  if(success){
    dispatch({
      type:actionTypes.CHANGE_AUTHOR_INFO,
      payload:data
    });
  }
}