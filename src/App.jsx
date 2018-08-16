import React from 'react';
import {BrowserRouter}from 'react-router-dom';
import { Switch, Route ,Redirect} from 'react-router';
import PageOne from '@/pages/PageOne';
import PageTwo from '@/pages/PageTwo';
import NavTwoLayout from '@/layouts/NavTwoLayout';
import NotFound from '@/pages/404';
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
          <Route path="/navtwo" render={({match})=><NavTwoLayout>
              <Switch>
                <Redirect exact from={`${match.path}`} to={`${match.path}/pagetwo`}/>
                <Route exact path={`${match.path}/pagetwo`} component={PageTwo}/>
              </Switch>
          </NavTwoLayout>}/>
          {/* 404 */}
          <Route component={NotFound}/>
        </Switch>
      </Router>
    )
  }
}
export default App;