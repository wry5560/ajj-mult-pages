import Vue from 'vue'
import Router from 'vue-router'
import {settings} from '../../dev-settings'
const {routerMap}=settings
// import { constantRouterMap } from '@/config/router.config'


Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: routerMap
})