export const constantRouterMap = [
  {
    path: '/',
    name: 'index',
        // component: ()=>import(/* webpackChunkName: "index" */'@/Pages/Yingji/IndexWz'),
    // component: ()=>import(/* webpackChunkName: "index" */'@/Pages/KuaiBao/IndexShenhe'),
    meta: {keepAlive:true},
    redirect: '/peizhi/kuaibaoShryList',
  },
  {
    path: '/peizhi/kuaibaoShryList',
    name: 'kuaibaoShryList',
    component: ()=>import(/* webpackChunkName: "index" */'./KuaibaoShry/index.vue'),
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