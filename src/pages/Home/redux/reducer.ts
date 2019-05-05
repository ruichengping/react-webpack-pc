import * as actionType from './actionTypes';
import {AnyAction} from 'redux';
const initialState={
  info:{}
}

export default (state=initialState,actions:AnyAction)=>{
  const {type,payload}=actions;
  switch(type){
    case actionType.CHANGE_AUTHOR_INFO:
      return Object.assign({},initialState,{info:payload});
      break;
    default:
      return state;
  }
}