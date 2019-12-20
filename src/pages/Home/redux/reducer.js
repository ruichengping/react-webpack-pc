import {CHANGE_AUTHOR_INFO} from './actionTypes';
const initialState={
  info:{}
}

export default (state=initialState,actions)=>{
  const {type,payload}=actions;
  switch(type){
    case CHANGE_AUTHOR_INFO:
      return {...state,info:payload};
    default:
      return state;
  }
}