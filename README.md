# react-webpack-pc
这是一款基于webpack构建的react项目模板,可以使用我自己写的脚手架工具[asuna-cli](https://github.com/ruichengping/asuna-cli)进行构建。

# 前言
该项目已分不同方向去维护，每个分支与之对应的方向可在[CONTRIBUTING.md](https://github.com/ruichengping/react-webpack-pc/blob/master/CONTRIBUTING.md)里查看
# 使用
## 安装
```
yarn
```
## 启动
### 开发环境
```
yarn dev

yarn mock //启动mock服务
```
### 生产环境
```
//打包
yarn build


//启动node服务
yarn start
```
# 项目结构
## app
这个文件夹放置node服务相关文件
- index.js 服务启动文件
- render.js react组件渲染函数
- utils.js 工具方法
## build
这个文件主要放了一些与webpack打包的相关文件。
- **check-versions.js** ---- 主要检测当前打包环境的node以及npm的版本是否符合要求
- **utils.js** ---- webpack打包所需要的一些工具库
- **webpack.base.conf.js** ---- webpack的一些基础配置，不同环境的webpack配置都是基于此
- **webpack.client.conf.js** ---- 客户端webpack配置
- **webpack.server.conf.js** ---- 服务端webpack配置

**webpack.base.conf.js**里面有一些基本配置比如**rules**、**input**、**output**的等配置，**webpack.client.conf.js**和**webpack.server.conf.js**是在此基础上**webpack-merge**合并而来。另外**webpack.client.conf.js**和**webpack.server.conf.js**都有做生产环境（production）和开发环境（development）的区分。
## config
这里存放着不同环境webpack所需要的配置参数。
- **default.js** ---- 基础配置
- **development.js** ---- 开发环境配置
- **production.js** ---- 生产环境配置

开发环境的最终配置：**default.js** + **development.js**

生产环境的最终配置：**default.js** + **production.js**

如果有新的环境比如说是测试环境，可以直接在config目录下加一个test.js文件，该文件作为测试环境的配置文件

用法：
```
//开发环境配置获取
process.env.NODE_ENV = 'development'
const config = require('config')


//生产环境配置获取
process.env.NODE_ENV = 'production'
const config = require('config')

//测试环境配置获取
process.env.NODE_ENV = 'test'
const config = require('config')
```

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
## scripts
这里放置一些脚本类文件
- build.js 打包脚本
- dev.js 启动开发环境脚本

## src
### api
**url.js**
```
export default {
  fetchUserInfo:{
    method:'get',
    url:'/api/user'
  },
  fetchAuthorInfo:{
    method:'get',
    url:'/api/author'
  },
  fetchUserList:{
    method:'get',
    url:'/api/userList'
  }
}
```
**index.js**
```
import _ from 'lodash'
import http from '@/utils/http'
import API_URL from './url';

function mapUrlObjToFuncObj(urlObj){
  const API = {};
  _.keys(urlObj).forEach((key)=>{
    const item = urlObj[key]
    API[key]=function(params){
      return http[item.method](item.url,params)
    }
  });
  return API;
}

function mapUrlObjToStrObj(urlObj){
  const Url = {};
  _.keys(urlObj).forEach((key)=>{
    const item = urlObj[key]
    Url[key]=item.url
  });
  return Url;
}

export const API = mapUrlObjToFuncObj(API_URL);
export const URL = mapUrlObjToStrObj(API_URL);
```
这里我们用来放置api的接口地址，为了后续的接口维护，我们在使用的过程中不会直接写死接口地址，而是将接口请求封装成一个个方法。通过对接口的统一维护，我们就可以做到在执行修改接口地址、修改请求方法、新增接口等等操作时，就不用在整个项目里到处找了，只要维护好url.js向外暴露的对象即可。使用方法如下：
```
import {API} from '@/api'
//params为请求参数
API.fetchUserInfo(params).then(response=>{
    //response为返回值
    ...
})
```
### assets
这里我们会放项目的所需要图片资源，这些图片资源一般来说都是做图标的，都比较小。webpack会将其转化成**BASE64**去使用。如果你不想以这种方式使用，可以在static目录下存放图片资源。
### components
这里存放整个项目所用到的公共组件。定一个组件，这里要求是新建一个文件夹，文件夹名为组件名，另外在这个文件夹下新建index.js和style.scss文件。例如做一个HelloWorld组件，则应该是如下结构。

**HelloWorld**
- index.js
- style.scss //存放组件的样式

**index.js**

组件的样式需要用到withStyles进行包裹，具体用法可查看isomorphic-style-loader的文档。
```
import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './style.scss';
class HelloWorld extends React.PureComponent{
  render(){
    return (
      <h4 className={styles.text}>Hello World</h4>
    )
  }
}
export default withStyles(styles)(HelloWorld);
```
**style.scss**
```
.text{
  color: red;
}
```
### layouts
这里存放着布局文件。关于这个布局文件我是这么去定义它的，我在开发过程中有一些页面他们的某一部分都是相同，早之前可能大家可能会在一个React组件加<Switch>和<Route>去实现这个功能，可以这么干，没毛病。但是这个有一个不好点就是你的路由没法做统一的管理，分散在各个组件中，给后续的维护带来很多问题。为了解决这个，我选择利用props.children结合标签嵌套的方式去完成。举个例子：

先定一个layout（本职也是React组件）BasicLayout.js
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
使用这种方法就可以将我们得所有路由写在一起了，可能有人觉得每次都要写引入BasicLayout很麻烦，有没有其他更好用的办法，在讲App.js的时候会说到这里就先跳过。
### pages
这里的存放的都是页面级组件，跟react-router对应的路由需要一一对应。每个页面都是一个文件夹，文件名就是页面名称，每个页面都要包含如下几个文件：
- components ---- 存放当前页独有的一些组件
- redux ---- 存放三个文件**actions.js**、**actionTypes.js**、**reducer.js**,这几个文件应该只与这个页面相关
- index.js ---- 页面的入口文件
- style.scss ---- 页面所需要的样式
具体代码可以自行git clone 项目查看，这里就不贴出来了。
### styles
- scss 这里存放共有的scss文件，比较一些常用的功能类、@mixin、@function等等。
- css 这里存放共有的css文件。
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
const rootReducer = combineReducers({
    user,
    author
  });
const store=createStore(
  rootReducer,
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

### router/routes.js
这里以配置化的方式去注册路由，向外暴露一个获取路由的方法，该方法只接受一个参数type（环境类型 client、server），可以通过该方法获取不同环境下的路由配置。
```
import React from 'react';
import loadable from '@loadable/component';
import BasicLayout from '@/layouts/BasicLayout';
import NavTwoLayout from '@/layouts/NavTwoLayout';
import NotFound from '@/pages/Exception/404';
import Loading from '@/components/Loading';
import Home from '@/pages/Home';
import Teachers from '@/pages/Teachers';

const  AsyncHome =  loadable (() => import('@/pages/Home'),{fallback:<Loading/>});
const  AsyncTeachers = loadable (() => import('@/pages/Teachers'),{fallback:<Loading/>});

export default (type)=>{
  return [
    {
      path:'/',
      redirect:'/navone/home'
    },
    {
      path:'/navone',
      redirect:'/navone/home',
      children:[{
        path:'/home',
        layout:BasicLayout,
        component:type==='client'?AsyncHome:Home,
        loadData:Home.loadData
      }]
    },
    {
      path:'/navtwo',
      redirect:'/navtwo/teachers',
      children:[{
        path:'/teachers',
        layout:NavTwoLayout,
        component:type==='client'?AsyncTeachers:Teachers
      }]
    },
    {
      path:'*',
      exact:false,
      render:({staticContext})=>{
        if (staticContext) staticContext.NOT_FOUND = true;
        return <NotFound/>
      }
    }
  ]
}
```
### router/routes.js
- getRouterByRoutes 根据配置生产路由
- getRouter 获取不同环境下的Router
- matchRoutesConfig 根据路径匹配路由配置项
```
import React from 'react';
import {StaticRouter,Router,Switch,Route,Redirect} from 'react-router';
import {createBrowserHistory} from 'history';
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
```
### App.js
这里根据路由配置用来渲染路由标签，先放代码：
这里我们需要重点讲的是之间在layouts中我们跳过的内容，能不能不每次都用layout组件去包裹代码，答案是可以的。这里我选择<Route>中的render属性。
### main.js
webpack入口文件，主要一些全局js或者scss的导入，并执行react-dom下的hydrate方法，代码如下：
```
import '@babel/polyfill';
import React from 'react';
import {hydrate,render} from 'react-dom';
import App from './App';

import '@/styles/css/reset.css';
import '@/styles/css/base.css';
const renderMethod = module.hot?render:hydrate;
renderMethod(
  <App/>,
  document.getElementById('app')
)

```
**app.js**
```
const store = getStore(window.INITIAL_STATE);
class App extends React.PureComponent{
  render(){
    return  <StyleContext.Provider value={{ insertCss }}>
      <Provider store={store}>{getRouter('client')()}</Provider>
    </StyleContext.Provider>
  }
}
export default App;
```
## static
这是一个静态资源目录，一般存放一些第三方工具库。这个目录主要两方面考虑：
- 有些第三方工具库没有npm包，我们无法用npm install 或者 yarn add方式添加
- 一些比较大的第三方工具库会影响我们的打包速度，可以把它拿出来通过script的方式引入

其实第三方工具库最好的方式是CDN，但是有些公司就是没有，无奈只能如此。你加入的第三工具库都可在当前服务器下”**/static/***“路径下获取到。
## templates

这里存放着页面和组件级别构建所需要的模板文件，页面级别构建提供了两种模板PageReducer（集成了reducer）和PageSample（不集成reducer），而组件只提供了一种模板ComSample。页面和组件级别的构建是需要配合asuna-cli才能构建，目前项目已经集成了asuna-cli。package.json写了两个script：npm run newPage（页面构建）和npm run newComponent（组件构建）。开发可根据实际需要选择构建，asuna-cli具体使用可以去[asuna-cli](https://github.com/ruichengping/asuna-cli)查看。

## 其他文件
- babelConfig.js ---- 获取babel配置项
- .gitignore ---- git操作所需要忽略的文件
- .postcssrc.js ---- postcss的配置文件
- index.hbs ---- 配合**html-webpack-plugin**生成供node环境下handlebars模版引擎使用的.hbs文件
- package.json ---- 家喻户晓的东西
- nodemon.json ---- nodemon配置文件
- README.md ---- 项目说明
- theme.js ----  ant-design的主题色配置文件，具体使用可以参考ant-design
- asuna.config.js ---- asuna-cli的配置文件
- yarn.lock ---- 锁定包的版本
# 结语
这个项目是一个服务端渲染的项目，它比客户端渲染的项目复杂许多，如果没有特别需要，不建议使用服务端渲染。我个人选择服务端渲染时该项目必须满足以下三个条件（仅供参考）：
- 比较在意白屏时间
- 接口的等待时间较短
- 页面数量很多，而且未来有很大的增长空间


