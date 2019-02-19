export const constantRouterMap = [
  {
    path: '/',
    name: 'index',
    // component: ()=>import(/* webpackChunkName: "index" */'@/Pages/KuaiBao/Index'),
    // component: ()=>import(/* webpackChunkName: "index" */'@/Pages/Jxgl/Jcxgl/index'),
    // component: ()=>import(/* webpackChunkName: "index" */'@/Pages/Jxgl/Jcbgl/index'),
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/Jxgl/Zxjcplan/index'),
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
    path: '/zxjcplan',
    name: 'zxjcplan',
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/Jxgl/Zxjcplan/index'),
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