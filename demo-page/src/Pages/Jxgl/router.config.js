export const constantRouterMap = [
  {
    path: '/',
    name: 'index',
    // component: ()=>import(/* webpackChunkName: "index" */'@/Pages/KuaiBao/Index'),
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/Jxgl/Jcxgl/index'),
    meta: {keepAlive:true},
  },

  {
    path: '/jcbgl',
    name: 'jcbgl',
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/Jxgl/Jcbgl/index'),
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