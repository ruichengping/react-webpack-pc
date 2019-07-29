import * as actionTypes from './actionTypes';
export const changeAuthorInfo = (dispatch,data)=>{
  dispatch({
    type:actionTypes.CHANGE_AUTHOR_INFO,
    payload:data
  });
} 
export const fetchAuthorData=(params)=>async (dispatch,getState,{API})=>{
  const response = await API.fetchAuthorInfo(params);
  const {success,data} = response;
  if(success){
    changeAuthorInfo(dispatch,data)
  }
}