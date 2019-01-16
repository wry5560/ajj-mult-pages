import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/components/layouts'

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BlankLayout,
    meta: {},
    redirect: '/index.html',
    children:[
      {
        path:'/index.html',
        name:'home',
        component:()=>import(/* webpackChunkName: "index" */'@/views/test/TestTable')
      },
    ]
  },
  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import(/* webpackChunkName: "test" */'@/views/Home')
      }
    ]
  },
  {
    path: '*', redirect: '/index', hidden: true
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/Pages/PaiBan/Index')
  },
]
