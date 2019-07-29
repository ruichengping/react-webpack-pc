import React from 'react';
import { lazy } from '@loadable/component';
import BasicLayout from '@/layouts/BasicLayout';
import NavTwoLayout from '@/layouts/NavTwoLayout';
import NotFound from '@/pages/Exception/404';


// const Home = lazy(() => import('@/pages/Home'));
import Home from '@/pages/Home';
// const Teachers = lazy(() => import('@/pages/Teachers'));
import Teachers from '@/pages/Teachers';


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