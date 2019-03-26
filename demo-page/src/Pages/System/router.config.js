export const constantRouterMap = [
  {
    path: '/',
    name: 'index',
    // component: ()=>import(/* webpackChunkName: "index" */'@/Pages/System/Zuzhi/index'),
    // component: ()=>import(/* webpackChunkName: "index" */'@/Pages/System/Role/index'),
    // component: ()=>import(/* webpackChunkName: "index" */'@/Pages/System/Account/index'),
    // component: ()=>import(/* webpackChunkName: "index" */'@/Pages/System/WgFenpei/index'),
    // component: ()=>import(/* webpackChunkName: "index" */'@/Pages/System/GnFenpei/index'),
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/System/Wangge/index'),
    meta: {keepAlive:true},
  },

  {
    path: '/Role',
    name: 'Role',
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/System/Role/index'),
    meta: {},
    // redirect: '/index.html',
  },
  {
    path: '/Account',
    name: 'Account',
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/System/Account/index'),
    meta: {},
    // redirect: '/index.html',
  },
  {
    path: '/WgFenpei',
    name: 'WgFenpei',
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/System/WgFenpei/index'),
    meta: {},
    // redirect: '/index.html',
  },
  {
    path: '/Wangge',
    name: 'Wangge',
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/System/Wangge/index'),
    meta: {},
    // redirect: '/index.html',
  },
  {
    path: '/GnFenpei',
    name: 'GnFenpei',
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/System/GnFenpei/index'),
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