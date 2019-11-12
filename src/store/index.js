import {createStore,combineReducers,applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {API} from '@/api';
import global from './reducer';
import author from '@/pages/Home/redux/reducer';
const middlewares = [thunk.withExtraArgument({API})]
const rootReducer = combineReducers({
  global,
  author
})

export default (initialState) => {
  return createStore(
    rootReducer,
    initialState,
    process.env.NODE_ENV==='development'?composeWithDevTools(applyMiddleware(...middlewares)):applyMiddleware(...middlewares))
};