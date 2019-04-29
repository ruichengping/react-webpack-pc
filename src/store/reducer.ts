import * as actionTypes from './actionTypes';
import { AnyAction } from 'redux';
const initialState={
  username:''
}

export default (state=initialState,actions:AnyAction)=>{
  const {type,payload}=actions;
  switch(type){
    case actionTypes.CHANGE_USER_NAME:
      return Object.assign({},initialState,{username:payload});
      break;
    default:
      return state;
  }
}