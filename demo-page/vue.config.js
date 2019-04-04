const path = require('path')
const webpack = require('webpack')
const settings={
  // proxyTarget:'https://www.easy-mock.com/mock/5c1134372a95a012b1c7497d', //开发时的代理服务器地址，使用mock数据
  // proxyTarget:'http://feooe.myds.me:6200/', //开发时的代理服务器地址，使用ajj项目测试服务器/
  proxyTarget:'http://feooe.myds.me:8090/', //开发时的代理服务器地址，使用ajj项目测试服务器
  // proxyTarget:'http://192.168.0.105:8090/', //开发时的代理服务器地址，使用ajj项目测试服务器
  isPathRewrite:true,  //开发时代理服务器是否需要重定向接口地址,当使用http://feooe.myds.me:6200/做开发服务器时，需要设置为true
  // isPathRewrite:false,  //开发时代理服务器是否需要重定向接口地址
  pathRewrite:{'^/api':'/asrsajj'},  //开发时代理服务器接口地址重定向配置

  // pubilcUrl:'/asrsajj/90_asrs/sgkb/paiban_v/',        //排班打包地址
  // pubilcUrl:'/asrsajj/90_asrs/sgkb/paibanuser_v/'     //排班人员设置打包地址
  // pubilcUrl:'/asrsajj/90_asrs/sgkb/paibanWhole/',     //查询当日所有排班人员设置打包地址

  // pubilcUrl:'/asrsajj/90_asrs/sgkb/sgkb/'     //事故快报打包地址
  // pubilcUrl:'/asrsajj/90_asrs/sgkb/sgkb_sh/'     //事故快报审核打包地址
  // pubilcUrl:'/asrsajj/90_asrs/sgkb/sglc_ng/'     //事故快报审核人员设置

  // pubilcUrl:'/asrsajj/90_asrs/yjgl/yjwz/'     //应急物资打包地址
  // pubilcUrl:'/asrsajj/90_asrs/yjgl/yjzb/'     //应急装备打包地址
  // pubilcUrl:'/asrsajj/90_asrs/yjgl/yjdw/'     //应急队伍打包地址
  // pubilcUrl:'/asrsajj/90_asrs/yjgl/bncs/'     //避难场所打包地址
  // pubilcUrl:'/asrsajj/90_asrs/yjgl/yjzj/'     //应急专家打包地址
  // pubilcUrl:'/asrsajj/90_asrs/yjgl/yjzs/'     //应急知识打包地址

  // pubilcUrl:'/asrsajj/90_asrs/jxgl/jcxgl/'     //绩效，检查项管理
  // pubilcUrl:'/asrsajj/90_asrs/jxgl/jcbgl/'     //绩效，通用检查单管理
  // pubilcUrl:'/asrsajj/90_asrs/jxgl/zxjcplan/'     //绩效，日常检查计划管理
  // pubilcUrl:'/asrsajj/90_asrs/jxgl/zxjcplan_ycx/'     //绩效，专项检查计划管理
  // pubilcUrl:'/asrsajj/90_asrs/jxgl/zxjcplan_zf/'     //绩效，联合执法检查计划管理


  // pubilcUrl:'/asrsajj/90_asrs/xqqda/'     //企业档案

  // pubilcUrl:'/asrsajj/90_asrs/guidang/guidang/' ,    //归档页面



  // pubilcUrl:'/asrsajj/90_asrs/ajyw/gzhz/'     //工作录入
  // pubilcUrl:'/asrsajj/90_asrs/ajyw/gzfp/'     //工作分配
  // pubilcUrl:'/asrsajj/90_asrs/ajyw/nycd/'     //难易程度调整
  // pubilcUrl:'/asrsajj/90_asrs/ajyw/wdgz/'     //我的工作



  // pubilcUrl:'/asrsajj/90_asrs/ajguanli/sgbfl/',     //四个百分率


  // pubilcUrl:'/asrsajj/90_asrs/jxgl/zfjc_ng/',     //检查
  // pubilcUrl:'/asrsajj/90_asrs/jxgl/jcxx_ng/'     //检查查询
  // pubilcUrl:'/asrsajj/90_asrs/jxgl/zffc_ng/'     //复查
  // pubilcUrl:'/asrsajj/90_asrs/jxgl/zfxx_ng/'     //执法i
  // pubilcUrl:'/asrsajj/90_asrs/jxgl/paihangbang/'     //排行榜


  // pubilcUrl:'/asrsajj/90_asrs/system/ajzz_ng/'     //组织管理
  // pubilcUrl:'/asrsajj/90_asrs/system/ajrole_ng/'   //角色管理
  // pubilcUrl:'/asrsajj/90_asrs/system/user_ng/'     //用户管理
  pubilcUrl:'/asrsajj/90_asrs/system/ajwgfp_ng/'     //网格分配
  // pubilcUrl:'/asrsajj/90_asrs/system/deptMenu_ng/'     //功能分配

}

function resolve (dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  baseUrl:process.env.NODE_ENV === 'production'
    ? settings.pubilcUrl
    : '/',
  /*
    Vue-cli3:
    Crashed when using Webpack `import()` #2463
    https://github.com/vuejs/vue-cli/issues/2463

   */
  /*
   pages: {
   index: {
   entry: 'src/main.js',
   chunks: ['chunk-vendors', 'chunk-common', 'index']
   }
   },
  */
  configureWebpack: {
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
    externals: {
      'AMap': 'AMap',
      'Loca': 'Loca',
      'AMapUI': 'AMapUI'
    }
    // externals:process.env.NODE_ENV === 'production'
    // ?{'vue': 'Vue', 'vue-router': 'VueRouter',}
    // :{}
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@layout', resolve('src/layout'))
      .set('@static', resolve('src/static'))
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* less 变量覆盖，用于自定义 ant design 主题 */

          /*
          'primary-color': '#F5222D',
          'link-color': '#F5222D',
          'border-radius-base': '4px',
          */
        },
        javascriptEnabled: true,
      }
    }
  },

  devServer: {
    proxy: {
      '/api': {
        // target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro',
        // target: 'https://www.easy-mock.com/mock/5c1134372a95a012b1c7497d',
        target:settings.proxyTarget,
        pathRewrite:settings.isPathRewrite ? settings.pathRewrite :{},
        ws: false,
        changeOrigin: true
      },
      '/gateway': {
        // target: 'https://www.easy-mock.com/mock/5b7bce071f130e5b7fe8cd7d/antd-pro',
        target: 'https://www.easy-mock.com/mock/5c1134372a95a012b1c7497d/',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/gateway': '/api'
        }
      }
    }
  },

  lintOnSave: undefined
}