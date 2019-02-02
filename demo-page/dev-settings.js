/**
 * Created by Jeremy Wang on 2019-01-23.
 */

//不同页面的路由配置地址
import { constantRouterMap } from '@/Pages/Peizhi/router.config' //配置管理模块路由
// import { constantRouterMap } from '@/Pages/Yingji/router.config' //应急模块路由
// import { constantRouterMap } from '@/Pages/KuaiBao/router.config' //事故快报模块路由
// import { constantRouterMap } from './src/Pages/PaiBan/router.config'  //人员排班模块路由


// const apiHost= 'https://www.easy-mock.com/mock/5c1134372a95a012b1c7497d/api' //mock模拟数据后台,生产环境使用
export const settings = {
  apiBaseUrl:'/asrsajj',  //生产环境，ajj项目api路径
  // apiBaseUrl:'https://www.easy-mock.com/mock/5c1134372a95a012b1c7497d/api',    //mock模拟数据后台,生产环境使用
  testApiBaseUrl:'/api',
  routerMap:constantRouterMap,  //路由配置，通过导入不同的路由配置文件来设置
}
