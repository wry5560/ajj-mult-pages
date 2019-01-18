<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <alive-route-view></alive-route-view>
      <!--<router-view/>-->
      <!--<test-table></test-table>-->
    </div>
  </a-locale-provider>
</template>
<script>
  import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
  // import enquireScreen from '@/utils/device'
  // import { version } from 'ant-design-vue'
  import IndexPage from '@/Pages/KuaiBao/Index'
  import AliveRouteView from '@/components/layouts/RouteView'

  export default {

    components:{
      IndexPage,
      AliveRouteView
      // TestTable
    },
    created(){
      console.log("baseUrl:"+ process.env.BASE_URL)
    },
    data () {
      return {
        locale: zhCN,
        // version
      }
    },
    // created () {
    //   const that = this
    //   console.log('use Ant-Design Of Vue:', version)
    //   enquireScreen(deviceType => {
    //     // tablet
    //     if (deviceType === 0) {
    //       that.$store.commit('TOGGLE_DEVICE', 'mobile')
    //       that.$store.dispatch('setSidebar', false)
    //     }
    //     // mobile
    //     else if (deviceType === 1) {
    //       that.$store.commit('TOGGLE_DEVICE', 'mobile')
    //       that.$store.dispatch('setSidebar', false)
    //     }
    //     else {
    //       that.$store.commit('TOGGLE_DEVICE', 'desktop')
    //       that.$store.dispatch('setSidebar', true)
    //     }
    //
    //   })
    // }
  }
</script>
<style>
  #app {
    height: 100%;
    overflow: hidden;
    background-color: #f0f2f5;
  }
</style>