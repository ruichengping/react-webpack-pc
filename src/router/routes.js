import React from 'react';
import loadable from '@loadable/component';
import BasicLayout from '@/layouts/BasicLayout';
import NavTwoLayout from '@/layouts/NavTwoLayout';
import NotFound from '@/pages/Exception/404';
import Loading from '@/components/Loading';



const Home = loadable (() => import('@/pages/Home'),{fallback:Loading});
// import Home from '@/pages/Home';
const Teachers = loadable (() => import('@/pages/Teachers'),{fallback:Loading});
// import Teachers from '@/pages/Teachers';


export default [
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
      component:Home
    }]
  },
  {
    path:'/navtwo',
    redirect:'/navtwo/teachers',
    children:[{
      path:'/teachers',
      layout:NavTwoLayout,
      component:Teachers
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