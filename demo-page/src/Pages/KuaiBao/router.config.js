export const constantRouterMap = [
  {
    path: '/',
    name: 'index',
    // component: ()=>import(/* webpackChunkName: "index" */'@/Pages/KuaiBao/Index'),
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/KuaiBao/IndexShenhe'),
    meta: {keepAlive:true},
  },
  {
    path: '/shenhe',
    name: '/shenhe',
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/KuaiBao/IndexShenhe'),
    // meta: {keepAlive:true},
  },

  {
    path: '/sgDetail',
    name: 'sgDetail',
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/KuaiBao/comps/sgDetail'),
    meta: {},
    // redirect: '/index.html',
  },
  {
    path: '*', redirect: '/index', hidden: true
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },
]