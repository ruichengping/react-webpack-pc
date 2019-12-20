import {createStore,combineReducers,applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import global from './reducer';
import {API} from '@/api';
import {history} from '@/router';
import * as constants from '@/constants';
import author from '@/pages/Home/redux/reducer';
const middlewares = [thunk.withExtraArgument({API,history,constants})]
const rootReducer = combineReducers({
  global,
  author
})

const store=createStore(
  rootReducer,
  process.env.NODE_ENV==='development'?composeWithDevTools(applyMiddleware(...middlewares)):applyMiddleware(...middlewares)
)
export default store;