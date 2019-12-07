import React,{Suspense,useEffect} from 'react';
import {bindActionCreators} from 'redux';
import {ConfigProvider} from 'antd';
import {useSelector,useDispatch} from 'react-redux';
import {Router,Switch} from 'react-router-dom';
import intl from 'react-intl-universal';
import {history,routes,renderRoutes} from '@/router';
import * as actions from '@/store/actions';
import {languages} from '@/constants';
import Loading from '@/components/Loading';
import ErrorBoundary from '@/components/ErrorBoundary';

export default ()=>{
  const dispatch = useDispatch();
  const {fecthUserInfo,changeSystemLanguage} = bindActionCreators(actions,dispatch);
  const language = useSelector((state)=>state.global.language);
  const {antdLocale} = languages.find((lang)=>lang.value===language); 
  useEffect(()=>{
    let currentLocale = intl.determineLocale({
      urlLocaleKey: 'lang',
      cookieLocaleKey: 'lang',
      localStorageLocaleKey:'lang'
    })||navigator.language;
    changeSystemLanguage(currentLocale.toLowerCase());
    fecthUserInfo();
  },[])
  return (
    <ConfigProvider locale={antdLocale}>
      <Router history={history}>
        <Suspense fallback={<Loading/>}>
          <ErrorBoundary>
            <Switch>
              {renderRoutes(routes)}
            </Switch>
          </ErrorBoundary>
        </Suspense>
      </Router>
    </ConfigProvider>
  )
};
