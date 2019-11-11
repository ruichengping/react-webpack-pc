import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {API} from '@/api';
import global from './reducer';
import author from '@/pages/Home/redux/reducer';

const rootReducer = combineReducers({
  global,
  author
})

const store=createStore(
  rootReducer,
  applyMiddleware(thunk.withExtraArgument({
    API
  }))
)
export default store;