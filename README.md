# react-webpack-pc
这是一款基于webpack构建的react项目模板,可以使用我自己写的脚手架工具[asuna-cli](https://github.com/ruichengping/asuna-cli)进行构建，所以不能直接git clone下来直接运行，需要做一下修改。

![package.json](https://user-gold-cdn.xitu.io/2018/8/17/16546fe2082983a3?w=1834&h=594&f=jpeg&s=158191)

package.json中上图红色边框里的部分需要修改一下，不然运行会报 <Invalid name: "{{name}}>"的错误。

## 项目结构
![项目结构](https://user-gold-cdn.xitu.io/2018/8/17/16546fd9debd8473?w=546&h=654&f=jpeg&s=44641)

> 以上是示例项目的目录结构，下面我们将逐一进行分析**
## build
这个文件主要放了一些与webpack打包的相关文件。
- **build.js** ---- webpack打包脚本，用于构建生产环境的包
- **check-versions.js** ---- 主要检测当前打包环境的node以及npm的版本是否符合要求
- **utils.js** ---- webpack打包所需要的一些工具库
- **webpack.base.conf.js** ---- webpack的一些基础配置，不同环境的webpack配置都是基于此
- **webpack.dev.conf.js** ---- 开发环境的webpack配置
- **webpack.prod.conf.js** ---- 生产环境的webpack配置

这个项目的webpack配置我是在vue-cli的项目上进行修改的，可以用于React的项目构建。目前只要开发环境和生产环境这两个环境，可能一些公司有多个环境，每个环境下webpack的配置还不同，此时可以根据不同环境建一个文件名格式为“**webpack.<环境名>.conf.js**”的webpack配置使用。**webpack.base.conf.js**里面有一些基本配置比如**rules**、**input**、**output**的等配置，一般来说每个环境下这些大致都是相同，一些不同之处可以用**webpack-merge**插件进行合并。一般来说大多数项目来说开发环境和生产环境两个webpack配置足够了。
## config
这里存放着不同环境webpack所需要的配置参数。
- **dev.env.js** ---- 向外暴露开发环境下的环境变量**NODE_ENV**
- **index.js** ---- 存放不同环境的配置参数
- **prod.env.js** ---- 向外暴露生产环境下的环境变量**NODE_ENV**

如果你需要再加一个环境的话，可以建一个文件名为“<环境名>.env.js”并向外暴露环境变量**NODE_ENV**，然后在index.js中导入，进行相关参数设置。

## mock
这里是用来做接口的mock的，可能很多公司都不太用，我在工作也很少去mock。这里介绍一下自己的接口mock思路，这里我选择**mockjs**加上**json-server**的组合。二者具体的使用，大家可以查看其官方文档。
- **api** ---- 存放不同api所对应的数据
- **index.js** ---- json-server的主文件
- **routes.json** ---- 路由的映射

package.json我配置一个script，如下：
```
 "mock": "json-server mock/index.js  --port 3000 --routes mock/routes.json"
```
控制台执行“npm run mock“即可。

## src
### api 
```
import _ from 'lodash'
import http from '../utils/http'

const API_URL={
  fetchUserInfo:{
    method:'GET',
    url:'/api/user'
  },
  fetchAuthorInfo:{
    method:'GET',
    url:'/api/author'
  }
}

const API = {}
_.keys(API_URL).forEach(key=>{
  const item = API_URL[key]
  switch(item.method){
    case 'GET':
      API[key]=function(params){
        return http.get(item.url,params)
      }
      break;
    case 'POST':
      API[key]=function(params){
        return http.post(item.url,params)
      }
      break;
    case 'DELETE':
      API[key]=function(params){
        return http.delete(item.url,params)
      }
      break;
    default:
      API[key]=function(params){
        return http.get(item.url,params)
      }
  } 
})

export default API
```
这里我们用来放置api的接口地址，为了后续的接口维护，我们在使用的过程中不会直接写死接口地址，而是将接口请求封装成一个个方法。通过对接口的统一维护，我们就可以做到在执行修改接口地址、修改请求方法、新增接口等等操作时，就不用在整个项目里到处找了，只要维护好API_URL这个对象即可。使用方法如下：
```
import API from '@/api'
//params为请求参数
API.fetchUserInfo(params).then(response=>{
    //response为返回值
    ...
})
```
### assets
这里我们会放项目的所需要图片资源，这些图片资源一般来说都是做图标的，都比较小。webpack会将其转化成**BASE64**去使用。如果你不想以这种方式使用，可以在static目录下存放图片资源。
### components
这里存放整个项目所用到的公共组件。定一个组件，这里要求是新建一个文件夹，文件夹名为组件名，另外在这个文件夹下新建index.jsx和style.scss文件。例如做一个HelloWorld组件，则应该是如下结构。

**HelloWorld**
- index.jsx
- style.scss //存放组件的样式

**index.js**

```
import React from 'react';
import './style.scss';
class HelloWorld extends React.PureComponent{
  render(){
    return (
      <h4 className="u-text">Hello World</h4>
    )
  }
}
export default HelloWorld;
```
**style.scss**
```
.u-text{
  color: red;
}
```
### layouts
这里存放着布局文件。关于这个布局文件我是这么去定义它的，我在开发过程中有一些页面他们的某一部分都是相同，早之前可能大家可能会在一个React组件加<Switch>和<Route>去实现这个功能，可以这么干，没毛病。但是这个有一个不好点就是你的路由没法做统一的管理，分散在各个组件中，给后续的维护带来很多问题。为了解决这个，我选择利用props.children结合标签嵌套的方式去完成。举个例子：

先定一个layout（本职也是React组件）BasicLayout.jsx
```
import React from 'react';
class BasicLayout extends React.PureComponent{
    render(){
        const {children} = this.props;
        return (
            <div>
                <div>隔壁老王今日行程：</div>
                <div>{children}</div>
            </div>
        )
    }
}
export default BasicLayout;
```
定义完之后我们可以这么使用：
```
import React from 'react';
import BasicLayout from '<BasicLayout的路径>'
class Work extends React.PureComponent{
    render(){
        return (
            <BasicLayout>
                <div>今天隔壁老王比较累，不工作！</div>
            <BasicLayout>
        )
    }
}
export default BasicLayout;
```
最后在的dom结构如下：
```
<div>
    <div>隔壁老王今日行程：</div>
    <div>
        <div>今天隔壁老王比较累，不工作！</div>
    </div> 
</div>
```
这样我们可以基于BasicLayout做出很多个像下面的页面。
```
<div>
    <div>隔壁老王今日行程：</div>
    <div>
       //<不同的内容>
    </div> 
</div>
```
使用这种方法就可以将我们得所有路由写在一起了，可能有人觉得每次都要写引入BasicLayout很麻烦，有没有其他更好用的办法，在讲App.jsx的时候会说到这里就先跳过。
### pages
这里的存放的都是页面级组件，跟react-router对应的路由需要一一对应。每个页面都是一个文件夹，文件名就是页面名称，每个页面都要包含如下几个文件：
- components ---- 存放当前页独有的一些组件
- redux ---- 存放三个文件**actions.js**、**actionTypes.js**、**reducer.js**,这几个文件应该只与这个页面相关
- index.jsx ---- 页面的入口文件
- style.scss ---- 页面所需要的样式
具体代码可以自行git clone 项目查看，这里就不贴出来了。
### scss
这里存放共有的scss文件，比较一些常用的功能类、@mixin、@function等等。
### store
这里有四个文件：
- **actions.js**
- **actionTypes.js**
- **reducer.js**
- **index.js**

我们知道每个页面都有自己的**actions.js**、**actionTypes.js**、**reducer.js**，但是这里是全局的，另外index.js会向外暴露store，然后再main.js中引入使用。
```
import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import API from '@/api';
import user from './reducer';
import author from '@/pages/PageOne/redux/reducer'
const store=createStore(
  combineReducers({
    user,
    author
  }),
  applyMiddleware(thunk.withExtraArgument({
    API
  }))
)
export default store;
```
这里有一个小细节，redux-thunk是可以携带一些额外的对象或者方法的，这里，我携带API对象。当我们需要在actions.js里面使用API对象时，就不需要再import导入进来。下面我们做个对比：

**修改前**
```
import * as actionTypes from './actionTypes';
import API from '../api';

export const fecthUserName=(params)=> async (dispatch,getState)=>{
  const response =await API.fetchUserInfo(params);
  const {success,data} = response;
  if(success){
    dispatch({
      type:actionTypes.CHANGE_USER_NAME,
      payload:data
    });
  }
}
```
**修改后**
```
import * as actionTypes from './actionTypes';

export const fecthUserName=(params)=> async (dispatch,getState,{API})=>{
  const response =await API.fetchUserInfo(params);
  const {success,data} = response;
  if(success){
    dispatch({
      type:actionTypes.CHANGE_USER_NAME,
      payload:data
    });
  }
}
```
### utils
这里会存放一些自己的封装的js工具文件，比如我在项目基于axios封装了一个http.js,简化了axios的操作。
### App.jsx
这里主要用来定义一下路由，先放代码：
```
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
```
这里我们需要重点讲的是之间在layouts中我们跳过的内容，能不能不每次都用layout组件去包裹代码，答案是可以的。这里我选择<Route>中的render属性，另外我用的是react-router的4.x版本，已经移除嵌套路由了，这边如何做嵌套路由可以参考我的代码，很简单就不细说了，不过match.path千万别漏了哦！
### main.js
webpack入口文件，主要一些全局js或者scss的导入，并执行react-dom下的render方法，代码如下：
```
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from '@/store';
import App from '@/App';
import '@/scss/reset.scss';
import '@/scss/base.scss';


render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
)

```
## static
这是一个静态资源目录，一般存放一些第三方工具库。这个目录主要两方面考虑：
- 有些第三方工具库没有npm包，我们无法用npm install 或者 yarn add方式添加
- 一些比较大的第三方工具库会影响我们的打包速度，可以把它拿出来通过script的方式引入

其实第三方工具库最好的方式是CDN，但是有些公司就是没有，无奈只能如此。你加入的第三工具库都可在当前服务器下”**/static/***“路径下获取到。
## 其他文件 
- .babelrc ---- babel转换的配置文件
- .gitignore ---- git操作所需要忽略的文件
- .postcssrc.js ---- postcss的配置文件
- index.html ---- 模板index.html,webpack会根据此生成新的index.html,配合**html-webpack-plugin**使用
- package.json ---- 家喻户晓的东西
- README.md ---- 项目说明
- theme.js ----  ant-design的主题色配置文件，具体使用可以参考ant-design。
- yarn.lock ---- 锁定包的版本
## 结语
这个只是个人搭建企业级React项目的一些总结。当然存在不足的地方，后面在工作过程中如果有一些好的想法也会在这上面进行更新。欢迎大家Star关注！如果你也有好的想法欢迎留言交流，希望这篇拙文能给大家一些启发。
