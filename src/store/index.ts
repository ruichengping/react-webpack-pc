import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {API} from '@/api';
import user from './reducer';
import author from '@/pages/Home/redux/reducer';

const rootReducer = combineReducers({
  user,
  author
})

const store=createStore(
  rootReducer,
  applyMiddleware(thunk.withExtraArgument({
    API
  }))
)
export default store;