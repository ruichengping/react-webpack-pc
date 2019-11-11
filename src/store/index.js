import {createStore,combineReducers,applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import global from './reducer';
import {API} from '@/api';
import {history} from '@/router';
import author from '@/pages/Home/redux/reducer';
const middlewares = [thunk.withExtraArgument({API,history})]
const rootReducer = combineReducers({
  global,
  author
})

const store=createStore(
  rootReducer,
  process.env.NODE_ENV==='development'?composeWithDevTools(applyMiddleware(...middlewares)):applyMiddleware(...middlewares)
)
export default store;