import { ComponentClass, ComponentType } from 'react';
import Loadable from 'react-loadable';
import createHistory from 'history/createBrowserHistory';
import BasicLayout from '@/layouts/BasicLayout';
import NavTwoLayout from '@/layouts/NavTwoLayout';
import Loading from '@/components/Loading';
import NotFound from '@/pages/Exception/404';
const Home = Loadable({loader: () => import('@/pages/Home'),loading: Loading});
const Teachers = Loadable({loader: () => import('@/pages/Teachers'),loading: Loading});

export const history = createHistory();

interface RouteItem{
  path:string,
  redirect?:string,
  layout?:ComponentClass
  children?:RouteItem[]
  component?:ComponentType
}
export const routes:RouteItem[] = [
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