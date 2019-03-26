export const constantRouterMap = [
  {
    path: '/',
    name: 'index',
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/Guidang/index'),
    meta: {keepAlive:true},
    redirect: '/guidang_qiyejiancha',
    children: [
      {
        path: '/guidang_qiyejiancha',
        name: 'guidang_qiyejiancha',
        component: () => import('@/Pages/Guidang/jc'),
        meta: { title: '企业检查', hidden: true, keepAlive: true, permission: [ 'user' ]  }
      },
      {
        path: '/guidang_shigukuaibao',
        name: 'guidang_shigukuaibao',
        component: () => import('@/Pages/Guidang/sgkb'),
        meta: { title: '事故快报', hidden: true, keepAlive: true, permission: [ 'user' ]  }
      },
      {
        path: '/guidang_anjiangongzuo',
        name: 'guidang_anjiangongzuo',
        component: () => import('@/Pages/Guidang/ajwork'),
        meta: { title: '日常工作', hidden: true, keepAlive: true, permission: [ 'user' ]  }
      },
      {
        path: '/guidang_anjianyewu',
        name: 'guidang_anjianyewu',
        component: () => import('@/Pages/Guidang/ajyw'),
        meta: { title: '安监业务', hidden: true, keepAlive: true, permission: [ 'user' ]  }
      },
    ]
  },


  {
    path: '/GdQuery',
    name: 'guidangchaxun',
    component: ()=>import(/* webpackChunkName: "index" */'@/Pages/Guidang/indexQuery'),
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