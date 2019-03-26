export const constantRouterMap = [
  {
    path: '/',
    name: 'index',
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/Ajyw/AddWork/index'),
    // component: ()=>import(/* webpackChunkName: "index" */'@/Pages/Ajyw/ArrageWork/index'),
    // component: ()=>import(/* webpackChunkName: "index" */'@/Pages/Ajyw/Difficulty/index'),
    // component: ()=>import(/* webpackChunkName: "index" */'@/Pages/Ajyw/MyWork/index'),
    meta: {keepAlive:true},
  },

  {
    path: '/ArrageWork',
    name: 'ArrageWork',
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/Ajyw/ArrageWork/index'),
    meta: {},
    // redirect: '/index.html',
  },
  {
    path: '/Difficulty',
    name: 'Difficulty',
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/Ajyw/Difficulty/index'),
    meta: {},
    // redirect: '/index.html',
  },
  {
    path: '/MyWork',
    name: 'MyWork',
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/Ajyw/MyWork/index'),
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