export const constantRouterMap = [
  {
    path: '/',
    name: 'index',
        // component: ()=>import(/* webpackChunkName: "index" */'@/Pages/Yingji/IndexWz'),
    // component: ()=>import(/* webpackChunkName: "index" */'@/Pages/KuaiBao/IndexShenhe'),
    meta: {keepAlive:true},
    redirect: '/yingji/wz',
  },
  {
    path: '/yingji/wz',
    name: 'index',

    component: ()=>import(/* webpackChunkName: "index" */'./Wz/index.vue'),
    meta: {keepAlive:true},
  },
  {
    path: '/yingji/zb',
    name: 'yingjiZb',
    component: ()=>import(/* webpackChunkName: "index" */'./Zb/index.vue'),
    // meta: {keepAlive:true},
  },

  {
    path: '/yingji/team',
    name: 'yingjiTeem',
    component: ()=>import(/* webpackChunkName: "index" */'./Team/index.vue'),
    meta: {},
    // redirect: '/index.html',
  },
  {
    path: '/yingji/place',
    name: 'yingjiPlace',
    component: ()=>import(/* webpackChunkName: "index" */'./Place/index'),
    meta: {},
    // redirect: '/index.html',
  },
  {
    path: '/yingji/zhuanjia',
    name: 'yingjiZj',
    component: ()=>import(/* webpackChunkName: "index" */'./Zhuanjia/index'),
    meta: {},
    // redirect: '/index.html',
  },
  {
    path: '/yingji/zhishi',
    name: 'yingjiZs',
    component: ()=>import(/* webpackChunkName: "index" */'./Zhishi/index'),
    meta: {},
    // redirect: '/index.html',
  },
  {
    path: '/yingji/yuan',
    name: 'yingjiYuan',
    component: ()=>import(/* webpackChunkName: "index" */'./Yuan/index.vue'),
    meta: {},
    // redirect: '/index.html',
  },
  {
    path: '/yingji/yanlian',
    name: 'yingjiYanlian',
    component: ()=>import(/* webpackChunkName: "index" */'./Yanlian/index.vue'),
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