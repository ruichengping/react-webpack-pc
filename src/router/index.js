import React,{Suspense} from 'react';
import {StaticRouter,Router,Switch,Route,Redirect} from 'react-router';
import {createBrowserHistory} from 'history';
import Loading from '@/components/Loading';
import getRoutes from './routes';
function getRouterByRoutes(routes){
  const renderedRoutesList = [];
  const renderRoutes = (routes,parentPath)=>{
    Array.isArray(routes)&&routes.forEach((route)=>{
      const {path,redirect,children,layout,exact=true,component,render} = route;
      if(redirect){
        renderedRoutesList.push(<Redirect key={`${parentPath}${path}`} exact={exact} from={path} to={`${parentPath}${redirect}`}/>)
      }
      if(component){
        renderedRoutesList.push(
          <Route
            key={`${parentPath}${path}`}
            exact={exact}
            path={`${parentPath}${path}`}
            render={(props)=>layout?React.createElement(layout,props,React.createElement(component,props)):React.createElement(component,props)} />
        )
      }
      if(render){
        renderedRoutesList.push(<Route
          key={`${parentPath}${path}`}
          exact={exact}
          path={`${parentPath}${path}`}
          render={render}/>)
      }
      if(Array.isArray(children)&&children.length>0){
        renderRoutes(children,path)
      }
    });
  }
  renderRoutes(routes,'')
  return renderedRoutesList;
}
export const getRouter = (type)=>(params)=>{
  const routerContent = <Switch>{getRouterByRoutes(getRoutes(type))}</Switch> 
  if(type==='client'){
    const history = createBrowserHistory();
    return <Router history={history}>{routerContent}</Router>
  }else if(type==='server'){
    return <StaticRouter {...params}>{routerContent}</StaticRouter>
  }
}
export const matchRoutesConfig = (pathname)=>{
  const reg = /\/[a-zA-Z0-9]+(-[a-zA-Z0-9]+)?/g;
  const paths = pathname.match(reg);
  const matchedRoutes = [];
  function matchRoute(toBeMatchedRoutes){
    const matchedPath = paths.shift();
    for(let i=0;i<toBeMatchedRoutes.length;i++){
      const current = toBeMatchedRoutes[i];
      if(Array.isArray(current.children)){
        matchRoute(current.children);
      }
      if(current.path===matchedPath){
        matchedRoutes.push(current);
        break;
      }
    }
  }
  if(Array.isArray(paths)){
    matchRoute(getRoutes('server'));
  }
  return matchedRoutes;
}