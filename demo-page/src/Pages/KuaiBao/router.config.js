export const constantRouterMap = [
  {
    path: '/',
    name: 'index',
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/KuaiBao/Index'),
    meta: {keepAlive:true},
  },
  {
    path: '/shenhe',
    name: '/shenhe',
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/KuaiBao/sgShenhe'),
    // redirect: '/test/home',
    // children: [
    //   {
    //     path: 'home',
    //     name: 'TestHome',
    //     component: () => import(/* webpackChunkName: "test" */'@/views/Home')
    //   }
    // ]
  },
  {
    path: '/sgsb',
    name: '/shiguCommit',
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/KuaiBao/shiguCommit'),
    // redirect: '/test/home',
    // children: [
    //   {
    //     path: 'home',
    //     name: 'TestHome',
    //     component: () => import(/* webpackChunkName: "test" */'@/views/Home')
    //   }
    // ]
  },
  {
    path: '/sgDetail',
    name: 'sgDetail',
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/KuaiBao/sgDetail'),
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