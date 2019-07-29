import React,{Suspense} from 'react';
import {StaticRouter,Router,Switch,Route,Redirect} from 'react-router';
import {createBrowserHistory} from 'history';
import Loading from '@/components/Loading';
import routes from './routes';
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
          layout?<Route
            key={`${parentPath}${path}`}
            exact={exact}
            path={`${parentPath}${path}`}
            render={(props)=>React.createElement(layout,props,React.createElement(component,props))} />:
          <Route
              key={`${parentPath}${path}`}
              exact={exact}
              path={`${parentPath}${path}`}
              component={component}/>)
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
export default (type)=>(params)=>{
  if(type==='client'){
    const history = createBrowserHistory();
    return <Router history={history}>
    <Switch>
      {getRouterByRoutes(routes)}
    </Switch>
  </Router>
  }else if(type==='server'){
    return <StaticRouter {...params}>
       <Switch>
        {getRouterByRoutes(routes)}
      </Switch>
    </StaticRouter>
  }
}