export const constantRouterMap = [
  {
    path: '/',
    name: 'index',
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/Meeting/index'),

    meta: {keepAlive:true},
  },

  {
    path: '/Meeting',
    name: 'Meeting',
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/Meeting/index'),
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