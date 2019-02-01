const path = require('path')
const webpack = require('webpack')
const settings={
  // proxyTarget:'https://www.easy-mock.com/mock/5c1134372a95a012b1c7497d', //开发时的代理服务器地址，使用mock数据
  proxyTarget:'http://feooe.myds.me:6200/', //开发时的代理服务器地址，使用ajj项目测试服务器
  // proxyTarget:'http://192.168.1.6:8090/', //开发时的代理服务器地址，使用ajj项目测试服务器
  isPathRewrite:true,  //开发时代理服务器是否需要重定向接口地址,当使用http://feooe.myds.me:6200/做开发服务器时，需要设置为true
  // isPathRewrite:false,  //开发时代理服务器是否需要重定向接口地址
  pathRewrite:{'^/api':'/asrsajj'},  //开发时代理服务器接口地址重定向配置

  // pubilcUrl:'/asrsajj/90_asrs/sgkb/paiban_v/',        //排班打包地址
  // pubilcUrl:'/asrsajj/90_asrs/sgkb/paibanuser_v/'     //排班人员设置打包地址

  // pubilcUrl:'/asrsajj/90_asrs/sgkb/sgkb/'     //事故快报打包地址
  pubilcUrl:'/asrsajj/90_asrs/sgkb/sgkb_sh/'     //事故快报审核打包地址
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