export const constantRouterMap = [
  {
    path: '/',
    name: 'index',
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/Jc/Jc/index'),
    // component: ()=>import(/* webpackChunkName: "index" */'@/Pages/Jc/Fc/index'),
    // component: ()=>import(/* webpackChunkName: "index" */'@/Pages/Jc/JcQuery/index'),
    // component: ()=>import(/* webpackChunkName: "index" */'@/Pages/Jc/Zf/index'),
    meta: {keepAlive:true},
  },

  {
    path: '/jc',
    name: 'jiancha',
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/Jc/Jc/index'),
    meta: {},
    // redirect: '/index.html',
  },
  {
    path: '/fc',
    name: 'fucha',
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/Jc/Fc/index'),
    meta: {},
    // redirect: '/index.html',
  },
  {
    path: '/Jcquery',
    name: 'jianchachaxun',
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/Jc/JcQuery/index'),
    meta: {},
    // redirect: '/index.html',
  },
  {
    path: '/zf',
    name: 'zhifa',
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/Jc/Zf/index'),
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