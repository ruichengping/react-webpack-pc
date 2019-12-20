import {lazy} from 'react';
import BasicLayout from '@/layouts/BasicLayout';
import NavTwoLayout from '@/layouts/NavTwoLayout';
import NotFound from '@/pages/Exception/404';

const Home = lazy(() => import('@/pages/Home'));
const Teachers = lazy(() => import('@/pages/Teachers'));
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
    component:NotFound
  }
]