import {CHANGE_AUTHOR_INFO} from './actionTypes';
import {AnyAction} from 'redux';
const initialState={
  info:{}
}

export default (state=initialState,actions:AnyAction)=>{
  const {type,payload}=actions;
  switch(type){
    case CHANGE_AUTHOR_INFO:
      return {...state,info:payload};
    default:
      return state;
  }
}