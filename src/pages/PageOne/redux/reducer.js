import * as actionType from './actionTypes';
const initialState={
  info:{}
}

export default (state=initialState,actions)=>{
  const {type,payload}=actions;
  switch(type){
    case actionType.CHANGE_AUTHOR_INFO:
      return Object.assign({},initialState,{info:payload});
      break;
    default:
      return state;
  }
}