import * as actionTypes from './actionTypes';
const initialState={
  userName:'芮程平',
  language:'zh'
}

export default (state=initialState,actions)=>{
  const {type,payload}=actions;
  switch(type){
    case actionTypes.CHANGE_LANGUAGE:
      return Object.assign({},initialState,{language:payload});
      break;
    default:
      return state;
  }
}