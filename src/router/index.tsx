import React from 'react';
import {createBrowserHistory} from 'history';
import {matchPath} from 'react-router';
import {Route,Redirect} from 'react-router-dom';
import {isArray,isEmpty} from 'lodash';
import {RouteItem} from './routes';

export const history = createBrowserHistory();
export {default as routes} from './routes';
export const renderRoutes = (routes:RouteItem[])=>{
  const renderedRoutesList:any = [];
  const loopRenderRoute = (routes:RouteItem[],parentPath:string)=>{
    isArray(routes)&&routes.forEach((route:RouteItem)=>{
      const {path,redirect,children,layout,component} = route;
      const routePath = `${parentPath}${path}`;
      if(redirect){
        renderedRoutesList.push(<Redirect key={routePath} exact from={routePath} to={redirect}/>)
      }
      if(component){
        renderedRoutesList.push(
          layout?<Route
            key={routePath}
            exact 
            path={routePath}
            render={(props:any)=>React.createElement(layout,props,React.createElement(component,props))} />:
          <Route
              key={routePath}
              exact
              path={routePath}
              component={component}/>)
      }
      if(Array.isArray(children)&&children.length>0){
        loopRenderRoute(children,routePath)
      }
    });
  }
  loopRenderRoute(routes,'')
  return renderedRoutesList;
}

export const matchRoute = (path:string,routes:RouteItem[])=>{
  const matchRoutes = [];
  let matchedRoute = null;
  let isOk = false;
  const loopMatch = (routes:any,parent:any={})=>{
    if(isArray(routes)){
      for(let i=0;i<routes.length;i++){
        if(isOk) break;
        const current = {...routes[i],parent};
        if(matchPath(path,{
          path:`${parent.path}${current.path}`,
          exact:true,
          strict:false
        })){
          isOk = true;
          matchedRoute=current;
        }else{
          loopMatch(current.children,current);
        }
      }
    }
  }
  loopMatch(routes);
  let nextParent:RouteItem = matchedRoute;
  while(!isEmpty(nextParent)){
    const {parent,...otherConfig} = nextParent;
    matchRoutes.push(otherConfig);
    nextParent = parent;
  }
  return [
    matchedRoute,
    matchRoutes
  ];
}