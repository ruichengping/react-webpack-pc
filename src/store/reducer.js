import {CHANGE_USER_INFO} from './actionTypes';
const initialState={
  userInfo:{
    username:''    
  }
}

export default (state=initialState,actions)=>{
  const {type,payload}=actions;
  switch(type){
    case CHANGE_USER_INFO:
      return {...state,userInfo:payload};
    default:
      return state;
  }
}