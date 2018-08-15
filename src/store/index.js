import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import user from './reducer';
const store=createStore(
  combineReducers({
    user
  }),
  applyMiddleware(thunk)
)
export default store;