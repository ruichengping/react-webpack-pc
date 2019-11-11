import {CHANGE_USER_INFO} from './actionTypes';
import { AnyAction } from 'redux';
const initialState={
  userInfo:{
    username:'',
    email:''
  }
}

export default (state=initialState,actions:AnyAction)=>{
  const {type,payload}=actions;
  switch(type){
    case CHANGE_USER_INFO:
      return {...state,userInfo:payload};
    default:
      return state;
  }
}