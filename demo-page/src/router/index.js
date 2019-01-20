import Vue from 'vue'
import Router from 'vue-router'
// import { constantRouterMap } from '@/config/router.config'
// import { constantRouterMap } from '@/Pages/KuaiBao/router.config' //事故快报模块
import { constantRouterMap } from '@/Pages/PaiBan/router.config' //人员排班模块

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})