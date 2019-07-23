import React, { ReactElement,ComponentClass,ComponentType,LazyExoticComponent,Suspense} from 'react';
import {Router} from 'react-router-dom';
import {Switch, Route ,Redirect} from 'react-router';
import {history,routes} from '@/router';
import Loading from '@/components/Loading';

interface RouteItem {
  path:string,
  redirect?:string,
  children?:RouteItem[],
  layout?:ComponentClass,
  component?:ComponentType | LazyExoticComponent<ComponentType>
}

function getRouterByRoutes(routes:RouteItem[]){
  const renderedRoutesList:ReactElement[] = [];
  const renderRoutes = (routes:RouteItem[],parentPath:string)=>{
    Array.isArray(routes)&&routes.forEach((route)=>{
      const {path,redirect,children,layout,component} = route;
      if(redirect){
        renderedRoutesList.push(<Redirect key={`${parentPath}${path}`} exact from={path} to={`${parentPath}${redirect}`}/>)
      }
      if(component){
        renderedRoutesList.push(
          layout?<Route
            key={`${parentPath}${path}`}
            exact path={`${parentPath}${path}`}
            render={(props:any)=>React.createElement(layout,props,React.createElement(component,props))} />:
          <Route
              key={`${parentPath}${path}`}
              exact
              path={`${parentPath}${path}`}
              component={component}/>)
      }
      if(Array.isArray(children)&&children.length>0){
        renderRoutes(children,path)
      }
    });
  }
  renderRoutes(routes,'')
  return renderedRoutesList;
}
class App extends React.PureComponent{
  render(){
    return (
      <Router history={history}>
        <Suspense fallback={<Loading/>}>
          <Switch>
            {getRouterByRoutes(routes)}
          </Switch>
        </Suspense>
      </Router>
    )
  }
}
export default App;