/**
 * Created by Jeremy Wang on 2019-01-23.
 */

//不同页面的路由配置地址
// import { constantRouterMap } from '@/Pages/Qiye/router.config' //企业管理模块路由
// import { constantRouterMap } from '@/Pages/Jxgl/router.config' //绩效管理模块路由
// import { constantRouterMap } from '@/Pages/Peizhi/router.config' //配置管理模块路由
// import { constantRouterMap } from '@/Pages/Yingji/router.config' //应急模块路由
// import { constantRouterMap } from '@/Pages/KuaiBao/router.config' //事故快报模块路由
// import { constantRouterMap } from './src/Pages/PaiBan/router.config'  //人员排班模块路由

// import { constantRouterMap } from './src/Pages/Jc/router.config'  //检查执法模块路由

// import { constantRouterMap } from './src/Pages/System/router.config'  //系统管理模块路由

// import { constantRouterMap } from './src/Pages/Guidang/router.config'  //归档模块路由

// import { constantRouterMap } from './src/Pages/Ajyw/router.config'  //安监业务模块路由
//
// import { constantRouterMap } from './src/Pages/Meeting/router.config'  //会议管理模块路由

// import { constantRouterMap } from './src/Pages/Login/router.config'  //系统登录页模块路由

import { constantRouterMap } from './src/Pages/Query/router.config'  //综合查询模块路由


// const apiHost= 'https://www.easy-mock.com/mock/5c1134372a95a012b1c7497d/api' //mock模拟数据后台,生产环境使用
export const settings = {
  apiBaseUrl:'/asrsajj',  //生产环境，ajj项目api路径
  // apiBaseUrl:'https://www.easy-mock.com/mock/5c1134372a95a012b1c7497d/api',    //mock模拟数据后台,生产环境使用
  testApiBaseUrl:'/api',
  routerMap:constantRouterMap,  //路由配置，通过导入不同的路由配置文件来设置
}
