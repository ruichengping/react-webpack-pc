import Loadable from 'react-loadable';
import createHistory from 'history/createBrowserHistory';
import BasicLayout from '@/layouts/BasicLayout';
import NavTwoLayout from '@/layouts/NavTwoLayout';
import Loading from '@/components/Loading';
import NotFound from '@/pages/Exception/404';


const Home = Loadable({loader: () => import('@/pages/Home'),loading: Loading});
const Teachers = Loadable({loader: () => import('@/pages/Teachers'),loading: Loading});

export const history = createHistory();

export const routes = [
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