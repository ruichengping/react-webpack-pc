import {CHANGE_USER_INFO,CHANGE_SYSTEM_LANGUAGE} from './actionTypes';
const initialState={
  userInfo:{
    username:'--',
    email:'--'   
  },
  language:'zh-cn'
}

export default (state=initialState,actions)=>{
  const {type,payload}=actions;
  switch(type){
    case CHANGE_USER_INFO:
      return {...state,userInfo:payload};
    case CHANGE_SYSTEM_LANGUAGE:
      return {...state,language:payload}
    default:
      return state;
  }
}