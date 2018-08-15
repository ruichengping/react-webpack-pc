import * as actionTypes from './actionTypes';

export const fetchBasicData=(params)=> (dispatch,getState)=>{
  dispatch({
    type:actionTypes.CHANGE_LANGUAGE,
    payload:params
  });
}