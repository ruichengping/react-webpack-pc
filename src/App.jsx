import React from 'react';
import {BrowserRouter,HashRouter}from 'react-router-dom';
import { Switch, Route ,Redirect} from 'react-router';
import PageOne from '@/views/PageOne';
import PageTwo from '@/views/PageTwo';
import NotFound from './views/404';
const Router = BrowserRouter;

class App extends React.PureComponent{
  render(){
    return (
      <Router>
        <Switch>
          <Redirect exact from="/" to="/navone"/>
          {/* 导航栏1 */}
          <Redirect exact from="/navone" to="/navone/pageone"/>
          <Route exact path="/navone/pageone" component={PageOne}/>
          {/* 导航栏2 */}
          <Redirect exact from="/navtwo" to="/navtwo/pagetwo"/>
          <Route exact path="/navtwo/pagetwo" component={PageTwo}/>
          <Route component={NotFound}/>
        </Switch>
      </Router>
    )
  }
}
export default App;