import * as actionTypes from './actionTypes';

export const changeLanguage=(params)=> (dispatch,getState)=>{
  dispatch({
    type:actionTypes.CHANGE_LANGUAGE,
    payload:params
  });
}