import {CHANGE_USER_NAME} from './actionTypes';
const initialState={
  username:''
}

export default (state=initialState,actions)=>{
  const {type,payload}=actions;
  switch(type){
    case CHANGE_USER_NAME:
      return {...state,username:payload};
      break;
    default:
      return state;
  }
}