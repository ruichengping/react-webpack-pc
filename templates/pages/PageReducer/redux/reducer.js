import actionTypes from './actionTypes'
const initialState = {
  data: [],
  pageNo: 1,
  total: 0,
  isLoading:false
};
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.CHANGE_DATA:
      return Object.assign({}, state, payload, {
        isLoading:false
      });
    case actionTypes.CHANGE_LOADING_STATUS:
      return Object.assign({}, state, {
        isLoading: payload,
      });
    default:
      return state;
  }
};
