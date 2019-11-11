import React, {Suspense,useEffect} from 'react';
import {Router,Switch} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {useDispatch} from 'react-redux';
import {history,routes,renderRoutes} from '@/router';
import * as actions from '@/store/actions';
import Loading from '@/components/Loading';
import ErrorBoundary from '@/components/ErrorBoundary';

export default ()=>{
  const dispatch = useDispatch();
  const {fecthUserInfo} = bindActionCreators(actions,dispatch)
  useEffect(()=>{
    fecthUserInfo();
  },[])
  return (
    <Router history={history}>
      <Suspense fallback={<Loading/>}>
        <ErrorBoundary>
          <Switch>
            {renderRoutes(routes)}
          </Switch>
        </ErrorBoundary>
      </Suspense>
    </Router>
  )
}