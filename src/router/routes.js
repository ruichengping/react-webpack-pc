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