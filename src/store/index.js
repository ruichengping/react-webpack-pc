import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {API} from '@/api';
import user from './reducer';
import author from '@/pages/Home/redux/reducer';

const rootReducer = combineReducers({
  user,
  author
})

export default (initialState) => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk.withExtraArgument({
      API
    })))
};