export const constantRouterMap = [
  {
    path: '/',
    name: 'index',
    // component: ()=>import(/* webpackChunkName: "index" */'@/Pages/PaiBan/Index'),
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/PaiBan/IndexRole'),
    meta: {keepAlive:true},
  },
  {
    path: '/role',
    name: 'role',
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/PaiBan/IndexRole'),
  },
  {
    path: '*', redirect: '/index', hidden: true
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },
]