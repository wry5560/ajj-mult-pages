export const constantRouterMap = [
  {
    path: '/',
    name: 'index',
    // component: ()=>import(/* webpackChunkName: "index" */'@/Pages/KuaiBao/Index'),
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/Qiye/Xqqygl/index'),
    meta: {keepAlive:true},
  },

  {
    path: '*', redirect: '/index', hidden: true
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },
]