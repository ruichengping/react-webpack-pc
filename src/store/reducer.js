import * as actionTypes from './actionTypes';
const initialState={
  username:''
}

export default (state=initialState,actions)=>{
  const {type,payload}=actions;
  switch(type){
    case actionTypes.CHANGE_USER_NAME:
      return Object.assign({},initialState,{username:payload});
      break;
    default:
      return state;
  }
}