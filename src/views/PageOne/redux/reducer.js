import * as actionType from './actionTypes';
const initialState={
  userName:'芮程平'
}

export default (state=initialState,actions)=>{
  const {type,payload}=actions;
  switch(type){
    case actionType.CHANGE_LANGUAGE:
      return Object.assign({},initialState,{language:payload});
      break;
    default:
      return state;
  }
}