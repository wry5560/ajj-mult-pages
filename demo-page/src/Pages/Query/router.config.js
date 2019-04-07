export const constantRouterMap = [
  {
    path: '/',
    name: 'index',
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/Query/QiyeQuery/index'),
    meta: {keepAlive:true},
  },

  {
    path: '/QiyeQuery',
    name: 'QiyeQuery',
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/Query/QiyeQuery/index'),
    meta: {},
    // redirect: '/index.html',
  },
  {
    path: '/QiyezichaQuery',
    name: 'QiyezichaQuery',
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/Query/QiyezichaQuery/index'),
    meta: {},
    // redirect: '/index.html',
  },
  {
    path: '/JcQuery',
    name: 'JcQuery',
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/Query/JcQuery/index'),
    meta: {},
    // redirect: '/index.html',
  },
  {
    path: '/ShiguQuery',
    name: 'ShiguQuery',
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/Query/ShiguQuery/index'),
    meta: {},
    // redirect: '/index.html',
  },
  {
    path: '/ShijianQuery',
    name: 'ShijianQuery',
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/Query/ShijianQuery/index'),
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